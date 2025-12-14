import { ExecutionMethod } from "appwrite";
import type { Models } from "appwrite";
import {
    APPWRITE_FUNCTION_ID_OGP,
    APPWRITE_FUNCTION_DATABASE_ID,
    APPWRITE_FUNCTION_TABLE_ID,
    functions,
    tablesDB,
} from "./appwrite";
import type { OGPData } from "./types";

const EXECUTION_POLL_INTERVAL_MS = 5_000;
const EXECUTION_TIMEOUT_MS = 5 * 60 * 1_000; // 5 minutes safeguard

type ExecutionPollingOptions = {
    intervalMs?: number;
    timeoutMs?: number;
    onStatusChange?: (status: Models.Execution["status"]) => void;
};

export const waitForExecutionCompletion = (
    functionId: string,
    executionId: string,
    options: ExecutionPollingOptions = {}
): Promise<Models.Execution> => {
    const {
        intervalMs = EXECUTION_POLL_INTERVAL_MS,
        timeoutMs = EXECUTION_TIMEOUT_MS,
        onStatusChange,
    } = options;

    return new Promise((resolve, reject) => {
        let elapsed = 0;
        let isChecking = false;
        let intervalHandle: ReturnType<typeof setInterval> | null = null;

        const clear = () => {
            if (intervalHandle) {
                clearInterval(intervalHandle);
                intervalHandle = null;
            }
        };

        const checkExecution = async () => {
            if (isChecking) return;
            isChecking = true;
            try {
                const execution = await functions.getExecution({ functionId, executionId });
                onStatusChange?.(execution.status);

                if (execution.status === "failed") {
                    clear();
                    reject(new Error(execution.errors || "Appwrite function execution failed"));
                    return;
                }

                if (execution.status === "completed") {
                    clear();
                    resolve(execution);
                }
            } catch (pollError: unknown) {
                clear();
                const message =
                    pollError instanceof Error
                        ? pollError.message
                        : "Unable to fetch function execution status";
                reject(new Error(message));
            } finally {
                isChecking = false;
            }
        };

        intervalHandle = setInterval(async () => {
            elapsed += intervalMs;

            if (timeoutMs && elapsed >= timeoutMs) {
                clear();
                reject(new Error("Appwrite function execution timed out"));
                return;
            }

            await checkExecution();
        }, intervalMs);

        // Check immediately once
        void checkExecution();
    });
};

type PersistedExecutionPayload = Partial<OGPData> & {
    meta?: OGPData["meta"];
    url?: string;
    ogpImage?: string | null;
    creditsRemaining?: number;
};

const fetchPersistedExecutionPayload = async (
    executionId: string
): Promise<PersistedExecutionPayload | null> => {
    if (!APPWRITE_FUNCTION_DATABASE_ID || !APPWRITE_FUNCTION_TABLE_ID) {
        return null;
    }

    try {
        const row = await tablesDB.getRow({
            databaseId: APPWRITE_FUNCTION_DATABASE_ID,
            tableId: APPWRITE_FUNCTION_TABLE_ID,
            rowId: executionId
        });

        const encryptedContent =
            typeof row?.data?.encryptedContent === "string"
                ? row.data.encryptedContent
                : typeof (row as Record<string, unknown>).encryptedContent === "string"
                    ? (row as Record<string, string>).encryptedContent
                    : null;

        if (!encryptedContent) {
            return null;
        }

        return JSON.parse(encryptedContent);
    } catch (err) {
        console.warn("Unable to fetch persisted OGP payload:", err);
        return null;
    }
};

const safeParseJson = (maybeJson?: string | null) => {
    if (!maybeJson) return null;
    try {
        return JSON.parse(maybeJson);
    } catch (err) {
        console.warn("Unable to parse JSON payload:", err);
        return null;
    }
};

export const createOgpExecution = async (
    url: string,
    context: string
): Promise<Models.Execution> => {
    try {
        const execution = await functions.createExecution({
            functionId: APPWRITE_FUNCTION_ID_OGP,
            body: JSON.stringify({ targetUrl: url, contextText: context }),
            async: true,
            xpath: "/meta",
            method: ExecutionMethod.POST,
            headers: { "Content-Type": "application/json" },
        });
        return execution;
    } catch (error: unknown) {
        console.error("Error creating Appwrite OGP execution:", error);
        throw error;
    }
};

export const monitorOgpExecution = async (
    executionId: string,
    options?: ExecutionPollingOptions
): Promise<OGPData> => {
    try {
        const completedExecution = await waitForExecutionCompletion(
            APPWRITE_FUNCTION_ID_OGP,
            executionId,
            options
        );

        if (completedExecution.responseStatusCode !== 200) {
            const errorResponse = completedExecution.responseBody
                ? JSON.parse(completedExecution.responseBody)
                : null;
            throw new Error(
                `Appwrite function returned status ${completedExecution.responseStatusCode}: ${errorResponse?.error}`
            );
        }

        const persistedPayload = await fetchPersistedExecutionPayload(executionId);
        const responsePayload = safeParseJson(completedExecution.responseBody ?? null);

        const mergedPayload = (() => {
            if (persistedPayload && responsePayload) {
                return {
                    ...persistedPayload,
                    creditsRemaining: responsePayload.creditsRemaining,
                } as PersistedExecutionPayload;
            }
            return (persistedPayload || responsePayload) as PersistedExecutionPayload | null;
        })();

        if (!mergedPayload) {
            throw new Error("Appwrite function did not return any data");
        }

        return mergedPayload as OGPData;
    } catch (error: unknown) {
        console.error("Error monitoring Appwrite OGP execution:", error);
        throw error;
    }
};

// Deprecated: kept for backward compatibility if needed, but we will switch to split functions
export const generateOgpTags = async (
    url: string,
    context: string,
    options?: ExecutionPollingOptions
): Promise<OGPData> => {
    const execution = await createOgpExecution(url, context);
    return monitorOgpExecution(execution.$id, options);
};

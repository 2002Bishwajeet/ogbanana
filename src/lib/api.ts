import { ExecutionMethod } from "appwrite";
import { APPWRITE_FUNCTION_ID_OGP, functions } from "./appwrite";
import type { OGPData } from "./types";


export const generateOgpTags = async (url: string, context: string): Promise<OGPData> => {
    try {
        const execution = await functions.createExecution(
            {

                functionId: APPWRITE_FUNCTION_ID_OGP,
                body: JSON.stringify({ targetUrl: url, contextText: context }),
                async: false,
                xpath: '/meta',
                method: ExecutionMethod.POST,
                headers: { 'Content-Type': 'application/json' }
            }
        );

        if (execution.status === 'failed') {
            throw new Error(execution.errors || 'Appwrite function execution failed');
        }
        if (execution.responseStatusCode !== 200) {
            // parse the error message from responseBody if available
            const errorResponse = execution.responseBody ? JSON.parse(execution.responseBody) : null;
            throw new Error(`Appwrite function returned status ${execution.responseStatusCode}: ${errorResponse?.error}`);
        }

        const result = JSON.parse(execution.responseBody);
        return result as OGPData;

    } catch (error: any) {
        console.error("Error calling Appwrite OGP function:", error);
        throw new Error(`Failed to generate OGP tags: ${error.message}`);
    }
};

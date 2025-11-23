import { APPWRITE_FUNCTION_ID_OGP, functions } from "./appwrite";

interface OGPGenerationResult {
    title: string;
    description: string;
    image: string;
    url: string;
}

export const generateOgpTags = async (url: string, context: string): Promise<OGPGenerationResult> => {
    try {
        const execution = await functions.createExecution(
            APPWRITE_FUNCTION_ID_OGP,
            JSON.stringify({ url, context }),
            false, // async
            '/',   // path
            'POST', // method
            { 'Content-Type': 'application/json' }
        );

        if (execution.status === 'failed') {
            throw new Error(execution.stderr || 'Appwrite function execution failed');
        }

        const result = JSON.parse(execution.responseBody);
        return result as OGPGenerationResult;

    } catch (error: any) {
        console.error("Error calling Appwrite OGP function:", error);
        throw new Error(`Failed to generate OGP tags: ${error.message}`);
    }
};

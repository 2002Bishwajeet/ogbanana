import { Client, Functions } from "appwrite";


const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1'; // Replace with your Appwrite endpoint
const APPWRITE_PROJECT_ID = 'REPLACE_WITH_YOUR_PROJECT_ID'; // Replace with your Appwrite Project ID
const APPWRITE_FUNCTION_ID_OGP = 'REPLACE_WITH_YOUR_OGP_FUNCTION_ID'; // Replace with your OGP Function ID
const APPWRITE_FUNCTION_ID_ROAST = 'REPLACE_WITH_YOUR_ROAST_FUNCTION_ID'; // Replace with your Roast Function ID

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

const functions = new Functions(client);

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

        const result = JSON.parse(execution.stdout);
        return result as OGPGenerationResult;

    } catch (error: any) {
        console.error("Error calling Appwrite OGP function:", error);
        throw new Error(`Failed to generate OGP tags: ${error.message}`);
    }
};

export const roastMyVibe = async (context: string): Promise<string> => {
    try {
        const execution = await functions.createExecution(
            APPWRITE_FUNCTION_ID_ROAST,
            JSON.stringify({ context }),
            false, // async
            '/',   // path
            'POST', // method
            { 'Content-Type': 'application/json' }
        );

        if (execution.status === 'failed') {
            throw new Error(execution.stderr || 'Appwrite function execution failed');
        }

        const result = JSON.parse(execution.stdout); // Assuming the roast function returns a direct string or {roast: string}
        return result.roast || result;

    } catch (error: any) {
        console.error("Error calling Appwrite roast function:", error);
        throw new Error(`Failed to roast vibe: ${error.message}`);
    }
};

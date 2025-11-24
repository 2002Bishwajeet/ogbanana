import { Client, Account, Functions, TablesDB, } from 'appwrite';

// --- Appwrite Configuration ---
export const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'http://localhost/v1';
export const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT || 'your-project-id';
export const APPWRITE_FUNCTION_ID_OGP = import.meta.env.VITE_APPWRITE_FUNCTION_ID_OGP || 'your-ogp-function-id';
export const APPWRITE_FUNCTION_DATABASE_ID = import.meta.env.VITE_APPWRITE_FUNCTION_DATABASE_ID || 'your-database-id';
export const APPWRITE_FUNCTION_TABLE_ID = import.meta.env.VITE_APPWRITE_FUNCTION_TABLE_ID || 'your-table-id';

export const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const functions = new Functions(client);
export const tablesDB = new TablesDB(client);




interface ViteTypeOptions {
    strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
    readonly VITE_APPWRITE_ENDPOINT: string
    readonly VITE_APPWRITE_PROJECT: string
    readonly VITE_APPWRITE_FUNCTION_ID_OGP: string
    readonly VITE_APPWRITE_FUNCTION_DATABASE_ID: string
    readonly VITE_APPWRITE_FUNCTION_TABLE_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
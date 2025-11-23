interface ViteTypeOptions {
    strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
    readonly VITE_APPWRITE_ENDPOINT: string
    readonly VITE_APPWRITE_PROJECT: string
    readonly VITE_APPWRITE_FUNCTION_ID_OGP: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
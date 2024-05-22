/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_USER_ID: string;
  readonly VITE_PASSWORD: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

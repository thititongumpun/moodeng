/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_TOMTOM_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
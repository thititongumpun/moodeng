/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_TOMTOM_API_KEY: string;
  readonly BUILDER_API_PUBLIC_KEY: string;
  readonly PUBLIC_MAPBOX_APIKEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

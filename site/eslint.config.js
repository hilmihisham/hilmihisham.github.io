import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  { ignores: ["dist/", ".astro/", "node_modules/", ".wrangler/"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  prettier,
]);

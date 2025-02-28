import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      indent: "error", // Ajout d'une clause d'erreur en cas de mauvaise indentation.
      "@typescript-eslint/no-require-imports": "off", // Supprime les erreurs en cas d'application de require.
      "no-unused-vars": "warn", // Avertit si une variable est définie mais jamais utilisée
      "no-console": "warn", // Avertit si on laisse des console.log()
    }
  },
  eslintConfigPrettier
];
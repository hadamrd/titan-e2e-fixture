import js from "@eslint/js";
import tseslint from "typescript-eslint";

// Flat ESLint config — the `lint` stage runs `eslint src`.
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["dist/**", "node_modules/**"] },
);

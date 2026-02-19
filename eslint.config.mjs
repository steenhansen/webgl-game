import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser }
    },
    {
        files: ["**/*.js"],
        languageOptions: { sourceType: "script" },
        rules: {
            "no-magic-numbers": [
                "error",
                {
                    detectObjects: true,
                    enforceConst: true,
                    ignore: [0, 1, 4, 100, 200, 300, 400],
                    ignoreArrayIndexes: true,
                    ignoreDefaultValues: true,
                    ignoreClassFieldInitialValues: true
                }
            ],
            eqeqeq: "error",
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_"
                }
            ]
        }
    }
]);

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            // Disable 'no-explicit-any' rule
            "@typescript-eslint/no-explicit-any": "off",

            // Disable unused variables rule
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" }, // Ignore variables starting with "_"
            ],

            // Disable react-hooks/rules-of-hooks and exhaustive-deps rules
            "react-hooks/rules-of-hooks": "off", // You may want to leave this on for better hook practices
            "react-hooks/exhaustive-deps": "off",

            // Add any other specific rules you wish to disable or modify
        },
    },
];

export default eslintConfig;

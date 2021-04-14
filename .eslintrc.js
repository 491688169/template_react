/*
 * @Author: Kim
 * @Date: 2021-04-09 18:34:42
 * @LastEditTime: 2021-04-13 17:51:30
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/.eslintrc.js
 */
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:react/recommended", "google", "prettier", "plugin:prettier/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    settings: { version: "detect" },
    plugins: ["react", "@typescript-eslint", "react-hooks"],
    rules: {
        "react/react-in-jsx-scope": 0,
        "require-jsdoc": 0,
        "react-hooks/rules-of-hooks": 2,
        "react-hooks/exhaustive-deps": 1,
        "react/prop-types": 0,
        "no-unused-vars": 0,
        "@typescript-eslint/no-unused-vars": 2,
    },
};

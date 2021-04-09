/*
 * @Author: Kim
 * @Date: 2019-10-22 14:03:56
 * @LastEditTime: 2021-04-09 11:23:10
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/webpack.dll.config.js
 */
const path = require("path");

const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const rootDir = path.resolve(__dirname);
const dllDir = path.resolve(rootDir, "src", "static", "dll");

const isDev = process.env.NODE_ENV === "dev";

const pathToClean = isDev ? ["src/static/dll/*dll*.dev.*"] : ["src/static/dll/*dll*.prod.*"];
const libraryName = isDev ? "dll_[name]_[fullhash]_dev" : "dll_[name]_[fullhash]_prod";
const fileName = isDev ? "dll.[name].[fullhash].dev.js" : "dll.[name].[fullhash].prod.js";
const manifestName = isDev ? "manifest.dll.dev.json" : "manifest.dll.prod.json";

module.exports = {
    mode: isDev ? "development" : "production",
    entry: {
        vendor: ["react", "react-dom", "react-router-dom"],
    },
    output: {
        path: dllDir,
        filename: fileName,
        library: libraryName,
    },
    plugins: [
        new BundleAnalyzerPlugin({ analyzerMode: "static" }),
        new webpack.DllPlugin({
            path: path.resolve(dllDir, manifestName),
            name: libraryName,
            context: __dirname,
        }),

        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: pathToClean }),
    ],
};

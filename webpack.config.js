/*
 * @Author: Kim
 * @Date: 2021-04-06 13:41:01
 * @LastEditTime: 2021-04-14 15:34:05
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/webpack.config.js
 */
const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const apiMocker = require("mocker-api");
const uploadrc = require("rc")("upload");

const env = require("./env");

const distDir = path.resolve(__dirname, "dist");
const srcDir = path.resolve(__dirname, "src");
const staticDir = path.join(srcDir, "static");

const isDev = env.MODE === "dev";

module.exports = {
    mode: isDev ? "development" : "production",
    entry: "./src/pages/index.tsx",
    output: {
        publicPath: isDev ? "/" : uploadrc.prefix,
        filename: isDev ? "[name].js" : "[name]-[chunkhash:8].js",
        path: distDir,
        chunkFilename: "[name].[chunkhash:8].js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                include: srcDir,
                use: ["babel-loader", "ts-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    process.env.NODE_ENV !== "prod" ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                    "sass-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: { plugins: [() => autoprefixer()] },
                        },
                    },
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    process.env.NODE_ENV !== "prod" ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"],
        alias: {
            "@": srcDir,
        },
    },
    cache: isDev,
    optimization: {
        runtimeChunk: true,
    },
    devtool: isDev && "eval-source-map",
    devServer: {
        contentBase: srcDir, // 静态文件来源
        compress: true,
        historyApiFallback: true,
        host: "0.0.0.0",
        port: env.PORT,
        hot: true,
        inline: true,
        clientLogLevel: "none",
        open: true,
        stats: { color: true },
        overlay: true,
        before(app) {
            const mocker = path.resolve("./src/configs/mocker.ts");
            apiMocker(app, mocker);
        },
        headers: {
            "Service-Worker-Allowed": "/",
        },
    },
    plugins: [
        new DashboardPlugin(),
        new webpack.DefinePlugin(
            Object.keys(env).reduce((res, k) => {
                res[`__${k}__`] = JSON.stringify(env[k]);
                return res;
            }, {})
        ),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: isDev
                ? require("./src/static/dll/manifest.dll.dev.json")
                : require("./src/static/dll/manifest.dll.dev.json"),
        }),
        isDev ? () => {} : new BundleAnalyzerPlugin({ analyzerMode: "static" }),
        new HtmlWebpackPlugin({ template: "src/pages/index.ejs", inject: false }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: isDev
                ? require("./src/static/dll/manifest.dll.dev.json")
                : require("./src/static/dll/manifest.dll.prod.json"),
        }),
        new AddAssetHtmlPlugin(
            isDev
                ? {
                      filepath: path.join(staticDir, "dll", "dll.vendor.*.dev.js"),
                  }
                : {
                      filepath: path.join(staticDir, "dll", "dll.vendor.*.prod.js"),
                  }
        ),
    ],
};

import path from "path";
import { fileURLToPath } from "url";
import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: "production",
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.esm.js",
        library: {
            type: "module",
        },
        module: true,
    },
    externals: {
        react: "root React", // react をグローバルオブジェクトにマッピング
        clsx: "root clsx",
    },
    experiments: {
        outputModule: true,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            ["@babel/preset-react", { runtime: "automatic" }],
                        ],
                    },
                },
            },
            {
                test: /\.module\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, // CSS をファイルとして抽出
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                                exportLocalsConvention: "as-is", // これでクラス名をそのまま出力
                            },
                        },
                    },
                    "sass-loader", // Sass をコンパイル
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /\.module\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
};

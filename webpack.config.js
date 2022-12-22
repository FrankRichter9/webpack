const path = require('path')
const HTNLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    context: path.resolve(__dirname, 'src'), // где лежат все исходники приложения
    mode: 'development',
    entry: {
        main: './index.jsx',
        analytics: './analytics.ts',
    }, // start file (точки входа)
    output: {
        filename: '[name].[contenthash].js', // [name] - main/analytics (entry name), [contenthash] - file content hash (чтобы не было проблем с кешированием файлов, при изменении контента в файле меняется название)
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png'], // расширения которые будет искать по умолчанию, (default ['.js', '.json'])
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all' // для оптимизации кода и создания вендеров (чтобы не копировался код библиотек в разные бандлы)
        },
        runtimeChunk: 'single' // для работы webpack-dev-server
    },
    devtool: isDev ? 'source-map' : undefined, // исходные карты файлов в devtools
    devServer: {
        port: 4200
    },
    plugins: [
        new HTNLWebpackPlugin({ // отвечает за перенос и подключение скриптов к файлу index.html
            template: './index.html',
            minify: { // минифицировать файл настройки
                collapseWhitespace: isProd,
            }
        }),
        new CleanWebpackPlugin(), // отвечает за очищение dist при повторной генерации
        new CopyWebpackPlugin({ // для копирования файлов в сборку
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/webpack-logo.png'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css', // как и для output
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, // регулярное выражение для файла
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {} // доп настройки для loader
                }, 'css-loader'] // что использоать для файлов (справа налево)
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                // use: ['file-loader'],
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
        ]
    }
}
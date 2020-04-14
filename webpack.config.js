const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getFinalCssLoader = (mode) => {
    if (mode === 'production') {
        return {
            loader: MiniCssExtractPlugin.loader,
            options: {
                esModule: true,
            },
        }
    }
    return 'vue-style-loader'
}

const getPostCssPlugins = (mode) => {
    const plugins = [require('tailwindcss')]
    if (mode === 'production') {
        plugins.push(
            require('@fullhuman/postcss-purgecss')({
                content: ['app/**/*.html', 'app/**/*.vue'],
                defaultExtractor: (content) =>
                    content.match(/[\w-/:]+(?<!:)/g) || [],
            }),
        )
    }
    return plugins
}

module.exports = (env, { mode }) => {
    const context = resolve(__dirname, 'app')
    const entry = resolve(context, 'index.js')
    const outputPath = resolve(__dirname, 'public')
    const config = {
        entry,
        context,
        output: {
            path: outputPath,
            filename:
                mode === 'production' ? '[name].[contenthash].js' : '[name].js',
            chunkFilename:
                mode === 'production'
                    ? 'chunks/[chunkhash].js'
                    : 'chunks/[id].js',
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    modules: false,
                                    targets: {
                                        browsers: [
                                            'defaults',
                                        ],
                                    },
                                },
                            ],
                        ],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        getFinalCssLoader(mode),
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: getPostCssPlugins(mode),
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.vue', '.css', '.wasm', '.mjs', '.js', '.json'],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                title: 'Journali',
                inject: true,
                template: 'index.html',
            }),
        ],
        devServer: {
            host: '0.0.0.0',
            port: 8080,
            contentBase: outputPath,
            historyApiFallback: true,
            proxy: {
                '/api': 'http://api:8000',
            },
        },
        watchOptions: {
            poll: true,
        },
    }

    if (mode === 'production') {
        config.plugins.push(new MiniCssExtractPlugin())
    }

    return config
}

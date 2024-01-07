/* eslint-disable import/no-dynamic-require */
const path = require('path');

// webpack
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

// plugin
const WebpackBar = require('webpackbar');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

// loader
const threadLoader = require('thread-loader');

const argv = require('yargs-parser')(process.argv.slice(2));

const { mode } = argv;

const DEV_CONFIG = require('./webpack.config.dev');
const PROD_CONFIG = require('./webpack.config.prod');

const WebVerConfig = require('../config/version.json');

const { WEB_VER } = WebVerConfig;

const ENTRY = require('./webpack.config.entry');

const JS_DIR = path.resolve(__dirname, '../src/js');
const CSS_DIR = path.resolve(__dirname, '../src/css');
const IMG_DIR = path.resolve(__dirname, '../src/img');
const MP3_DIR = path.resolve(__dirname, '../src/mp3');

const BUILD_DIR = path.resolve(__dirname, '../dist');
const BUILD_JS_DIR = path.join(BUILD_DIR, '/js');
const BUILD_CSS_DIR = path.join(BUILD_DIR, '/css');
const BUILD_IMG_DIR = path.resolve(__dirname, '../dist/img');
const BUILD_MP3_DIR = path.resolve(__dirname, '../dist/mp3');

const library_manifest = require('../dist/js/dll/library.manifest.json');
const vendor_manifest = require('../dist/js/dll/vendor.manifest.json');

let chunkDynamicPath = 'chunk';
if (!!WEB_VER && 1) {
    chunkDynamicPath = `${chunkDynamicPath}/`;
}

let chunkFilename = '[name].bundle.js?v=[chunkhash]';
if (!!WEB_VER === 'dev') {
    chunkFilename = '[name].bundle.js';
}

const WorkerPool = {
    workers: 10,
    workerParallelJobs: 200,
    // workerNodeArgs: ['--max-old-space-size=2048'],
    poolRespawn: false,
    poolTimeout: 1000,
    poolParallelJobs: 50,
};

threadLoader.warmup(WorkerPool, [
    'babel-loader',
    'vue-loader',
]);

const JS_CONFIG = {
    name: 'js',
    target: 'web',
    context: JS_DIR,
    entry: {
        ...ENTRY.js,
    },
    output: {
        filename: '[name].bundle.js',
        path: BUILD_JS_DIR,
        publicPath: 'dist/js/',
        chunkFilename: '[name].bundle.js?v=[chunkhash]',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: JS_DIR,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: WorkerPool,
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            envName: mode,
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: WorkerPool,
                    },
                    'vue-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.join(CSS_DIR, '/common/_base.scss'),
                                // path.join(CSS_DIR, '/common/_color.scss'),
                                path.join(CSS_DIR, '/commonV2/_utils.scss'),
                            ],
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        symlinks: false,
        alias: {
            app: path.join(JS_DIR, '/app'),
            app$: path.join(JS_DIR, '/app/app.js'),
            vendor: path.join(JS_DIR, '/vendor'),
            lib: path.join(JS_DIR, '/lib'),
            components: path.join(JS_DIR, '/components'),
            router: path.join(JS_DIR, '/router'),
            lang: path.join(JS_DIR, '/lang'),
            vue: 'vue/dist/vue.esm-bundler.js',
            css: CSS_DIR,
            storage_res: path.join(__dirname, '../storage/resources'),
        },
        extensions: ['.vue', '.jsx', '.js', '.json'],
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: IMG_DIR,
                    to: BUILD_IMG_DIR,
                },
                {
                    from: MP3_DIR,
                    to: BUILD_MP3_DIR,
                },
                {
                    from: path.join(CSS_DIR, '/icomoon'),
                    to: path.join(BUILD_CSS_DIR, '/icomoon'),
                },
                {
                    from: path.join(CSS_DIR, '/vendor'),
                    to: path.join(BUILD_CSS_DIR, '/vendor'),
                },
                {
                    from: path.join(JS_DIR, '/vendor'),
                    to: path.join(BUILD_JS_DIR, '/vendor'),
                },
            ],
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(mode),
            NODE_ENV: JSON.stringify(mode),
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            // Vue: ['vue/dist/vue.esm.js', 'default'],
            moment: 'moment',
        }),
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/, /zh-tw/,
        ),
        new WebpackBar({
            name: ' ------ Webpack 5 JS Bundle ------ ',
            color: '#9775fa',
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '..'),
            manifest: library_manifest,
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '..'),
            manifest: vendor_manifest,
        }),
    ],
    optimization: {
        chunkIds: 'deterministic',
        mergeDuplicateChunks: true,
        moduleIds: 'deterministic',
        minimize: false,
        splitChunks: {
            cacheGroups: {
                /* dynamicComponents */
                ...ENTRY.cacheGroups,
                node_modules: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'chunk/node_modules',
                    chunks: 'all',
                    minSize: 10,
                    minChunks: 1,
                    enforce: true,
                    reuseExistingChunk: true,
                },
                dynamic_components_common: {
                    test: /[\\/]js[\\/]components[\\/]/,
                    name: `${chunkDynamicPath}/lib/components_common`,
                    chunks: 'all',
                    minSize: 1,
                    minChunks: 1,
                    enforce: true,
                },
                lib: {
                    test: /[\\/]js[\\/]lib[\\/]/,
                    name: 'chunk/lib',
                    chunks: 'all',
                    minSize: 1,
                    minChunks: 1,
                    enforce: true,
                    reuseExistingChunk: true,
                },
            },
        },
    },
};

if (0) {
    JS_CONFIG.plugins.unshift(
        new ESLintPlugin({
            context: JS_DIR,
            extensions: ['js', 'jsx', 'vue'],
            exclude: 'node_modules',
            // quiet: true,
        }),
    );
}

const CSS_CONFIG = {
    name: 'css',
    target: 'web',
    context: CSS_DIR,
    entry: {
        ...ENTRY.css,
    },
    output: {
        filename: '[name].bundle.css.js',
        path: path.join(BUILD_JS_DIR, '/css_del'),
        publicPath: '/dist/css/',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        alias: {
            css: CSS_DIR,
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../../css/[name].css',
        }),
        new WebpackBar({
            name: ' ------ Webpack 5 CSS Bundle ------ ',
            color: '#e84967',
        }),
    ],
    optimization: {
        minimize: false,
    },
};

const CONFIG = {
    JS_CONFIG,
    CSS_CONFIG,
};

module.exports = (env, args) => {
    switch (args.mode) {
        case 'development':
            return merge.multiple(CONFIG, DEV_CONFIG);
        case 'production':
            return merge.multiple(CONFIG, PROD_CONFIG);
        default:
            throw new Error('No matching configuration was found!');
    }
};
const fs = require('fs');
const path = require('path');

// webpack
const webpack = require('webpack');

// plugin
const WebpackBar = require('webpackbar');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

// loader
const threadLoader = require('thread-loader');

const argv = require('yargs-parser')(process.argv.slice(2));

const analyze = !!argv.analyze;

const { mode } = argv;

const WebVerConfig = require('../config/version.json');

const { WEB_VER } = WebVerConfig;

const JS_DIR = path.resolve(__dirname, '../src/js');
const CSS_DIR = path.resolve(__dirname, '../src/css');
const IMG_DIR = path.resolve(__dirname, '../src/img');

const BUILD_DIR = path.resolve(__dirname, '../dist');
const BUILD_JS_DIR = path.join(BUILD_DIR, '/js');
const BUILD_CSS_DIR = path.join(BUILD_DIR, '/css');

const NODE_DIR = path.resolve(__dirname, '../node_modules');
const VENDOR_DIR = path.join(JS_DIR, '/vendor');

const { walkSync } = require('./utils');

const VENDOR = walkSync(VENDOR_DIR);

const WorkerPool = {
    workers: 5,
    workerParallelJobs: 100,
    // workerNodeArgs: ['--max-old-space-size=2048'],
    poolRespawn: false,
    poolTimeout: 1000,
    poolParallelJobs: 50,
};

threadLoader.warmup(WorkerPool, [
    'babel-loader',
]);

module.exports = {
    mode,
    devtool: (mode === 'development') ? 'eval-cheap-module-source-map' : false,
    target: 'web',
    context: path.resolve(__dirname, '..'),
    entry: {
        library: [
            'core-js/stable',
            'regenerator-runtime/runtime',
            'jquery',
            'moment',
            // "socket.io",
            'axios',
            'vue/dist/vue.esm-bundler.js',
            'vuex',
            'vue-router',
        ],
        vendor: [
            'core-js/stable',
            'regenerator-runtime/runtime',
            // '@vimeo/player',
            'bootstrap',
            'popper.js',
            'browser-detect',
            'fingerprintjs2',
            'chart.js',
            // 'cropperjs',
            // 'jquery-cropper',
            'js-cookie',
            'md5',
            // 'vue-bootstrap-datetimepicker',
            'vue-perfect-scrollbar',
            'vuedraggable',

            ...VENDOR,
        ],
    },
    output: {
        filename: '[name].dll.bundle.js',
        path: path.join(BUILD_JS_DIR, 'dll'),
        library: '_dll_[name]',
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
        ],
    },
    plugins: [
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
            name: ' ------ Webpack 5 DLL Bundle ------ ',
            color: '#1eaf50',
        }),
        new webpack.DllPlugin({
            context: path.resolve(__dirname, '..'),
            path: path.join(BUILD_JS_DIR, 'dll', '[name].manifest.json'),
            name: '_dll_[name]',
        }),
        ...(analyze
            ? [
                new BundleAnalyzerPlugin(),
            ]
            : []
        ),
    ],
    optimization: {
        minimize: (mode !== 'development'),
        minimizer: [
            ...(mode !== 'development'
                ? [
                    new TerserPlugin({
                        terserOptions: {
                            safari10: true,
                        },
                    }),
                ]
                : []
            ),
        ],
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 26214400,
        maxAssetSize: 26214400,
    },
};
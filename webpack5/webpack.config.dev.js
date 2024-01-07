const path = require('path');

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const JS_CONFIG = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 500,
    },
    plugins: [
        new WebpackBuildNotifierPlugin({
            title: 'PressPlay Academy Creator Center',
            sound: false,
            suppressSuccess: false,
            showDuration: true,
        }),
    ],
};

const CSS_CONFIG = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 500,
    },
    plugins: [],
    performance: {
        hints: false,
    },
};

const CONFIG = {
    JS_CONFIG,
    CSS_CONFIG,
};

module.exports = CONFIG;
const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const argv = require('yargs-parser')(process.argv.slice(2));

const analyze = !!argv.analyze;

const JS_CONFIG = {
    mode: 'production',
    plugins: [],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    safari10: true,
                },
            }),
        ],
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 26214400,
        maxAssetSize: 524288,
    },
};

if (analyze) {
    JS_CONFIG.plugins.push(
        new BundleAnalyzerPlugin(),
    );
}

const CSS_CONFIG = {
    mode: 'production',
    plugins: [],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true,
                            },
                        },
                    ],
                },
                minify: CssMinimizerPlugin.cssnanoMinify,
            }),
        ],
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 26214400,
        maxAssetSize: 524288,
    },
};

const CONFIG = {
    JS_CONFIG,
    CSS_CONFIG,
};

module.exports = CONFIG;
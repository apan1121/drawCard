const path = require('path');

const JS_DIR = path.resolve(__dirname, '../src/js');
const CSS_DIR = path.resolve(__dirname, '../src/css');

module.exports = {
    resolve: {
        symlinks: false,
        alias: {
            app: path.join(JS_DIR, '/app'),
            app$: path.join(JS_DIR, '/app/app.js'),
            vendor: path.join(JS_DIR, '/vendor'),
            lib: path.join(JS_DIR, '/lib'),
            components: path.join(JS_DIR, '/components'),
            router: path.join(JS_DIR, '/router'),
            vue: 'vue/dist/vue.esm-bundler.js',
            css: CSS_DIR,
        },
        extensions: ['.vue', '.jsx', '.js', '.json'],
    },
};

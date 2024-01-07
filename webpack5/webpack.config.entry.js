const fs = require('fs');
const path = require('path');

const argv = require('yargs-parser')(process.argv.slice(2));

const { mode } = argv;

const WebVerConfig = require('../config/version.json');

const { WEB_VER } = WebVerConfig;

const PUBLIC_DIR = path.resolve(__dirname, '../dist');
const JS_DIR = path.resolve(__dirname, '../src/js');
const CSS_DIR = path.resolve(__dirname, '../src/css');

/** 檢查 public 是否存在，並在 public 中建立 gitignore 檔 */
const PUBLIC_GITIGNORE_CONTENT = '/js\n/css\n/img\n!.gitignore';
if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR);
}
fs.writeFileSync(`${PUBLIC_DIR}/.gitignore`, PUBLIC_GITIGNORE_CONTENT);

// /** 在 public 中建立 default folder */
// const PUBLIC_DEFAULT_FOLDER = ['', 'img'];
// PUBLIC_DEFAULT_FOLDER.forEach((key) => {
//     const DIR = path.join(PUBLIC_DIR, `/${key}`);

//     if (!fs.existsSync(DIR)) {
//         fs.mkdirSync(DIR);
//     }
// });

const { getFileList, getCacheGroupsList } = require('./utils');

/** JS_Bundle_Entry */
let JS_Bundle_Entry = {};
if (1) {
    const JS_FOLDER = {
        app: `${JS_DIR}/app`,
    };

    let JS_Entry = {};
    Object.keys(JS_FOLDER).forEach((objectKey) => {
        const FILE_PATH = JS_FOLDER[objectKey];
        JS_Entry = Object.assign(JS_Entry, getFileList(objectKey, FILE_PATH, ['component', 'components']));
    });

    JS_Bundle_Entry = { ...JS_Bundle_Entry, ...JS_Entry };
}
// console.log(JS_Bundle_Entry);

/** CSS_Bundle_Entry */
let CSS_Bundle_Entry = {};
if (1) {
    const CSS_FOLDER = {
        // adminLTE: `${CSS_DIR}/adminLTE`,
        // layout: `${CSS_DIR}/layout`,
        page: `${CSS_DIR}/page`,
        vendor: `${CSS_DIR}/vendor`,
    };

    let CSS_Entry = {};
    Object.keys(CSS_FOLDER).forEach((objectKey) => {
        const FILE_PATH = CSS_FOLDER[objectKey];
        CSS_Entry = Object.assign(CSS_Entry, getFileList(objectKey, FILE_PATH, [], ['css', 'scss']));
    });

    CSS_Bundle_Entry = { ...CSS_Bundle_Entry, ...CSS_Entry };
}
// console.log(CSS_Bundle_Entry);

/* splitChunks.cacheGroups */
let cacheGroups_Entry = {};
if (1) {
    const splitChunks_cacheGroups = {
        chunk_components: path.join(JS_DIR, '/components'),
    };

    Object.keys(splitChunks_cacheGroups).forEach((objectKey) => {
        const FILE_PATH = splitChunks_cacheGroups[objectKey];
        cacheGroups_Entry = Object.assign(cacheGroups_Entry, getCacheGroupsList(objectKey, FILE_PATH, ['main'], ['vue', 'js', 'jsx'], JS_DIR));
    });
}
// console.log(cacheGroups_Entry);

module.exports = {
    js: JS_Bundle_Entry,
    css: CSS_Bundle_Entry,
    cacheGroups: cacheGroups_Entry,
};
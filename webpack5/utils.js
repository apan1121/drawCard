/* eslint-disable default-param-last */
const fs = require('fs');
const path = require('path');

const getFileList = (key, filePath, ignoreFileName = [], matchExt = []) => {
    let storage = {};
    fs.readdirSync(filePath).forEach((fileName) => {
        console.log(fileName);
        if (fileName.startsWith('_')) {
            console.log('_____');
            return;
        }

        if (fs.statSync(path.join(filePath, fileName)).isDirectory()) {
            if (ignoreFileName.indexOf(fileName) === -1) {
                storage = {
                    ...storage,
                    ...getFileList(
                        `${key}/${fileName}`,
                        `${filePath}/${fileName}`,
                        ignoreFileName,
                        matchExt,
                    ),
                };
            }
        } else {
            let matchFlag = false;

            if (matchExt.length === 0) {
                matchFlag = true;
            } else {
                const ext = fileName.split('.').pop();

                if (matchExt.indexOf(ext) !== -1) {
                    matchFlag = true;
                }
            }

            if (matchFlag) {
                if (ignoreFileName.indexOf(fileName) !== -1) {
                    matchFlag = false;
                }
            }

            if (matchFlag) {
                const tmpFile = fileName.split('.').slice(0, -1).join('.');
                const ext = fileName.split('.').pop();

                if (matchExt.indexOf(ext) !== -1) {
                    // for css
                    storage[`${key}/${tmpFile}`] = [`${filePath}/${fileName}`];
                } else {
                    // for js
                    storage[`${key}/${tmpFile}`] = [
                        'core-js/stable',
                        'regenerator-runtime/runtime',
                        `${filePath}/${fileName}`,
                    ];
                }
            }
        }
    });
    return storage;
};

const getCacheGroupsList = function(key, filePath, approveFileName = [], matchExt = [], targetFolder){
    let storage = {};
    fs.readdirSync(filePath).forEach((fileName) => {
        if (fileName.startsWith('_')) {
            return;
        }

        if (fs.statSync(path.join(filePath, fileName)).isDirectory()) {
            storage = {
                ...storage,
                ...getCacheGroupsList(
                    `${key}_${fileName}`,
                    `${filePath}/${fileName}`,
                    approveFileName,
                    matchExt,
                    targetFolder,
                ),
            };
        } else {
            let matchFlag = false;

            const tmpFile = fileName.split('.').slice(0, -1).join('.');
            const ext = fileName.split('.').pop();

            if (matchExt.length === 0) {
                matchFlag = true;
            } else {
                if (matchExt.indexOf(ext) !== -1) {
                    matchFlag = true;
                }
            }

            if (matchFlag) {
                if (approveFileName.indexOf(tmpFile) !== -1) {
                    matchFlag = true;
                } else {
                    matchFlag = false;
                }
            }

            if (matchFlag) {
                const new_path = filePath.replace(targetFolder, '');
                const regex = new RegExp(`/js${new_path}`.replace(/\//ig, '[\\/]'));

                storage[key] = {
                    test: regex,
                    name: `chunk${new_path}`,
                    chunks: 'all',
                    minSize: 1,
                    minChunks: 1,
                    enforce: true,
                    priority: 900,
                    reuseExistingChunk: true,
                };
            }
        }
    });
    return storage;
};

const walkSync = function(dir, whiteList = [], fileList = [], depth = 0){
    const folders = [];
    depth += 1;

    fs.readdirSync(dir).forEach((fileName) => {
        if (depth > 1) {
            if (fs.statSync(path.join(dir, fileName)).isFile()) {
                folders.push(fileName);
            }
        } else {
            if (fs.statSync(path.join(dir, fileName)).isDirectory()) {
                if (whiteList.length > 0 && !whiteList.includes(fileName)) {
                    return;
                }

                fileList = walkSync(path.join(dir, fileName), whiteList, fileList, depth);
            }
        }
    });

    if (folders.indexOf('main.js') !== -1) {
        fileList.push(path.join(dir, 'main.js'));
    } else {
        folders.forEach((fileName) => {
            if (fileName.indexOf('.min') !== -1) {
                return;
            }
            fileList.push(path.join(dir, fileName));
        });
    }

    return fileList;
};

module.exports = {
    getFileList,
    getCacheGroupsList,
    walkSync,
};
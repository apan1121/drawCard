/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-extra-boolean-cast */
import './vendor/canvasResize/exif';
import './vendor/canvasResize/binaryajax';
import './vendor/canvasResize/canvasResize';

import Compressor from 'compressorjs';

const defaultOptions = {
    ajaxHeader: false,
    ajaxParams: null,
    dropSelector: '',
    clickBtnSelector: '',
    textSelector: '',
    uploadUrl: false,
    mimeTypeList: false,
    imgMaxSize: false,
    imgResize: true,
    multiple: false,
    file_max_size: false, // 單位為 byte， N * 1024 * 1024
    process_callback: null, // callback function
};

const main = function(options){
    const that = this;

    that.options = {
        ...defaultOptions,
        ...options,
    };

    if (!Array.isArray(that.options.mimeTypeList)) {
        that.options.mimeTypeList = false;
    }

    let inputFile = null;
    let dragleaveTimer = null;
    let copyTimer = null;

    let dropTarget = null;
    let clickTargets = null;
    let textTarget = null;

    const createUidId = function(length){
        if (!length) {
            length = 10;
        }

        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i += 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    };

    /* 處理過程回傳的參數
        checkFileError 確認檔案有錯誤
        checkImgResize 檢查是否需要圖片壓縮
        imgResizeDone 圖片壓縮完成
    */
    const process_callback = function(type, data, fileIndex){
        if (typeof (that.options.process_callback) === 'function') {
            that.options.process_callback(type, data, fileIndex);
        } else {
            console.log(type, data);
        }
    };

    const process_upload = function(fileIndex, file, uploadUrl){
        const url = (!!uploadUrl) ? uploadUrl : that.options.uploadUrl;

        if (!!url) {
            const formData = new FormData();
            formData.append('file', file, file.name);

            if (!!that.options.ajaxParams) {
                for (const dataKey in that.options.ajaxParams) {
                    formData.append(dataKey, that.options.ajaxParams[dataKey]);
                }
            }

            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.withCredentials = true;

            if (!!that.options.ajaxHeader && typeof (that.options.ajaxHeader) === 'object') {
                for (const headerKey in that.options.ajaxHeader) {
                    xhr.setRequestHeader(headerKey, that.options.ajaxHeader[headerKey]);
                }
            }

            xhr.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    /* 計算上傳百分比 */
                    const loaded = Math.ceil((e.loaded / e.total) * 100);

                    process_callback('uploadProcess', { loaded }, fileIndex);
                }
            }, false);

            xhr.addEventListener('error', (e) => {
                console.log('error', xhr, e);
                process_callback('uploadError', { error: true, http_status: xhr.status }, fileIndex);
            });

            xhr.addEventListener('abort', (e) => {
                console.log('abort', xhr, e);
                process_callback('uploadError', { abort: true, http_status: xhr.status }, fileIndex);
            });

            xhr.addEventListener('load', (e) => {
                if (xhr.status === '200' || xhr.status === 200) {
                    process_callback('uploadResponseDone', { ...JSON.parse(xhr.responseText), http_status: xhr.status }, fileIndex);
                } else {
                    process_callback('uploadResponseError', { ...JSON.parse(xhr.responseText), http_status: xhr.status }, fileIndex);
                }
            });

            xhr.send(formData);
        } else {
            process_callback('uploadError', { uploadUrl: url }, fileIndex);
        }
    };

    /* 使用 canvasResize 進行縮圖 */
    const process_imgResize = function(file){
        /* 壓縮程序 */
        return new Promise((resolve) => {
            // eslint-disable-next-line no-shadow
            const compressor = (file, width, height) => {
                const compressor_options = {
                    quality: 0.9,
                    checkOrientation: true,
                    success(result){
                        const reader = new FileReader();
                        reader.readAsDataURL(result);
                        reader.onload = () => {
                            resolve({ newFile: result, base64Data: reader.result });
                        };
                    },
                    error(err){
                        console.log(err.message);
                    },
                };

                if (width > height) {
                    if (!Number.isNaN(that.options.imgMaxSize[0])) {
                        const maxWidth = that.options.imgMaxSize[0];
                        compressor_options.width = parseInt(maxWidth);
                    } else if (!Number.isNaN(that.options.imgMaxSize[1])) {
                        const maxHeight = that.options.imgMaxSize[1];
                        compressor_options.height = parseInt(maxHeight);
                    }
                } else {
                    if (!Number.isNaN(that.options.imgMaxSize[1])) {
                        const maxHeight = that.options.imgMaxSize[1];
                        compressor_options.height = parseInt(maxHeight);
                    } else if (!Number.isNaN(that.options.imgMaxSize[0])) {
                        const maxWidth = that.options.imgMaxSize[0];
                        compressor_options.width = parseInt(maxWidth);
                    }
                }

                const compressorObj = new Compressor(file, compressor_options);
            };

            // eslint-disable-next-line no-shadow
            const checkImageSize = (file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(){
                    const image = new Image();
                    image.onload = function(){
                        compressor(file, this.width, this.height);
                    };
                    image.src = this.result;
                };
            };

            checkImageSize(file);

            // const compressor_options = {
            //     quality: 0.9,
            //     checkOrientation: true,
            //     success(result){
            //         const reader = new FileReader();
            //         reader.readAsDataURL(result);
            //         reader.onload = () => {
            //             resolve({ newFile: result, base64Data: reader.result });
            //         };
            //     },
            //     error(err){
            //         console.log(err.message);
            //     },
            // };

            // if (!Number.isNaN(that.options.imgMaxSize[0])) {
            //     const maxWidth = that.options.imgMaxSize[0];
            //     compressor_options.width = parseInt(maxWidth);
            // }

            // if (!Number.isNaN(that.options.imgMaxSize[1])) {
            //     const maxHeight = that.options.imgMaxSize[1];
            //     compressor_options.height = parseInt(maxHeight);
            // }

            // console.log(compressor_options);

            // const compressor = new Compressor(file, compressor_options);

            // canvasResize(file, {
            //     width: that.options.imgMaxSize[0],
            //     height: that.options.imgMaxSize[1],
            //     crop: false,
            //     quality: 100,
            //     // rotate: 90,
            //     callback(base64Data, width, height){
            //         /* 轉成 blob 檔案 */
            //         const newFile = canvasResize('dataURLtoBlob', base64Data);
            //         /* 內容塞回去 */
            //         newFile.name = file.name;
            //         newFile.lastModified = file.lastModified;
            //         newFile.lastModifiedDate = file.lastModifiedDate;

            //         resolve({ newFile, base64Data });
            //     },
            // });
        });
    };

    /* 檢查圖片尺寸是否符合上傳限制 */
    const process_checkImgSize = function(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image;
                img.onload = () => {
                    if (img.width <= that.options.imgMaxSize[0] && img.height <= that.options.imgMaxSize[1]) {
                        resolve();
                    } else {
                        reject();
                    }
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        });
    };

    /* 輸出檔案。判斷 uploadUrl 是否設定，決定是否要上傳，還是直接輸檔案。 */
    const process_output = function(fileIndex, file){
        if (!!that.options.uploadUrl) {
            process_upload(fileIndex, file, that.options.uploadUrl);
        } else {
            process_callback('outputFile', file, fileIndex);
        }
    };

    /* 確認上傳程序 */
    const checkUploadFile = function(files){
        /* 逐檔執行確認 */
        for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
            /* 取出檔案 */
            const file = files[fileIndex];
            /* mime 比對 flag */
            let matchMIMEFlag = true;
            /* 如果名單內有東西 */
            if (!!that.options.mimeTypeList) {
                /* 先改成 false */
                matchMIMEFlag = false;
                for (const regIndex in that.options.mimeTypeList) {
                    const regexp = new RegExp(that.options.mimeTypeList[regIndex], 'ig');
                    if (!!file.type.match(regexp)) {
                        matchMIMEFlag = true;
                        break;
                    }
                }
            }

            /* 檔案 size 檢查 */
            let matchFileSizeFlag = true;
            if (!!that.options.file_max_size) {
                matchFileSizeFlag = false;
                if (file.size < that.options.file_max_size) {
                    matchFileSizeFlag = true;
                }
            }

            const newfileIndex = createUidId();

            /* 如果都比對成功，執行上傳 */
            if (matchMIMEFlag && matchFileSizeFlag) {
                const fileInfo = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                };
                process_callback('beforeUpload', fileInfo, newfileIndex);

                // 判斷是否為圖片
                if (!!file.type.match('image/*') && file.type !== 'image/gif' && !!that.options.imgMaxSize && Array.isArray(that.options.imgMaxSize)) {
                    // 判斷是否要進行 Resize 處理
                    if (!!that.options.imgResize) {
                        process_callback('checkImgResize', true, fileIndex);
                        process_imgResize(file).then((data) => {
                            process_callback('imgResizeDone', { newFile: data.newFile, base64: data.base64Data }, fileIndex);
                            process_output(fileIndex, data.newFile);
                        });
                    } else {
                        process_callback('checkImgResize', false, fileIndex);
                        process_checkImgSize(file).then(() => {
                            process_callback('checkImgSize', true, fileIndex);
                            // 圖片符合限制，輸出圖片。
                            process_output(fileIndex, file);
                        }).catch(() => {
                            // 圖片不符合限制，callback 'checkImgSize(false)'。
                            process_callback('checkImgSize', false, fileIndex);
                        });
                    }
                } else {
                    process_output(fileIndex, file);
                }

                if (!that.options.multiple) {
                    break;
                }
            } else {
                /* 如果有錯誤，回傳 checkFileError 錯誤內容 */
                const checkFileError = {};
                checkFileError.name = file.name;

                if (!matchMIMEFlag) {
                    checkFileError.mime = file.type;
                }

                if (!matchFileSizeFlag) {
                    checkFileError.size = file.size;
                    checkFileError.limitSize = that.options.file_max_size;
                }

                process_callback('checkFileError', checkFileError, fileIndex);
            }
        }
    };

    /* dom 觸發事件 */
    const eventAction = {
        /* 拖拉區塊，進入 增加 class drop */
        dragover(e){
            e.preventDefault();
            e.stopPropagation();

            dropTarget.classList.add('drop');
            clearTimeout(dragleaveTimer);
        },
        /* 拖拉區塊，離開 移除 class drop */
        dragleave(e){
            e.preventDefault();
            e.stopPropagation();
            dragleaveTimer = setTimeout(() => {
                dropTarget.classList.remove('drop');
            }, 10);
        },
        /* 拖拉事件，放開 執行 確認上傳程序 */
        drop(e){
            e.preventDefault();
            e.stopPropagation();
            dropTarget.classList.remove('drop');

            const tmpfiles = e.target.files || e.dataTransfer.files;
            const files = [];
            for (let fileIndex = 0; fileIndex < tmpfiles.length; fileIndex += 1) {
                files.push(tmpfiles.item(fileIndex));
            }

            checkUploadFile(files);
        },

        /* 貼上上傳，在指定區域 */
        paste(e){
            // 偵測剪貼簿裡是否有圖檔，沒有的話就結束，有的話存在 file
            const INPUT = this;
            if (e.clipboardData.items.length > 0) {
                const tmpfiles = e.clipboardData.items;
                const files = [];
                for (let fileIndex = 0; fileIndex < tmpfiles.length; fileIndex += 1) {
                    if (!!tmpfiles[fileIndex].getAsFile()) {
                        files.push(tmpfiles[fileIndex].getAsFile());
                    }
                }

                if (files.length > 0) {
                    clearTimeout(copyTimer);
                    copyTimer = setTimeout(() => {
                        checkUploadFile(files);
                    }, 100);
                }
            }
        },

        /* 點擊 上傳按鈕，觸發 input file 被點擊 */
        click(e){
            e.preventDefault();
            e.stopPropagation();
            inputFile.click();
        },

        /* input file 被改變，執行 確認上傳程序 */
        change(e){
            e.preventDefault();
            e.stopPropagation();

            const tmpfiles = e.target.files || e.dataTransfer.files;
            const files = [];
            for (let fileIndex = 0; fileIndex < tmpfiles.length; fileIndex += 1) {
                files.push(tmpfiles.item(fileIndex));
            }

            checkUploadFile(files);

            setTimeout(() => {
                this.type = '';
                this.type = 'file';
            }, 100);
        },
    };

    /* 移除＋綁定 （對象, 綁定名稱, 綁定 func) */
    const bindEvent = function(target, eventKey, event_func){
        target.removeEventListener(eventKey, event_func, false);
        target.addEventListener(eventKey, event_func, false);
    };
    const unbindEvent = function(target, eventKey, event_func){
        target.removeEventListener(eventKey, event_func, false);
    };

    /* 建立隱藏的 input file, 綁定 change 動作 */
    const create_input_file = function(){
        inputFile = document.createElement('INPUT');
        inputFile.setAttribute('type', 'file');

        if (!!that.options.mimeTypeList) {
            inputFile.setAttribute('accept', that.options.mimeTypeList.join(','));
        }

        /* 如果是多筆，加上 multiple 屬性 */
        if (that.options.multiple === true) {
            inputFile.setAttribute('multiple', true);
        }

        ['change'].forEach((eventKey) => {
            bindEvent(inputFile, eventKey, eventAction[eventKey]);
        });
    };

    const destroy_input_file = function(){
        ['change'].forEach((eventKey) => {
            unbindEvent(inputFile, eventKey, eventAction[eventKey]);
        });
        inputFile.remove();
    };

    /* 設定 drop 對象的綁定動作，dragover  dragleave  drop */
    const set_drop_action = function(){
        if (!!that.options.dropSelector) {
            dropTarget = document.querySelector(that.options.dropSelector);
        }
        if (!!dropTarget) {
            ['dragover', 'dragleave', 'drop', 'paste'].forEach((eventKey) => {
                bindEvent(dropTarget, eventKey, eventAction[eventKey]);
            });
        }
    };

    /* 設定 drop 對象的綁定動作，dragover  dragleave  drop */
    const unset_drop_action = function(){
        if (!!that.options.dropSelector) {
            dropTarget = document.querySelector(that.options.dropSelector);
        }
        if (!!dropTarget) {
            ['dragover', 'dragleave', 'drop', 'paste'].forEach((eventKey) => {
                unbindEvent(dropTarget, eventKey, eventAction[eventKey]);
            });
        }
    };

    /* 設定 click 對象的綁定動作，click */
    const set_click_action = function(){
        if (!!that.options.clickBtnSelector) {
            clickTargets = document.querySelectorAll(that.options.clickBtnSelector);
        }

        if (!!clickTargets) {
            clickTargets.forEach((target) => {
                ['click'].forEach((eventKey) => {
                    bindEvent(target, eventKey, eventAction[eventKey]);
                });
            });
        }
    };

    const set_text_action = function(){
        if (!!that.options.textSelector) {
            textTarget = document.querySelector(that.options.textSelector);
        }
        if (!!textTarget) {
            ['paste'].forEach((eventKey) => {
                bindEvent(textTarget, eventKey, eventAction[eventKey]);
            });
        }
    };

    const init = function(){
        create_input_file();
        set_drop_action();
        set_click_action();
        set_text_action();
    };

    const clearFile = function(){
        inputFile.value = '';
    };

    const destroy = function(){
        destroy_input_file();
        unset_drop_action();
    };

    init();

    that.process_upload = process_upload;
    that.clearFile = clearFile;
    that.destroy = destroy;
};

export default main;
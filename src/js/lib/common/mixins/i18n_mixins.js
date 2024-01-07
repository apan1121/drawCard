import { useI18n } from 'vue-i18n';

export default {
    data(){
        return {
            /**
             * component 如果需要語系完成才執行可以聽這個值
             */
            i18nReady: false,
            /**
             * 此 component 需要的語系字串
             */
            langPaths: [],
        };
    },
    computed: {
        /**
         * 當前選擇的語言
         */
        currentI18nLocal(){
            let locale = '';
            if (this.$i18n) {
                locale = this.$i18n.locale;
            }
            return locale;
        },
        /**
         * 語系找不到資料時要用的預設語言
         */
        fallbackI18nLocale(){
            let locale = '';
            if (this.$i18n) {
                locale = this.$i18n.fallbackLocale;
            }
            return locale;
        },
    },
    watch: {
        /**
         * 當前語系改變時，要載入語言包
         */
        currentI18nLocal: {
            immediate: true,
            handler(){
                this.loadL10n();
            },
        },
        /**
         * 需要的語言包路徑
         */
        langPaths: {
            immediate: true,
            handler(){
                this.loadL10n();
            },
        },
    },
    created(){
    },
    methods: {
        $t(key, b, c){
            const that = this;
            let message = '';
            if (this.i18nReady) {
                const path = key.split('.')[0];
                const { currentI18nLocal, langPaths } = that;
                if (!this.$i18n.messages[currentI18nLocal] || !this.$i18n.messages[currentI18nLocal][path]) {
                    // console.log(`${path} 未載入`, langPaths);
                } else {
                    message = this.$i18n.t(key, b, c);
                    // console.log('message', message, key);
                    if (message === key) {
                        let i18nObj = this.$i18n.messages[currentI18nLocal][path];
                        const pathList = key.split('.');
                        if (pathList.length > 1) {
                            // eslint-disable-next-line no-plusplus
                            for (let i = 1; i < pathList.length; i++) {
                                if (typeof i18nObj[pathList[i]] !== 'undefined') {
                                    i18nObj = i18nObj[pathList[i]];
                                } else {
                                    i18nObj = undefined;
                                }
                            }
                        }

                        if (typeof i18nObj !== 'undefined') {
                            message = i18nObj;
                        } else {
                            message = key;
                            console.log(`${key} 不存在`);
                        }
                    }
                }
            }
            return message;
        },
        /**
         * 讀取 L10n 檔案，根據濾鏡
         */
        loadL10n(){
            const that = this;
            clearTimeout(that.loadL10nTimer);
            that.loadL10nTimer = setTimeout(() => {
                /**
                 * 取得 當前 local, fallback local, 跟需要的路徑
                 */
                const { currentI18nLocal, fallbackI18nLocale, langPaths } = that;

                if (currentI18nLocal && langPaths) {
                    /**
                     * 檢查此路徑是否有備載入過
                     */

                    if (!this.$i18n.messages) {
                        this.$i18n.messages = {};
                    }

                    const needPaths = langPaths.filter((path) => !this.$i18n.messages[currentI18nLocal] || !this.$i18n.messages[currentI18nLocal][path]);
                    if (needPaths.length > 0) {
                        /**
                         * 載入語言包時，一定要連 fallback locale 也一起載入
                         */
                        const collectLangs = [
                            currentI18nLocal,
                            fallbackI18nLocale,
                        ];
                        that.$store.dispatch('loadL10n', { locales: collectLangs, langPaths: needPaths }).then((messages) => {
                            /**
                             * 合併內容至 i18n 中
                             */
                            for (const tmpLocale in messages) {
                                that.$i18n.mergeLocaleMessage(tmpLocale, messages[tmpLocale]);
                            }

                            that.i18nReady = true;
                        });
                    } else {
                        that.i18nReady = true;
                    }
                } else {
                    that.i18nReady = true;
                }
            }, 1);
        },
    },
};
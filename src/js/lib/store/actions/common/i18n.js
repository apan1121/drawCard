export default {
    loadL10n({ commit, getters, state }, params){
        return new Promise((resolve, reject) => {
            /**
             * 要找的語系跟路徑
             */
            const { locales, langPaths } = params;
            const { L10nStorage } = getters;

            const langData = {};
            const needLangPaths = [];

            const locales_unique = locales.filter((value, index, self) => self.indexOf(value) === index);

            /**
             * 檢查要取得的路徑是否已經使用過
             */
            locales_unique.forEach((locale) => {
                langData[locale] = {};
                langPaths.forEach((path) => {
                    if (L10nStorage[locale] && L10nStorage[locale][path]) {
                        /**
                         * 合併資料
                         */
                        // langData[locale] = Object.assign(langData[locale], L10nStorage[locale][path]);
                    } else {
                        /**
                         * 需要載入的路經跟語系
                         */
                        needLangPaths.push({
                            locale,
                            path,
                        });
                    }
                });
            });

            // eslint-disable-next-line arrow-body-style
            Promise.all(needLangPaths.map(({ locale, path }) => {
                /**
                 * 取得 json 檔案
                 */
                return import(`lang/${locale}/${path}.json`).then((message) => {
                    /**
                     * 合併至 langData;
                     */
                    const langMsg = {};
                    langMsg[path] = message.default;
                    langData[locale] = Object.assign(langData[locale], langMsg);
                }).catch(() => {
                    /**
                     * 取得失敗合併空的路徑進去
                     */
                    const langMsg = {};
                    langMsg[path] = {};
                    langData[locale] = Object.assign(langData[locale], langMsg);
                });
            })).then(() => {
                /**
                 * 儲存至 vuex 中
                 */
                commit('storeL10n', langData);
                /**
                 * 回傳至外層
                 */
                resolve(langData);
            }).catch(() => {
                resolve({});
            });
        });
    },
};
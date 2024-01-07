import { toRaw } from 'vue';
import Cookies from 'js-cookie';
import { createI18n } from 'vue-i18n';

import { jsVars, string } from 'lib/common/util';

/**
 * 多語系相關動作都在這個 mixins，在 jsx 註冊時注入即可
 */
import i18n_mixins from 'lib/common/mixins/i18n_mixins';

/**
 * create i18n
 */
export const createI18ns = () => {
    /**
     * 取得預設值
     */
    const fallbackLocale = jsVars.get('locale', 'en');

    /**
     * 取得此伺服器支援的語系
     */
    const LOCALE_SUPPORT = jsVars.get('CONFIG.LOCALE_SUPPORT', {});

    /**
     * 取得 cookie 選擇語系
     */
    let locale = Cookies.get('apan1121_global_locale_choose', false);

    /**
     * 網址帶入的語系
     *
     */
    const query = string.getJsonFromUrl(window.location.search.substr(1));
    if (query.locale) {
        locale = query.locale;
    }

    if (!locale) {
        locale = navigator.language;
        if (locale.includes('zh-')) {
            locale = 'zh-TW';
        }
    }

    /**
     * 檢查是否有選擇語系，或是伺服器有支援此語系
     */
    if (!LOCALE_SUPPORT[locale]) {
        locale = fallbackLocale;
    }

    const i18n = createI18n({
        /**
         * 選擇語言
         */
        locale,
        /**
         * 預設語言，選擇語言有缺字時，會找預設語言
         */
        fallbackLocale,
        /**
         * 一開始不會載入任何語言，會根據 mixins data 中的 langPaths，去動態載入內容
         */
        messages: {
        },
    });

    return i18n;
};

export const mixinsI18ns = i18n_mixins;

export default {
    createI18ns,
    i18n_mixins,
};

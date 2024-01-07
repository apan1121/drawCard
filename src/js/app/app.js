import { createApp, defineAsyncComponent } from 'vue';
import $ from 'jquery';
import 'vendor/imgLiquid/imgLiquid';
import { jsVars } from 'lib/common/util';


/* 全頁偵測 resize Image */
let resizeImageTimer = null;
$('body').on('resizeImg', () => {
    clearTimeout(resizeImageTimer);
    resizeImageTimer = setTimeout(() => {
        $('.imgLiquidFill').imgLiquid();
    }, 50);
});


const { origin, pathname } = window.location;
const BASE_API_HOST = `${origin}${pathname}`;
jsVars.set('API_CONFIG.API_HOST', BASE_API_HOST);
jsVars.set('ASSETS_HOST', BASE_API_HOST);
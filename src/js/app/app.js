import $ from 'jquery';
import 'vendor/imgLiquid/imgLiquid';


/* 全頁偵測 resize Image */
var resizeImageTimer = null;
$("body").on('resizeImg', function(){
    clearTimeout(resizeImageTimer);
    resizeImageTimer = setTimeout(function(){
        $('.imgLiquidFill').imgLiquid();
    }, 50);
});
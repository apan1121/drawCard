/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
// easing functions http://goo.gl/5HLl8
Math.easeInOutQuad = function(t, b, c, d){
    t /= d / 2;
    if (t < 1) {
        return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function(t, b, c, d){
    const tc = (t /= d) * t * t;
    return b + c * (tc);
};

Math.inOutQuintic = function(t, b, c, d){
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
const requestAnimFrame = (function(){
    return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
}());

let checkTimer = null;
let stopTimer = null;

function scrollTo({ selector = '', duration = 1500, buffer = 0,
    callback = null, animate = false, wait = false,
    container = null }){
    // because it's so fucking difficult to detect the scrolling element, just move them all
    function move(amount){
        if (!!container) {
            container.scrollTop = amount;
        } else {
            document.documentElement.scrollTop = amount;
            document.body.parentNode.scrollTop = amount;
            document.body.scrollTop = amount;
        }
    }

    function position(){
        if (!!container) {
            return container.scrollTop;
        }
        return document.documentElement.scrollTop
            || document.body.parentNode.scrollTop
            || document.body.scrollTop;
    }

    function scroll(element){
        let headerHeight = 0;
        if (!container) {
            if (document.querySelector('#header-bar')) {
                headerHeight = document.querySelector('#header-bar').offsetHeight;
            }
        }

        let navbarHeight = 0;
        if (document.querySelector('#header-bar .navbar')) {
            navbarHeight = document.querySelector('#header-bar .navbar').offsetHeight;
        }

        const delta = headerHeight + navbarHeight + buffer;
        // console.log('delta:', delta);

        const elementY = element.offsetTop;
        // console.log('elementY:', elementY);

        const startY = position();
        // console.log('startY:', startY);

        const change = elementY - startY - delta;
        // console.log('change:', change);

        let currentTime = 0;
        const increment = 20;

        const step = function(){
            if (!animate) {
                currentTime += increment;
                const val = startY + change;
                move(val);

                // if (currentTime < 1) {
                //     requestAnimFrame(step);
                // } else {
                //     if (callback && typeof (callback) === 'function') {
                //         // the animation is done so lets callback
                //         callback();
                //     }
                // }

                if (callback && typeof (callback) === 'function') {
                    // the animation is done so lets callback
                    callback();
                }
            } else {
                // increment the time
                currentTime += increment;
                // find the value with the quadratic in-out easing function
                const val = Math.easeInOutQuad(currentTime, startY, change, duration);
                // move the document.body
                move(val);
                // do the animation unless its over
                if (currentTime < duration) {
                    requestAnimFrame(step);
                } else {
                    if (callback && typeof (callback) === 'function') {
                        // the animation is done so lets callback
                        callback();
                    }
                }
            }
        };

        requestAnimFrame(step);
    }

    function checkElement(){
        checkTimer = setInterval(() => {
            if (!!selector) {
                // const target = document.querySelector(selector);

                let target = null;
                // eslint-disable-next-line no-prototype-builtins
                if (Node.prototype.isPrototypeOf(selector)) {
                    target = selector;
                } else {
                    target = document.querySelector(selector);
                }

                if (target) {
                    // console.log('FIND TARGET');
                    clearInterval(checkTimer);
                    clearTimeout(stopTimer);

                    if (!!wait) {
                        setTimeout(() => {
                            scroll(target);
                        }, wait);
                    } else {
                        scroll(target);
                    }
                } else {
                    // console.log('KEEP LOOKING!!');
                }
            }
        }, 100);
    }

    checkElement();

    // 超過幾秒，停止搜尋...
    stopTimer = setTimeout(() => {
        clearInterval(checkTimer);
        clearTimeout(stopTimer);
        // console.log('SEARCH TARGET TIMES UP!!');
    }, 5000);
}

export default scrollTo;
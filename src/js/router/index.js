import { jsVars, history_route, popup } from 'lib/common/util';

import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
    // {
    //     path: '/',
    //     name: 'A',
    //     component: () => import('components/A/main.vue'),
    // },
    // {
    //     path: '/B',
    //     name: 'B',
    //     component: () => import('components/B/main.vue'),
    // },
];

// let referrer_url = '';

export const createRoutes = (store) => {
    const router = createRouter({
        linkActiveClass: '',
        linkExactActiveClass: 'is-active',
        history: createWebHashHistory(),
        routes,
        scrollBehavior(to, from, savedPosition){
            // // console.log(savedPosition);
            // if (savedPosition) {
            //     if (['assignment', 'assignment_landing'].includes(to.name)) {
            //         return {
            //             left: 0,
            //             top: 0,
            //         };
            //     }

            //     return savedPosition;
            // }

            // const position = {};
            // // scroll to anchor by returning the selector
            // if (to.hash) {
            //     position.el = to.hash;
            //     position.behavior = 'smooth';

            //     if (/^#\d/.test(to.hash) || document.querySelector(to.hash)) {
            //         return position;
            //     }

            //     return false;
            // }

            // return new Promise((resolve) => {
            //     // // check if any matched route config has meta that requires scrolling to top
            //     // if (to.matched.some((m) => m.meta.scrollToTop)) {
            //     //     // coords will be used if no selector is provided,
            //     //     // or if the selector didn't match any element.
            //     //     position.left = 0;
            //     //     position.top = 0;
            //     // }

            //     if (!['general', 'articles'].includes(to.name)) {
            //         position.left = 0;
            //         position.top = 0;
            //     }

            //     resolve(position);
            // });
        },
    });

    router.beforeEach(async (to, from) => {
        let auth = true;
        // console.log(to, from);
        // if (!['NotFound'].includes(to.name)) {
        //     const matchRouter = to.matched[to.matched.length - 1];
        //     const params = {
        //         route_name: matchRouter.name,
        //         type: to.meta.type,
        //         data: {
        //             ...to.params,
        //             ...to.query,
        //         },
        //         url: to.fullPath,
        //         uri: matchRouter.path,
        //     };
        //     auth = await checkPageAuth(params);
        //     if (auth) {
        //         if (from.href) {
        //             jsVars.set('referer', from.href);
        //         }
        //     }
        // }
        // return auth;
    });

    router.afterEach((to, from, failure) => {
        // // if (!mobile_app.isMobileApp()) {
        // if (!!referrer_url) {
        //     window.resetReferrerUrl(referrer_url);
        // }
        // referrer_url = window.location.href;

        // // ppPanel pageView setting
        // ppPanel.pageView(`${to.meta.type}_${to.name}`, {
        //     ...to.params,
        //     ...to.query,
        // });

        // trackJS.mkgEventAction('page_view', '', {});
        // // }
    });

    return router;
};

export default {};
import { createApp, defineAsyncComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import './app.js';
import { createRoutes } from 'router';
import { createStores } from 'lib/store/index';
import 'jquery';
import 'bootstrap';

import { createI18ns, mixinsI18ns } from 'lib/i18n';

const store = createStores([
    'common',
]);

const i18n = createI18ns();

const app = createApp({
    components: {
        MainPage: defineAsyncComponent(() => import('components/MainPage/main.vue')),
    },
    filters: {},
    data(){
        return {
        };
    },
    computed: {
        ...mapGetters([
        ]),
    },
    watch: {
    },
    created(){
    },
    mounted(){
        const that = this;
        that.int();
    },
    methods: {
        int(){
        },
        ...mapActions([]),
        ...mapMutations([]),
    },
    store,
});

app.use(store);
app.use(i18n);
app.mixin(mixinsI18ns);
// app.use(router);
app.mount('#appBox');
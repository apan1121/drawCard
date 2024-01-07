<template>
    <div v-if="i18nReady" class="main-page">
        <header-bar></header-bar>
        <main style="padding: 0px 10px">
            <lucky-draw-box></lucky-draw-box>
        </main>
        <div v-if="config.backgroundImg" class="bg-img"
            :style="{
                'background-image': 'url(' + config.backgroundImg + ')',
                opacity: config.backgroundOpacity,
            }"
        ></div>

        <draw-card-storage-box></draw-card-storage-box>

    </div>
</template>
<script>
import { detectAnyAdblocker } from 'just-detect-adblock';

import { defineAsyncComponent } from 'vue';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { localStorage, string, trackJS } from 'lib/common/util';


// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    name: 'MainPage',
    components: {
        HeaderBar: defineAsyncComponent(() => import('components/HeaderBar/main.vue')),
        DrawCardStorageBox: defineAsyncComponent(() => import('components/DrawCardStorageBox/main.vue')),
        LuckyDrawBox: defineAsyncComponent(() => import('components/LuckyDrawBox/main.vue')),
    },
    filters: {},
    props: {},
    data(){
        return {
            audioPlayer: {},
            player: false,
            langPaths: [
                'common',
            ],
        };
    },
    computed: {
        ...mapGetters({
            config: 'config',
            cardList: 'cardList',
            prizeList: 'prizeList',
            prizeCardMapping: 'prizeCardMapping',
            winnerAudio: 'winnerAudio',
            playWinnerAudio: 'playWinnerAudio',
        }),
    },
    watch: {
        i18nReady: {
            handler(){
                const that = this;
                that.initSystem({ DefaultEventName: this.$t('common.Random.EventName') });
                that.setWebSEO();
            },
        },
        currentI18nLocal: {
            handler(){
                const that = this;
                that.setWebSEO();
            },
        },
        config: {
            deep: true,
            handler(){
                const that = this;
                that.saveToLocalStorageAct();
            },
        },
        'config.webTitle': {
            deep: true,
            handler(){
                trackJS.setDefault({ WebTitle: this.config.webTitle });
            },
        },
        cardList: {
            deep: true,
            handler(){
                const that = this;
                that.saveToLocalStorageAct();
            },
        },
        prizeList: {
            deep: true,
            handler(){
                const that = this;
                that.saveToLocalStorageAct();
            },
        },
        prizeCardMapping: {
            deep: true,
            handler(){
                const that = this;
                that.saveToLocalStorageAct();
            },
        },
        playWinnerAudio: {
            deep: true,
            handler(newVal, oldVal){
                if (newVal !== oldVal && this.audioPlayer[newVal]) {
                    if (this.audioPlayer[newVal]) {
                        if (this.player) {
                            this.player.pause();
                        }
                        this.player = this.audioPlayer[newVal];
                        this.player.pause();
                        this.player.currentTime = 0;
                        this.player.play();
                    }
                }
                if (newVal !== false) {
                    this.setPlayWinnerAudio(false);
                }
            },
        },
        isTutorial: {
            deep: true,
            handler(newVal, oldVal){
                if (newVal !== oldVal) {
                    trackJS.setDefault({ isTutorial: this.isTutorial });
                }
            },
        },
    },
    created(){},
    mounted(){
        this.init();
    },
    updated(){},
    unmounted(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            CheckAdBlock: 'CheckAdBlock',

            saveToLocalStorage: 'saveToLocalStorage',
            initSystem: 'initSystem',

            setPlayWinnerAudio: 'setPlayWinnerAudio',
        }),
        init(){
            const that = this;

            /**
             * 同步開兩個頁面的資料
             */
            localStorage.listen('drawDrawStorage', (data) => {
                that.listenLocalStorageChange();
            });

            /**
             * 設定音效
             */
            for (const key in that.winnerAudio) {
                this.audioPlayer[key] = new Audio(`./dist/mp3/${that.winnerAudio[key]}`);
            }

            /* 偵測 adblocker */
            detectAnyAdblocker().then((detected) => {
                that.CheckAdBlock(detected);
            });

            trackJS.setDefault({ locale: this.currentI18nLocal });
            trackJS.mixpanel('page_view', {});
            trackJS.gtag('event', 'page_view', {});
        },
        saveToLocalStorageAct(){
            const that = this;
            clearTimeout(that.saveToLocalStorageTimer);
            that.saveToLocalStorageTimer = setTimeout(() => {
                that.saveToLocalStorage();
            }, 500);
        },
        setWebSEO(){
            const that = this;
            const WebsiteTitle = that.$t('common.WebsiteTitle');
            const WebsiteDesc = that.$t('common.WebsiteDesc');

            window.document.title = WebsiteTitle;
            const link = document.createElement('a');
            link.href = window.location.href;
            const search = string.getJsonFromUrl(link.search.substr(1));
            search.lang = that.currentI18nLocal;
            link.search = string.object2QueryStr(search);
            const location = link.href;

            document.querySelector("meta[name='apple-mobile-web-app-title']").content = WebsiteTitle;
            document.querySelector("meta[property='og:title']").content = WebsiteTitle;
            document.querySelector("meta[name='description']").content = WebsiteDesc;
            document.querySelector("meta[property='og:description']").content = WebsiteDesc;
            document.querySelector("meta[property='og:url']").content = location;
            document.querySelector("link[rel='canonical']").href = location;
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
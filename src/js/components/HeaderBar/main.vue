<template>
    <div id="header-bar">
        <nav class="navbar navbar-expand-md navbar-dark fixed-top"
            :style="{ 'background-color': config.headerColor }"
        >
            <a class="navbar-brand" href="#">
                {{ config.webTitle || "Draw Card" }}
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navbarCollapse" class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto" rel="left">
                    <li class="nav-item">
                        <a class="nav-link" rel="CardList" @click="editCardList">
                            <i class="far fa-image"></i>
                            <span>{{ $t('common.Header.CardList') }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" rel="PrizeList" @click="editPrizeList">
                            <i class="fas fa-award"></i>
                            <span>{{ $t('common.Header.PrizeList') }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" rel="ResultList" @click="showResult">
                            <i class="fas fa-poll"></i>
                            <span>{{ $t('common.Header.ResultList') }}</span>
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav justify-content-end" rel="right">
                    <li class="nav-item dropdown" rel="i18n">
                        <a class="nav-link dropdown-toggle" href="#" role="button"
                            data-toggle="dropdown" aria-expanded="false"
                        >
                            <i class="fas fa-globe-asia"></i>

                            <span>{{ $t('common.Header.Language') }}</span>
                        </a>
                        <div class="dropdown-menu">
                            <template v-for="(text, key) in langOptions" :key="key">
                                <a class="dropdown-item"
                                    :href="`?locale=${key}`"
                                    @click.prevent="chooseLang(key)"
                                >{{ text }}</a>
                            </template>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" rel="Setting" @click="showSetting">
                            <i class="fas fa-cog"></i>

                            <span>{{ $t('common.Header.Setting') }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <setting-modal v-if="triggerOpenSetting"></setting-modal>
        <card-list-modal v-if="triggerOpenCardList"></card-list-modal>
        <prize-list-modal v-if="triggerOpenPrizeList"></prize-list-modal>
        <result-modal v-if="triggerOpenResult"></result-modal>
    </div>
</template>
<script>
import Cookies from 'js-cookie';

import { defineAsyncComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import history_route from 'lib/common/util/history_route';
import { string } from 'lib/common/util';

// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    name: 'HeaderBar',
    components: {
        SettingModal: defineAsyncComponent(() => import('components/SettingModal/main.vue')),
        CardListModal: defineAsyncComponent(() => import('components/CardListModal/main.vue')),
        PrizeListModal: defineAsyncComponent(() => import('components/PrizeListModal/main.vue')),
        ResultModal: defineAsyncComponent(() => import('components/ResultModal/main.vue')),
    },
    filters: {},
    props: {},
    data(){
        return {
            langPaths: [
                'common',
            ],
        };
    },
    computed: {
        ...mapGetters([
            'config',
            'langOptions',
            'triggerOpenCardList',
            'triggerOpenPrizeList',
            'triggerOpenResult',
            'triggerOpenSetting',
        ]),
    },
    watch: {
    },
    created(){},
    mounted(){},
    updated(){},
    unmounted(){},
    methods: {
        ...mapMutations({
            triggerModal: 'triggerModal',
        }),
        chooseLang(key){
            this.$i18n.locale = key;
            Cookies.set('apan1121_global_locale_choose', this.$i18n.locale, { expires: 30, path: '/' });

            let url = window.location.pathname;
            const query = string.getJsonFromUrl(window.location.search.substr(1));
            query.locale = key;
            url += `?${string.object2QueryStr(query)}`;
            history_route.replaceState(null, this.$t('common.WebsiteTitle'), url);
        },
        editCardList(){
            const that = this;
            that.triggerModal({ key: 'CardList' });
        },
        editPrizeList(){
            const that = this;
            that.triggerModal({ key: 'PrizeList' });
        },
        showResult(){
            const that = this;
            that.triggerModal({ key: 'Result' });
        },
        showSetting(){
            const that = this;
            that.triggerModal({ key: 'Setting' });
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
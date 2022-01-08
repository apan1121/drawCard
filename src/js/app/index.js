import Vue from 'vue';
import app from './app';
import { mapActions, mapGetters } from 'vuex';

import {createStore} from 'lib/store/index';

import {history_route, string, mixpanel} from 'lib/common/util';

import headerBarBox from './components/common/headerBarBox';
import cardListModal from './components/common/cardListModal';
import prizeListModal from './components/common/prizeListModal';
import resultModal from './components/common/resultModal';
import settingModal from './components/common/settingModal';

import luckyDrawBox from './components/common/luckyDrawBox';

const store = createStore([
    "common",
]);

import 'jquery';
import 'bootstrap';

let saveToLocalStorageTimer = null;

var Page = new Vue({
    el: '#appBox',
    data: function() {
        return {
            popstats: false,
        }
    },
    methods: {
        init: function(){
            const that = this;
            that.$store.dispatch("initSystem");
        },
        saveToLocalStorage: function(){
            const that = this;
            that.$store.dispatch("saveToLocalStorage");
        }
    },
    watch: {
        shortlist: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                that.saveToLocalStorage();
            }
        },
        cardList: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                that.saveToLocalStorage();
            }
        },
        prizeList: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                that.saveToLocalStorage();
            }
        },
        config: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                that.saveToLocalStorage();
            }
        },
        lockDrawIt: {
            handler(newVal, oldVal){
                if (newVal === false && oldVal !== false) {
                    this.$nextTick(() => {
                        const target = $(this.$el).find(`.lucky-draw-prize-box[data-prize_sn="${oldVal}"]`);
                        if (target.length > 0) {
                            const top = target.offset().top - 60;
                            $("html,body").animate({scrollTop: top}, 1);
                        }
                    });
                } else if (newVal !== false && oldVal === false){
                    this.$nextTick(() => {
                        const target = $(this.$el).find(`.lucky-draw-prize-box[data-prize_sn="${newVal}"]`);
                        if (target.length > 0) {
                            const top = target.offset().top - 60;
                            $("html,body").animate({scrollTop: top}, 1);
                        }
                    });
                }
            },
        },
    },
    computed: {
        ...mapGetters([
            "config",
            "cardList",
            "prizeList",
            "validCardList",
            "lockDrawIt",
        ])
    },
    mounted() {
        const that = this;
        that.init();
    },
    components: {
        headerBarBox,

        cardListModal,
        prizeListModal,
        resultModal,
        settingModal,

        luckyDrawBox,
    },
    store,
});
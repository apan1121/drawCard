<template>
    <div class="lucky-draw-box"
        :class="{
            empty: validPrizeList.length === 0,
        }"
    >
        <template v-if="validPrizeList.length > 0">
            <template v-for="prizeInfo in validPrizeList" :key="prizeInfo.sn">
                <transition-group name="lucky-draw-prize-box" tag="div"
                    enter-active-class="fadeInUp" leave-active-class="fadeOutDown"
                >
                    <lucky-draw-prize-box
                        :key="`prizeInfoTransition${prizeInfo.sn}`"
                        :prize-info="prizeInfo"
                    ></lucky-draw-prize-box>
                </transition-group>
            </template>
        </template>
        <template v-else>
            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                <i class="fas fa-bullhorn"></i>
                {{ $t('DrawPage.DrawNotice') }}
                <button type="button" class="close" data-dismiss="alert"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="lucky-draw-empty-box">
                <div class="lucky-draw-empty-info text-left">
                    <p>
                        {{ $t('DrawPage.DrawListHasNotBeenCreated') }} <br>
                        {{ $t('DrawPage.YouCan') }}：
                    </p>
                    <ol>
                        <li class="mb-2">
                            <a href="javascript:;" @click="editPrizeList">
                                {{ $t('DrawPage.EnterPrize') }}
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="javascript:;" @click="triggerTutorial">
                                {{ $t('DrawPage.WatchGuide') }}
                            </a>
                        </li>
                        <li class="mb-2">
                            <a href="javascript:;" @click="createRandomLuckyDrawAct">
                                {{ $t('DrawPage.RandomTest') }}
                            </a>
                        </li>
                    </ol>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import Tutorial from 'lib/common/util/tutorial';
import { string, trackJS } from 'lib/common/util';

// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {
        LuckyDrawPrizeBox: defineAsyncComponent(() => import('components/LuckyDrawPrizeBox/main.vue')),
    },
    filters: {},
    props: {},
    data(){
        return {
            langPaths: [
                'common',
                'DrawPage',
                'Tutorial',
            ],
        };
    },
    computed: {
        ...mapGetters({
            validPrizeList: 'validPrizeList',
            validCardList: 'validCardList',
            randomCardTitle: 'randomCardTitle',
            randomCardImg: 'randomCardImg',
            randomPrize: 'randomPrize',
            waitCardSN: 'waitCardSN',
            L10nStorage: 'L10nStorage',
        }),
    },
    watch: {
        L10nStorage: {
            immediate: true,
            deep: true,
            handler(){
                this.setL10nToState();
            },
        },
        currentI18nLocal: {
            immediate: true,
            deep: true,
            handler(newVal, oldVal){
                const that = this;
                if (newVal !== oldVal && !!oldVal) {
                    trackJS.setDefault({ locale: that.currentI18nLocal });
                    trackJS.mixpanel('Locale_choose', { locale: that.currentI18nLocal });
                    trackJS.gtag('event', 'Locale_choose', { locale: that.currentI18nLocal });
                    this.setL10nToState();
                }
            },
        },
    },
    beforeCreate(){
    },
    created(){},
    mounted(){
    },
    updated(){},
    unmounted(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            triggerModal: 'triggerModal',
            savePrize: 'savePrize',
            saveCard: 'saveCard',
            createRandomLuckyDraw: 'createRandomLuckyDraw',

            setL10n: 'setL10n',
            setIsTutorial: 'setIsTutorial',
        }),
        editPrizeList(){
            const that = this;
            that.triggerModal({ key: 'PrizeList' });
        },
        triggerTutorial(){
            const that = this;
            const config = {
                offset: {
                    top: 60,
                    bottom: 60,
                },
                startCallback(){
                    that.setIsTutorial(true);
                    trackJS.mixpanel('TutorialStart_trigger', { type: 'Tutorial' });
                    trackJS.gtag('event', 'TutorialStart_trigger', { type: 'Tutorial' });
                },
                closeCallback(){
                    that.setIsTutorial(false);
                    trackJS.mixpanel('TutorialEnd_trigger', { type: 'Tutorial' });
                    trackJS.gtag('event', 'TutorialEnd_trigger', { type: 'Tutorial' });
                },
                step_callback(node, IntroInfo){
                    trackJS.mixpanel('TutorialStep_trigger', { type: 'Tutorial', index: IntroInfo.index });
                    trackJS.gtag('event', 'TutorialStep_trigger', { type: 'Tutorial', index: IntroInfo.index });
                },
            };


            const randomPrize = that.randomPrize.split(',');
            const getRandomPrize = () => {
                const index = string.randRange(0, randomPrize.length - 1);
                const name = randomPrize.splice(index, 1);
                return name[0].split(':');
            };
            const randomCardTitle = that.randomCardTitle.split(',');
            const getRandomCardTitle = () => {
                const index = string.randRange(0, randomCardTitle.length - 1);
                const title = randomCardTitle.splice(index, 1);
                return title[0];
            };

            const randomCardImg = that.randomCardImg.split(',');
            const getRandomCardImg = () => {
                const index = string.randRange(0, randomCardImg.length - 1);
                const image = randomCardImg.splice(index, 1);
                return image[0];
            };

            const step = [
                {
                    target: '',
                    title: that.$t('Tutorial.NewbieTutorialTitle'),
                    intro: that.$t('Tutorial.NewbieTutorialDesc'),
                },
                {
                    target: '',
                    title: that.$t('Tutorial.NoPrizeTitle'),
                    intro: that.$t('Tutorial.NoPrizeDesc'),
                },
                {
                    target: '.navbar .navbar-nav .nav-item .nav-link[rel="PrizeList"]',
                    title: that.$t('Tutorial.WhereToCreatePrizeTitle'),
                    intro: that.$t('Tutorial.WhereToCreatePrizeDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        $('#navbarCollapse').addClass('show');
                        that.triggerModal({ key: 'PrizeList', close: false });
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                    afterAction(Element, TutorialNode, $next){
                        $('#navbarCollapse').removeClass('show');
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '#PrizeListBox button#addPrize',
                    title: that.$t('Tutorial.CreateNewPrizeTitle'),
                    intro: that.$t('Tutorial.CreateNewPrizeDesc'),
                    scrollTarget: '#PrizeListBox',
                    beforeAction(Element, TutorialNode, $next){
                        $('#navbarCollapse').removeClass('show');
                        that.triggerModal({ key: 'PrizeList' });
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                    afterAction(Element, TutorialNode, $next){
                        console.log({ Element });
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '#PrizeListBox .edit-prize-box',
                    title: that.$t('Tutorial.AddNewPrizeTitle'),
                    intro: that.$t('Tutorial.AddNewPrizeDesc'),
                    scrollTarget: '#PrizeListBox',
                    beforeAction(Element, TutorialNode, $next){
                        $('#PrizeListBox button#addPrize').trigger('click');
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                },
                {
                    target: '#PrizeListBox .edit-prize-box',
                    title: that.$t('Tutorial.QuicklyCreatePrizeTitle'),
                    intro: that.$t('Tutorial.QuicklyCreatePrizeDesc'),
                    scrollTarget: '#PrizeListBox',
                    beforeAction(Element, TutorialNode, $next){
                        const target = $('#PrizeListBox .edit-prize-box');
                        const [prize_title, prize_desc] = getRandomPrize();

                        const params = {
                            sn: 'add',
                            title: prize_title,
                            desc: prize_desc,
                            audio: '',
                            cnt: string.randRange(3, 3),
                            del: false,
                        };
                        that.savePrize(params);

                        if (that.validPrizeList.length) {
                            const prizeInfo = that.validPrizeList[that.validPrizeList.length - 1];
                            $('body').trigger('triggerFocusPrizeSN', prizeInfo.sn);
                        }

                        setTimeout(() => {
                            $next();
                        }, 200);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                },
                {
                    target: '#PrizeListBox .prize-cnt-notice',
                    title: that.$t('Tutorial.AmountOfPrizeTitle'),
                    intro: that.$t('Tutorial.AmountOfPrizeDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        $('#PrizeListBox .modal-body').scrollTop(0);
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                },
                {
                    target: '#PrizeListBox .btn-group .btn[edit-type="csv"]',
                    title: that.$t('Tutorial.BatchEditTitle'),
                    intro: that.$t('Tutorial.BatchEditDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        $('#PrizeListBox .btn-group .btn[edit-type="csv"]').trigger('click');
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                },
                {
                    target: '#PrizeListBox .download-csv',
                    title: that.$t('Tutorial.DownloadPrizeCSVTitle'),
                    intro: that.$t('Tutorial.DownloadPrizeCSVDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '#PrizeListBox .upload-csv',
                    title: that.$t('Tutorial.UploadPrizeCSVTitle'),
                    intro: that.$t('Tutorial.UploadPrizeCSVDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '.lucky-draw-prize-box.mask',
                    title: that.$t('Tutorial.PrizeCompletedTitle'),
                    intro: that.$t('Tutorial.PrizeCompletedDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        $('#PrizeListBox').modal('hide');
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                    afterAction(Element, TutorialNode, $next){
                        $('.lucky-draw-prize-box.mask .mask-wrapper').trigger('click');
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '.lucky-draw-prize-box',
                    title: that.$t('Tutorial.DrawCardWaitTitle'),
                    intro: that.$t('Tutorial.DrawCardWaitDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    beforeCheck(TutorialObj, Element, TutorialNode, $next){
                        if (that.validCardList.length < 3) {
                            TutorialObj.run('cardNotEnough');
                        } else {
                            TutorialObj.run('cardEnough');
                        }
                    },
                },
                {
                    key: 'cardNotEnough',
                    target: '.prize-button .btn',
                    title: that.$t('Tutorial.DrawItTitle'),
                    intro: that.$t('Tutorial.DrawItDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                // {
                //     target: '.prize-button .btn',
                //     title: '抽一把？',
                //     intro: '看來現在還沒辦法抽獎，你需要先建立抽獎卡片！',
                //     beforeAction(Element, TutorialNode, $next){
                //         setTimeout(() => {
                //             $next();
                //         }, 10);
                //     },
                //     afterAction(Element, TutorialNode, $next){
                //         setTimeout(() => {
                //             $next();
                //         }, 10);
                //     },
                // },
                {
                    target: '.navbar .navbar-nav .nav-item .nav-link[rel="CardList"]',
                    title: that.$t('Tutorial.ShowCardListTitle'),
                    intro: that.$t('Tutorial.ShowCardListDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '#CardListBox .modal-footer .btn',
                    title: that.$t('Tutorial.AddNewCardTitle'),
                    intro: that.$t('Tutorial.AddNewCardDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        that.triggerModal({ key: 'CardList' });
                        setTimeout(() => {
                            $next();
                        }, 200);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '#CardListBox .edit-card-box',
                    title: that.$t('Tutorial.EnterCardInfoTitle'),
                    intro: that.$t('Tutorial.EnterCardInfoDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        $('#CardListBox .add-card').trigger('click');
                        setTimeout(() => {
                            $next();
                        }, 500);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '#CardListBox .edit-card-box',
                    title: that.$t('Tutorial.QuicklyCreateCardTitle'),
                    intro: that.$t('Tutorial.QuicklyCreateCardDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        const cardTitle = getRandomCardTitle();
                        const cardImg = getRandomCardImg();

                        const params = {
                            sn: 'add',
                            img: cardImg,
                            title: cardTitle,
                            showTitleFlag: true,
                            note: '',
                            del: false,
                        };
                        that.saveCard(params);

                        if (that.validCardList.length) {
                            const cardInfo = that.validCardList[that.validCardList.length - 1];
                            $('body').trigger('triggerFocusCardSN', cardInfo.sn);
                        }

                        setTimeout(() => {
                            $next();
                        }, 200);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '#CardListBox .card-list-page',
                    title: that.$t('Tutorial.YouNeedEnoughCardTitle'),
                    intro: that.$t('Tutorial.YouNeedEnoughCardDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        const loopCnt = 3 - that.validCardList.length;
                        for (let i = 0; i < loopCnt; i++) {
                            const cardTitle = getRandomCardTitle();
                            const cardImg = getRandomCardImg();

                            const params = {
                                sn: 'add',
                                img: cardImg,
                                title: cardTitle,
                                showTitleFlag: true,
                                note: '',
                                del: false,
                            };
                            that.saveCard(params);
                        }
                        $('body').trigger('triggerFocusCardSN', false);

                        setTimeout(() => {
                            $next();
                        }, 200);
                    },
                    afterAction(Element, TutorialNode, $next){
                        $('#CardListBox').modal('hide');
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },

                {
                    key: 'cardEnough',
                    beforeCheck(TutorialObj, Element, TutorialNode, $next){
                        $('.lucky-draw-prize-box').trigger('getEmptyCardIdCnt', (cnt) => {
                            if (cnt === 0) {
                                TutorialObj.run('canNotDrawIt');
                            } else {
                                TutorialObj.run('canDrawIt');
                            }
                        });
                    },
                },
                {
                    key: 'canDrawIt',
                    target: '.prize-button .btn',
                    title: that.$t('Tutorial.DrawItNowTitle'),
                    intro: that.$t('Tutorial.DrawItNowDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        $('.lucky-draw-prize-box.mask .mask-wrapper').trigger('click');
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                    afterAction(Element, TutorialNode, $next){
                        $('.lucky-draw-prize-box .prize-button .btn').trigger('click');
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                },

                {
                    target: '.lucky-draw-prize-box .prize-draw-content',
                    title: that.$t('Tutorial.DrawingTitle'),
                    intro: that.$t('Tutorial.DrawingDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                    waitToNextAction(Element, $next){
                        $('body').on('drawEnd', () => {
                            $('body').off('drawEnd');
                            $next();
                        });
                    },
                },
                {
                    key: 'canNotDrawIt',
                    target: '.lucky-draw-prize-box',
                    title: that.$t('Tutorial.DrawCompleteTitle'),
                    intro: that.$t('Tutorial.DrawCompleteDesc'),
                    scrollTarget: '.lucky-draw-prize-box',
                    beforeAction(Element, TutorialNode, $next){
                        if ($('.lucky-draw-prize-box.mask .mask-wrapper')) {
                            $('.lucky-draw-prize-box.mask .mask-wrapper').trigger('click');
                        }
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '',
                    title: that.$t('Tutorial.CompleteTitle'),
                    intro: that.$t('Tutorial.CompleteDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '.navbar .navbar-nav .nav-item .nav-link[rel="ResultList"]',
                    title: that.$t('Tutorial.DrawResultTitle'),
                    intro: that.$t('Tutorial.DrawResultDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        $('#navbarCollapse').addClass('show');
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                    afterAction(Element, TutorialNode, $next){
                        $('#navbarCollapse').removeClass('show');
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '#ResultBox .card-list-page',
                    title: that.$t('Tutorial.CardPrizeInfoTitle'),
                    intro: that.$t('Tutorial.CardPrizeInfoDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        that.triggerModal({ key: 'Result' });
                        setTimeout(() => {
                            $next();
                        }, 200);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '#ResultBox .download-btn',
                    title: that.$t('Tutorial.DownloadTitle'),
                    intro: that.$t('Tutorial.DownloadDesc'),
                    scrollTarget: '#ResultBox',
                    beforeAction(Element, TutorialNode, $next){
                        document.querySelector('#ResultBox').scroll({ top: 0 });
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                    afterAction(Element, TutorialNode, $next){
                        that.triggerModal({ key: 'Result', close: true });
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    title: that.$t('Tutorial.NearingTheEndTitle'),
                    intro: that.$t('Tutorial.NearingTheEndDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                },
                {
                    target: '.nav-link[rel="Setting"]',
                    title: that.$t('Tutorial.YouHaveYourStyleTitle'),
                    intro: that.$t('Tutorial.YouHaveYourStyleDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        $('#navbarCollapse').addClass('show');
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                    afterAction(Element, TutorialNode, $next){
                        $('#navbarCollapse').removeClass('show');
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '#SettingBox .box-setting[rel="Style"]',
                    scrollTarget: '#SettingBox',
                    title: that.$t('Tutorial.YourThemeTitle'),
                    intro: that.$t('Tutorial.YourThemeDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        that.triggerModal({ key: 'Setting' });
                        setTimeout(() => {
                            document.querySelector('#SettingBox').scroll({ top: 0 });
                            $next();
                        }, 100);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '#SettingBox .box-setting[rel="Card"]',
                    scrollTarget: '#SettingBox',
                    title: that.$t('Tutorial.YourPreferencesTitle'),
                    intro: that.$t('Tutorial.YourPreferencesDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            document.querySelector('#SettingBox').scroll({ top: 0 });
                            $next();
                        }, 100);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    target: '#SettingBox .modal-footer .text-left',
                    scrollTarget: '#SettingBox',
                    title: that.$t('Tutorial.HadEnoughFunTitle'),
                    intro: that.$t('Tutorial.HadEnoughFunDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            document.querySelector('#SettingBox').scroll({ top: 0 });
                            $next();
                        }, 100);
                    },
                    afterAction(Element, TutorialNode, $next){
                        setTimeout(() => {
                            $next();
                        }, 10);
                    },
                },
                {
                    title: that.$t('Tutorial.OpenYourIdeaTitle'),
                    intro: that.$t('Tutorial.OpenYourIdeaDesc'),
                    beforeAction(Element, TutorialNode, $next){
                        that.triggerModal({ key: 'Setting', close: false });
                        setTimeout(() => {
                            $next();
                        }, 100);
                    },
                },
            ];

            const tutorial1 = new Tutorial(step, config);
            tutorial1.run();
        },
        createRandomLuckyDrawAct(){
            const that = this;
            that.createRandomLuckyDraw();

            trackJS.mixpanel('DrawCardRandom_click', {
                config: JSON.parse(JSON.stringify(that.config)),
                prizeList: JSON.parse(JSON.stringify(that.prizeList)),
                cardList: JSON.parse(JSON.stringify(that.cardList)),
            });
            trackJS.gtag('event', 'DrawCardRandom_click', {
                config: JSON.parse(JSON.stringify(that.config)),
                prizeList: JSON.parse(JSON.stringify(that.prizeList)),
                cardList: JSON.parse(JSON.stringify(that.cardList)),
            });
        },
        setL10nToState(){
            const that = this;
            clearTimeout(that.setL10nToStateTimer);
            that.setL10nToStateTimer = setTimeout(() => {
                const params = {
                    randomPrize: this.$t('common.Random.PrizeTitle'),
                    randomCardTitle: this.$t('common.Random.CardTitle'),
                };

                that.setL10n(params);
            }, 500);
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
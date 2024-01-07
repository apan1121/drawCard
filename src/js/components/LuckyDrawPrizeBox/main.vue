<template>
    <div
        ref="box"
        class="lucky-draw-prize-box"
        :prize-sn="prizeInfo.sn"
        :class="{
            mask: mask,
            'un-focus': (lockDrawItByPrizeSN !== false && prizeInfo.sn != lockDrawItByPrizeSN),
        }"
    >
        <div class="content-wrapper">
            <div class="prize-header">
                <div class="prize-title"
                    :style="{
                        color: config.PrizeTitleColor,
                    }"
                >
                    {{ prizeInfo.title }}
                    [{{ prizeInfo.cnt }}]
                </div>
                <div class="prize-button">
                    <button type="button" class="btn btn-success btn-sm"
                        :disabled="!luckyDrawBool"
                        @click="drawIt"
                    >
                        {{ $t('common.Button.DrawIt') }}
                    </button>
                </div>
            </div>
            <div v-if="!!prizeInfo.desc"
                class="prize-description"
                :style="{
                    color: config.PrizeDescColor,
                    'background-color': config.PrizeDescBgColor,
                }"
            >
                {{ prizeInfo.desc }}
            </div>
            <div class="prize-draw-content">
                <template v-if="!drawing">
                    <template v-for="(cardSN, cardIndex) in cardIds" :key="`${prizeInfo.sn}_${cardIndex}`">
                        <div class="card-item">
                            <card-box
                                :sn="cardSN"
                            ></card-box>
                        </div>
                    </template>
                </template>
                <template v-if="drawing">
                    <template v-for="(cardSN, cardIndex) in cardIds" :key="`${prizeInfo.sn}_${cardIndex}`">
                        <div class="card-item">
                            <template v-if="focusIndex === cardIndex">
                                <card-info-box v-show="cardSN === false"></card-info-box>
                                <template v-for="cardInfo in validCardList" :key="cardInfo.sn">
                                    <card-info-box v-show="cardSN === cardInfo.sn" :card-info="cardInfo"></card-info-box>
                                </template>
                            </template>
                            <template v-else>
                                <card-box
                                    :sn="cardSN"
                                ></card-box>
                            </template>
                        </div>
                    </template>
                </template>
            </div>
        </div>
        <div class="mask-wrapper" @click="openMask">
            <div class="icon">
                <i class="fas fa-gift"></i>
            </div>
        </div>
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import popup from 'lib/common/util/popup';
import { trackJS } from 'lib/common/util';

// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

const audio = {
    ding: new Audio('./dist/mp3/ding.mp3'),
    dong: new Audio('./dist/mp3/dong.mp3'),
};

export default {
    components: {
        CardBox: defineAsyncComponent(() => import('components/CardBox/main.vue')),
        CardInfoBox: defineAsyncComponent(() => import('components/CardInfoBox/main.vue')),
    },
    filters: {},
    props: {
        prizeInfo: {
            type: Object,
            default(){
                return {};
            },
        },
    },
    data(){
        return {
            mask: true,
            drawing: false,

            cardIds: [],
            focusIndex: false,

            winnerPlayer: null,
        };
    },
    computed: {
        ...mapGetters({
            config: 'config',
            prizeCardMapping: 'prizeCardMapping',
            waitCardSN: 'waitCardSN',
            lockDrawItByPrizeSN: 'lockDrawItByPrizeSN',
            validCardList: 'validCardList',
            winnerAudio: 'winnerAudio',
        }),
        luckyDrawBool(){
            const that = this;
            let flag = true;

            const cardIds = JSON.parse(JSON.stringify(that.cardIds));
            const emptyCardIdCnt = cardIds.filter((sn) => sn === false).length;

            // eslint-disable-next-line max-len
            if (that.prizeInfo.cnt === 0 || that.drawing || that.lockDrawItByPrizeSN || this.canUseCardSN.length === 0 || emptyCardIdCnt === 0) {
                flag = false;
            }

            return flag;
        },
        canUseCardSN(){
            const that = this;
            return that.waitCardSN.filter((cardSN) => !that.cardIds.includes(cardSN));
        },
    },
    watch: {
        prizeInfo: {
            immediate: true,
            handler(newVal, oldVal){
                this.resetCardIds();
                this.setWinnerPlay();
            },
        },
        prizeCardMapping: {
            immediate: true,
            handler(newVal, oldVal){
                this.resetCardIds();
            },
        },
    },
    beforeCreate(){
    },
    created(){},
    mounted(){
        const that = this;
        $(that.$refs.box).bind('getEmptyCardIdCnt', (e, callback) => {
            const cardIds = JSON.parse(JSON.stringify(that.cardIds));
            const emptyCardIdCnt = cardIds.filter((sn) => sn === false).length;
            if (typeof callback === 'function') {
                callback(emptyCardIdCnt);
            }
        });
    },
    updated(){},
    unmounted(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            lockDrawIt: 'lockDrawIt',
            setCardIdsByPrizeSN: 'setCardIdsByPrizeSN',
        }),
        setWinnerPlay(){
            const that = this;
            if (that.prizeInfo.audio && that.winnerAudio[that.prizeInfo.audio]) {
                that.winnerPlayer = new Audio(`./dist/mp3/${that.winnerAudio[that.prizeInfo.audio]}`);
            } else {
                that.winnerPlayer = null;
            }
        },
        resetCardIds(){
            const that = this;
            clearTimeout(that.resetCardIdsTimer);
            that.resetCardIdsTimer = setTimeout(() => {
                const { sn, cnt } = this.prizeInfo;
                let cardIds = [];
                if (that.prizeCardMapping[sn] && Array.isArray(that.prizeCardMapping[sn])) {
                    cardIds = JSON.parse(JSON.stringify(that.prizeCardMapping[sn]));
                }
                if (cardIds.length < cnt) {
                    for (let i = (cardIds.length - 1); i < cnt; i += 1) {
                        cardIds[i] = false;
                    }
                }
                that.cardIds = cardIds;
            }, 100);
        },
        openMask(){
            const that = this;
            $(that.$refs.box).find('.mask-wrapper').fadeOut(() => {
                that.mask = false;
            });

            trackJS.mixpanel('DrawPrizeMask_click', {
                prizeSN: that.prizeInfo.sn,
                title: that.prizeInfo.title,
                desc: that.prizeInfo.desc,
            });

            trackJS.gtag('event', 'DrawPrizeMask_click', {
                prizeSN: that.prizeInfo.sn,
                title: that.prizeInfo.title,
                desc: that.prizeInfo.desc,
            });
        },
        drawIt(){
            const that = this;
            that.actionDraw();
            that.lockDrawIt(that.prizeInfo.sn);

            trackJS.mixpanel('DrawPrizeDrawIt_click', {
                prizeSN: that.prizeInfo.sn,
                title: that.prizeInfo.title,
                desc: that.prizeInfo.desc,
            });

            trackJS.gtag('event', 'DrawPrizeDrawIt_click', {
                prizeSN: that.prizeInfo.sn,
                title: that.prizeInfo.title,
                desc: that.prizeInfo.desc,
            });
        },
        actionDraw(){
            const that = this;
            clearTimeout(that.randDrawTimer);
            that.drawing = true;
            const cardIds = JSON.parse(JSON.stringify(that.cardIds));
            that.focusIndex = false;
            for (const i in cardIds) {
                if (cardIds[i] === false) {
                    that.focusIndex = parseInt(i);
                    break;
                }
            }

            const { canUseCardSN } = that;
            const validSNLength = canUseCardSN.length;

            if (that.focusIndex === false) {
                /**
                 * 設定結果
                 */
                that.setCardIdsByPrizeSN({ prizeSN: that.prizeInfo.sn, cardIds });
                // that.lockDrawIt(false);
                // that.drawing = false;

                if (that.winnerPlayer) {
                    that.winnerPlayer.pause();
                    that.winnerPlayer.currentTime = 0;
                    that.winnerPlayer.onended = function(){
                        that.drawEnd();
                    };
                    that.winnerPlayer.play();
                } else {
                    that.drawEnd();
                }
            } else if (that.focusIndex !== false && validSNLength === 0) {
                /**
                 * 設定結果
                 */
                that.setCardIdsByPrizeSN({ prizeSN: that.prizeInfo.sn, cardIds });
                // that.lockDrawIt(false);
                // that.drawing = false;

                if (that.winnerPlayer) {
                    that.winnerPlayer.pause();
                    that.winnerPlayer.currentTime = 0;
                    that.winnerPlayer.onended = function(){
                        that.drawEnd();
                    };
                    that.winnerPlayer.play();
                } else {
                    that.drawEnd();
                }
                popup.warning({
                    title: this.$t('common.popup.Warning'),
                    html: this.$t('common.Alert.DrawItNotEnough'),
                    confirmButtonText: this.$t('common.Button.Confirm'),
                });
            } else {
                let chooseCardSN = false;
                that.randDrawTimer = setInterval(() => {
                    if (validSNLength > 0) {
                        // eslint-disable-next-line prefer-exponentiation-operator, no-restricted-properties
                        const validSNRandomRange = Math.pow(10, (`${validSNLength}`).length);
                        const index = parseInt((Math.random() * validSNRandomRange) % validSNLength);
                        chooseCardSN = canUseCardSN[index];
                        const drawCardIds = JSON.parse(JSON.stringify(that.cardIds));
                        drawCardIds[that.focusIndex] = chooseCardSN;
                        that.cardIds = drawCardIds;

                        audio.ding.pause();
                        audio.ding.currentTime = 0;
                        audio.ding.play();
                    } else {
                        clearTimeout(that.randDrawTimer);
                        that.drawNext();
                    }
                }, that.config.randomDrawWait);

                that.drawNextTimer = setTimeout(() => {
                    clearTimeout(that.randDrawTimer);
                    that.drawNext();
                }, that.config.drawNextWait);
            }
        },
        drawNext(){
            const that = this;

            clearTimeout(that.drawNextTimer);
            that.focusIndex += 1;
            audio.dong.pause();
            audio.dong.currentTime = 0;
            audio.dong.play();
            that.actionDraw();
        },
        drawEnd(){
            const that = this;
            clearTimeout(that.drawEndTimer);
            that.drawEndTimer = setTimeout(() => {
                that.lockDrawIt(false);
                that.drawing = false;
                $('body').trigger('drawEnd');
            }, 500);

            trackJS.mixpanel('DrawPrizeDrawResult_trigger', {
                prizeSN: that.prizeInfo.sn,
                title: that.prizeInfo.title,
                desc: that.prizeInfo.desc,
                cardIds: that.cardIds,
            });

            trackJS.gtag('event', 'DrawPrizeDrawResult_trigger', {
                prizeSN: that.prizeInfo.sn,
                title: that.prizeInfo.title,
                desc: that.prizeInfo.desc,
                cardIds: that.cardIds,
            });
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
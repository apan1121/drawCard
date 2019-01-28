<template>
    <div class="lucky-draw-prize-box" v-bind:class="{'un-focus': (lockDrawIt !== false && prizeInfo.sn != lockDrawIt) }">
        <div class="prize-header">
            <div class="prize-title">{{prizeInfo.title}}</div>
            <div class="prize-button">
                <button type="button" class="btn btn-success btn-sm" v-bind:disabled="!luckyDrawBool" v-on:click="drawIt">
                    抽一把
                </button>
            </div>
        </div>
        <div class="prize-description" v-if="!!prizeInfo.description">{{prizeInfo.description}}</div>

        <div class="prize-draw-content">
            <template v-if="!drawing">
                <template v-for="(cardSN, cardIndex) in cardIds">
                    <div class="card-box" v-bind:class="{empty: (cardSN === false)}" v-bind:style="{width: config.boxSize+'px', height: config.boxSize+'px'}">
                        <card-box v-bind:cardSN="cardSN" :key="cardIndex"></card-box>
                    </div>
                </template>
            </template>
            <template v-if="drawing">
                <template v-for="(cardSN, cardIndex) in cardIds">
                    <div class="card-box" v-bind:class="{empty: (cardSN === false)}" v-bind:style="{width: config.boxSize+'px', height: config.boxSize+'px'}">
                        <card-box v-bind:cardSN="false" :key="false" v-show="cardSN === false"></card-box>
                        <template v-for="(cardInfo, cardIndex) in validCardList">
                            <card-box v-bind:cardSN="cardInfo.sn" :key="cardIndex" v-show="cardSN == cardInfo.sn"></card-box>
                        </template>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import cardBox from './cardBox';

let randDrawTimer = null;
let drawNextTimer = null;


const audio = {
    ding: new Audio("./dist/mp3/ding.mp3"),
    dong: new Audio("./dist/mp3/dong.mp3"),
    winner: [
        // new Audio("./dist/mp3/winner1.mp3"),
        new Audio("./dist/mp3/winner2.mp3"),
    ]
}


export default {
    data: function(){
        return {
            cardIds: [],
            drawing: false,
            focusIndex: false,


            // randomDrawWait: 80,
            // drawNextWait: 1000,
        }
    },
    methods: {
        drawIt: function(){
            const that = this;
            that.actionDraw();
        },
        actionDraw: function(){
            const that = this;
            clearTimeout(randDrawTimer);

            that.drawing = true;
            that.$store.dispatch("lockDrawIt", that.prizeInfo.sn);
            let cardIds = JSON.parse(JSON.stringify(that.cardIds) );
            that.focusIndex = false;
            for (let i in cardIds) {
                if (cardIds[i] === false) {
                    that.focusIndex = parseInt(i);
                    break;
                }
            }

            if (that.focusIndex === false) {
                // that.drawing = false;

                const params = {
                    sn: that.prizeInfo.sn,
                    cardIds: that.cardIds,
                };
                that.$store.dispatch("setCardIdsByPrizeSN", params);
                if (!!audio[ that.prizeInfo.audio ]) {
                    audio[ that.prizeInfo.audio ].pause();
                    audio[ that.prizeInfo.audio ].currentTime = 0;
                    audio[ that.prizeInfo.audio ].onended = function(){
                        that.$store.dispatch("lockDrawIt", false);
                    };
                    audio[ that.prizeInfo.audio ].play();
                } else {
                    that.$store.dispatch("lockDrawIt", false);
                }
                return false;
            } else {
                randDrawTimer = setInterval(function(){
                    let validSNLength = that.canUseCardSN.length;
                    if (validSNLength > 0) {
                        let validSNRandomRange = Math.pow(10, (validSNLength+"").length);
                        let index = parseInt(Math.random() * validSNRandomRange % validSNLength);
                        let cardIds = JSON.parse(JSON.stringify(that.cardIds) );
                        cardIds[that.focusIndex] = that.canUseCardSN[index];
                        that.cardIds = cardIds;
                        audio.ding.pause();
                        audio.ding.currentTime = 0;
                        audio.ding.play();
                    } else {
                        clearTimeout(randDrawTimer);
                        that.drawNext();
                    }
                }, that.config.randomDrawWait);

                drawNextTimer = setTimeout(function(){
                    that.drawNext();
                }, that.config.drawNextWait);
            }
        },
        drawNext: function(){
            const that = this;
            clearTimeout(drawNextTimer);
            that.focusIndex += 1;
            audio.dong.pause();
            audio.dong.currentTime = 0;
            audio.dong.play();
            that.actionDraw();
        },
        formatPrizeInfo: function(){
            const that = this;
            let cardIds = JSON.parse(JSON.stringify(that.prizeInfo.cardIds) );
            for (let i = cardIds.length; i < that.prizeInfo.cnt; i++) {
                cardIds.push(false);
            }
            that.cardIds = cardIds;
        },
    },
    watch: {
        prizeInfo: function(){
            const that = this;
            that.formatPrizeInfo();
        },
    },
    computed: {
        luckyDrawBool: function(){
            const that = this;
            let flag = true;
            if (that.prizeInfo.cnt == 0 || that.drawing || that.lockDrawIt) {
                flag = false;
            }
            return flag;
        },
        canUseCardSN: function(){
            const that = this;
            return that.waitCardSN.filter(function(cardSN){
                return !that.cardIds.includes(cardSN);
            });
        },
        ...mapGetters([
            "validPrizeList",
            "validCardList",
            "waitCardSN",
            "lockDrawIt",
            "winnerAudio",
            "config",
        ])
    },
    mounted() {
        const that = this;
        for (let key in that.winnerAudio) {
            audio[key] = new Audio('./dist/mp3/' + that.winnerAudio[key]);
        }

        that.formatPrizeInfo();
    },
    props: {
        prizeInfo: {
            default: {},
        }
    },
    components: {
        cardBox
    }
};
</script>
<template>
    <div class="card-box"
        :style="{
            width: `${formatBoxSize}px`,
            height: `${formatBoxSize}px`,
        }"
        :class="{
            'has-img': !!showImg,
            empty: sn === false && cardInfoFormat === false,
        }"
    >
        <div v-if="showImg" class="card-wrapper"
            :style="{
                'background-image': `url(${showImg})`,
                'background-size': 'cover',
                'background-position': 'center center',
                'background-repeat': 'no-repeat',
                width: '100%',
                height: '100%',
            }"
        >
        </div>

        <div v-if="!showImg || showTitleFlag" class="card-title"
            :style="{
                'font-size': `${formatBoxFontSize}px`,
            }"
            v-text="showTitle"
        >
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {},
    filters: {},
    props: {
        cardInfo: {
            type: [Object, Boolean],
            default: false,
        },
        sn: {
            type: [String, Boolean, Number],
            default: '',
        },
        boxSize: {
            type: [Number, Boolean],
            default: false,
        },
        boxFontSize: {
            type: [Number, Boolean],
            default: false,
        },
        show: {
            type: Boolean,
            default: true,
        },
    },
    data(){
        return {};
    },
    computed: {
        ...mapGetters({
            config: 'config',
            cardListMapping: 'cardListMapping',
        }),
        cardInfoFormat(){
            let cardInfo = false;
            if (!!this.sn && this.cardListMapping[this.sn]) {
                cardInfo = this.cardListMapping[this.sn];
            } else if (this.cardInfo) {
                cardInfo = this.cardInfo;
            }
            return cardInfo;
        },


        showImg(){
            let imgUrl = '';
            if (this.cardInfoFormat) {
                imgUrl = this.cardInfoFormat.img;
            }
            return imgUrl;
        },
        showTitle(){
            let title = '';
            if (this.cardInfoFormat) {
                title = this.cardInfoFormat.title;
            }
            return title;
        },
        showTitleFlag(){
            let showTitleFlag = true;
            if (this.cardInfoFormat) {
                showTitleFlag = this.cardInfoFormat.showTitleFlag;
            }
            return showTitleFlag;
        },
        formatBoxSize(){
            let { boxSize } = this;
            if (boxSize === false) {
                boxSize = this.config.boxSize;
            }
            return boxSize;
        },
        formatBoxFontSize(){
            let { boxFontSize } = this;
            if (boxFontSize === false) {
                boxFontSize = this.config.boxFontSize;
            }

            if (boxFontSize < 11 || boxFontSize > 30) {
                boxFontSize = 16;
            }
            return boxFontSize;
        },
    },
    watch: {
    },
    created(){},
    mounted(){},
    updated(){},
    unmounted(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({}),
    },
};
</script>
<style lang="scss" scoped>
</style>
<template>
    <div class="card-box"
        :style="{
            width: `${formatBoxSize}px`,
            height: `${formatBoxSize}px`,
        }"
        :class="{
            'has-img': !!showImg,
            empty: cardInfoFormat === false,
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
                'color': `${formatBoxFontColor}`,
            }"
        >
            <div class="card-title-wrapper">
                <div class="card-title-bg"
                    :style="{
                        'background-color': `${formatBoxFontBgColor}`,
                        opacity: `${formatBoxFontBgOpacity}`,
                        'font-size': `${formatBoxFontSize}px`,
                        color: `${formatBoxFontBgColor}`,
                    }"
                    v-text="showTitle"
                ></div>
                <div class="card-title-text"
                    :style="{
                        'font-size': `${formatBoxFontSize}px`,
                        'color': `${formatBoxFontColor}`,
                    }"
                    v-text="showTitle"></div>
            </div>
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

        boxSize: {
            type: [Number, Boolean],
            default: false,
        },
        boxFontSize: {
            type: [Number, Boolean],
            default: false,
        },
        boxFontColor: {
            type: [String, Boolean],
            default: false,
        },
        boxFontBgColor: {
            type: [String, Boolean],
            default: false,
        },
        boxFontBgOpacity: {
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
        }),
        cardInfoFormat(){
            let cardInfo = false;
            if (this.cardInfo) {
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

        formatBoxFontColor(){
            let { boxFontColor } = this;
            if (boxFontColor === false) {
                boxFontColor = this.config.boxFontColor;
            }
            return boxFontColor;
        },
        formatBoxFontBgColor(){
            let { boxFontBgColor, boxFontBgOpacity } = this;
            if (boxFontBgColor === false) {
                boxFontBgColor = this.config.boxFontBgColor;
            }
            return boxFontBgColor;
        },
        formatBoxFontBgOpacity(){
            let { boxFontBgOpacity } = this;
            if (boxFontBgOpacity === false) {
                boxFontBgOpacity = this.config.boxFontBgOpacity;
            }

            return boxFontBgOpacity;
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
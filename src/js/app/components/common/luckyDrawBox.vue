<template>
    <div class="lucky-draw-box">
        <lucky-draw-prize-box v-for="(prizeInfo, prizeIndex) in validPrizeList" v-bind:prizeInfo="prizeInfo" :key="prizeInfo.sn"></lucky-draw-prize-box>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import luckyDrawPrizeBox from './luckyDrawPrizeBox';

export default {
    data: function(){
        return {

        }
    },
    methods: {
        ...mapActions({
        })
    },
    watch: {

    },
    computed: {
        ...mapGetters([
            "validPrizeList",
        ])
    },
    mounted() {
    },
    props: {

    },
    components: {
        luckyDrawPrizeBox,
    }
};
</script>
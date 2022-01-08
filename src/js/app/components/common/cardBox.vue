<template>
    <div class="card-box-wrapper">
        <div
            v-if="cardSN !== false"
            :style="{
                'background-image': `url(${cardList[cardSN].img})`,
                'background-size': 'cover',
                'background-position': 'center center',
                'background-repeat': 'no-repeat',
                width: '100%',
                height: '100%',
            }"
        >
        </div>
    </div>
    <!-- <div class="card-box-wrapper imgLiquidFill">
        <img :src="cardList[cardSN].img" v-if="cardSN !== false">
    </div> -->
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    data: function(){
        return {

        }
    },
    methods: {
        init: function(){
            const that = this;
            // $("body").trigger("resizeImg");
        },
    },
    watch: {
        cardSN: function(){
            const that = this;
            that.init();
        },
    },
    computed: {
        ...mapGetters([
            "cardList",
        ])
    },
    mounted() {
        const that = this;
        that.init();
    },
    props: {
        cardSN: {
            default: false,
        }
    },
    components: {

    }
};
</script>
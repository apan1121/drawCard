<template>
    <div class="card-box-wrapper imgLiquidFill">
        <img :src="cardList[cardSN].img" v-if="cardSN !== false">
    </div>
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
            $("body").trigger("resizeImg");
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
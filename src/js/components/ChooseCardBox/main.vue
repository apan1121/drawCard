<template>
    <template v-for="(cardSN) in waitCardSN" :key="cardSN">
        <card-box
            :show="chooseSn === cardSN"
            :sn="cardSN"
        ></card-box>
    </template>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapActions, mapMutations, mapGetters } from 'vuex';
// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {
        CardBox: defineAsyncComponent(() => import('components/CardBox/main.vue')),
    },
    filters: {},
    props: {
        chooseSn: {
            type: [String, Boolean, Number],
            default: '',
        },
    },
    data(){
        return {};
    },
    computed: {
        ...mapGetters({
            config: 'config',
            waitCardSN: 'waitCardSN',
            cardListMapping: 'cardListMapping',
        }),
    },
    watch: {
        chooseSn(){
            // console.log(this.chooseSn, this.cardListMapping[this.chooseSn]);
        },
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
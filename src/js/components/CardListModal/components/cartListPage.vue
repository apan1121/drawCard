<template>
    <div ref="body" class="modal-body" style="max-height: calc(100vh - 200px); overflow: auto; min-height:400px;">
        <div class="card-list-page">
            <template v-if="validCardList.length > 0">
                <template v-for="(CardInfo, index) in validCardList" :key="index">
                    <cart-info-box v-bind="CardInfo"
                        :mode="CardInfo.sn === focusCardSN ? 'edit' : 'view'"
                        @edit="setFocusCardSN"
                        @close="focusCardSN = false;"
                    ></cart-info-box>

                    <template v-if="index % 10 === 9">
                        <google-support :trigger="triggerOpenCardList"></google-support>
                    </template>
                </template>
            </template>
            <template v-else>
                <h4 class="text-center pt-5 pb-5">
                    {{ $t('CardList.CardsNotBeenCreated') }}
                </h4>
            </template>

            <template v-if="addNewCard">
                <cart-info-box v-bind="addNewCard" :mode="'edit'" @close="addNewCard = false"></cart-info-box>
            </template>
        </div>
    </div>
    <div v-if="!addNewCard" class="modal-footer">
        <button
            type="button"
            class="btn btn-info btn-block add-card"
            @click="openAddCard"
        >
            {{ $t('CardList.AddCard') }}
        </button>
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapActions, mapMutations, mapGetters } from 'vuex';

import cartInfoBox from './cartInfoBox.vue';
import { trackJS } from 'lib/common/util';

export default {
    components: {
        cartInfoBox,
        GoogleSupport: defineAsyncComponent(() => import('components/GoogleSupport/main.vue')),
    },
    filters: {},
    props: {},
    emits: ['change-tab'],
    data(){
        return {
            langPaths: [
                'CardList',
            ],
            addNewCard: false,
            focusCardSN: false,
        };
    },
    computed: {
        ...mapGetters({
            triggerOpenCardList: 'triggerOpenCardList',
            validCardList: 'validCardList',
        }),
    },
    watch: {
    },
    created(){},
    mounted(){
        $('body').on('triggerFocusCardSN', (event, sn) => {
            this.setFocusCardSN(sn);
        });
    },
    updated(){},
    unmounted(){
        $('body').off('triggerFocusCardSN');
    },
    methods: {
        ...mapActions({}),
        ...mapMutations({}),
        setFocusCardSN(sn){
            this.addNewCard = false;
            this.focusCardSN = sn;
        },
        openAddCard(){
            const addNewCard = {
                sn: 'add',
                img: '',
                title: '',
                member_list: [],
            };
            this.addNewCard = addNewCard;
            const { body } = this.$refs;
            $(body).stop().animate({ scrollTop: body.scrollHeight }, 500, 'swing');
            trackJS.mixpanel('AddCardInfo_click', {});
            trackJS.gtag('event', 'AddCardInfo_click', {});
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
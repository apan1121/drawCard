<template>
    <div ref="body" class="modal-body" style="max-height: calc(100vh - 200px); overflow: auto; min-height:400px;">
        <div class="prize-list-page">
            <div class="mb-3">
                <h6
                    class="mb-0 prize-cnt-notice"
                    :class="{
                        'text-danger': PrizeAllCnt > validCardCount,
                    }"
                >
                    {{ $t('PrizeList.PrizeCount') }} / {{ $t('PrizeList.CardCount') }}：
                    <span>
                        {{ PrizeAllCnt }} / {{ validCardCount }}
                    </span>
                </h6>
                <small v-if="PrizeAllCnt > validCardCount" class="text-danger">
                    * {{ $t('PrizeList.NotEnoughCardForDrawCard') }}
                </small>
            </div>
            <div class="prize-list">
                <template v-if="validPrizeCnt > 0">
                    <draggable
                        v-model="inputPrizeList"
                        group="people"
                        item-key="index"
                        handle=".handle"
                        @start="drag=true"
                        @end="drag=false"
                    >
                        <template #item="{element, index}">
                            <prize-info-box
                                :key="index"
                                v-bind="element"
                                :mode="element.sn === focusPrizeSN ? 'edit' : 'view'"
                                @edit="setFocusPrizeSN"
                                @close="focusPrizeSN = false"
                            ></prize-info-box>
                        </template>
                    </draggable>
                    <hr>
                    <google-support :trigger="triggerOpenPrizeList"></google-support>
                </template>
                <template v-else>
                    <h4 class="text-center pt-5 pb-5">
                        {{ $t('PrizeList.PrizeNotBeenCreated') }}
                    </h4>
                </template>
            </div>

            <template v-if="addNewPrize">
                <prize-info-box
                    v-bind="addNewPrize"
                    :mode="'edit'"
                    @close="addNewPrize = false"
                ></prize-info-box>
            </template>
        </div>
    </div>
    <div v-if="!addNewPrize" class="modal-footer">
        <button
            id="addPrize"
            type="button"
            class="btn btn-info btn-block"
            @click="openAddPrize"
        >
            {{ $t('PrizeList.AddPrize') }}
        </button>
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import draggable from 'vuedraggable';
import PrizeInfoBox from './PrizeInfoBox.vue';
import { trackJS } from 'lib/common/util';

export default {
    components: {
        draggable,
        PrizeInfoBox,
        GoogleSupport: defineAsyncComponent(() => import('components/GoogleSupport/main.vue')),
    },
    filters: {},
    props: {},
    emits: ['change-tab'],
    data(){
        return {
            langPaths: [
                'common',
                'PrizeList',
            ],
            focusPrizeSN: null,
            addNewPrize: false,

            inputPrizeList: [],
        };
    },
    computed: {
        ...mapGetters({
            triggerOpenPrizeList: 'triggerOpenPrizeList',
            validCardList: 'validCardList',
            prizeList: 'prizeList',
        }),
        validCardCount(){
            return this.validCardList.length;
        },
        validPrizeCnt(){
            const that = this;
            let validPrizeCnt = 0;
            const prizeList = JSON.parse(JSON.stringify(this.prizeList));
            validPrizeCnt = prizeList.filter((prizeInfo) => [false, 'false'].includes(prizeInfo.del)).length;

            return validPrizeCnt;
        },
        PrizeAllCnt(){
            const prizeList = JSON.parse(JSON.stringify(this.prizeList));
            let PrizeAllCnt = 0;
            prizeList.forEach((prizeInfo) => {
                if ([false, 'false'].includes(prizeInfo.del)) {
                    if (!!prizeInfo.cnt) {
                        PrizeAllCnt += parseInt(prizeInfo.cnt);
                    }
                }
            });
            return PrizeAllCnt;
        },
    },
    watch: {
        prizeList: {
            deep: true,
            immediate: true,
            handler(){
                if (JSON.stringify(this.prizeList) !== JSON.stringify(this.inputPrizeList)) {
                    this.inputPrizeList = JSON.parse(JSON.stringify(this.prizeList));
                }
            },
        },
        inputPrizeList: {
            deep: true,
            immediate: true,
            handler(){
                if (JSON.stringify(this.prizeList) !== JSON.stringify(this.inputPrizeList)) {
                    this.setPrizeList(JSON.parse(JSON.stringify(this.inputPrizeList)));
                }
            },
        },
    },
    beforeCreate(){
    },
    created(){},
    mounted(){
        $('body').on('triggerFocusPrizeSN', (event, sn) => {
            this.setFocusPrizeSN(sn);
        });
    },
    unmounted(){
        $('body').off('triggerFocusPrizeSN');
    },
    updated(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            setPrizeList: 'setPrizeList',
        }),
        openAddPrize(){
            const addNewPrize = {
                sn: 'add',
                title: '',
                desc: '',
                audio: '',
                cnt: 1,
                del: false,
            };
            this.addNewPrize = addNewPrize;
            this.focusPrizeSN = false;
            const { body } = this.$refs;
            $(body).stop().animate({ scrollTop: body.scrollHeight }, 500, 'swing');

            trackJS.mixpanel('AddPrizeInfo_click', {});
            trackJS.gtag('event', 'AddPrizeInfo_click', {});
        },
        setFocusPrizeSN(prizeSN){
            this.focusPrizeSN = prizeSN;
            this.addNewPrize = false;
        },
        checkMove(){

        },
    },
};
</script>
<style lang="scss" scoped>
</style>
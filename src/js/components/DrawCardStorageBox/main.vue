<template>
    <div ref="box" class="modal" tabindex="-1"
        role="dialog"
        data-backdrop="static"
        data-keyboard="false"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-box-open"></i>
                        {{ $t('DrawCardStorage.DrawCardList') }}
                    </h5>
                </div>
                <div class="modal-body">
                    <h6 class="pb-2">
                        {{ $t('DrawCardStorage.YouHaveEvent', { count: drawCardChooseList.length }) }}
                    </h6>
                    <div class="draw-card-choose-list">
                        <template v-for="(drawCardChoose, drawCardChooseIndex) in drawCardChooseList" :key="drawCardChooseIndex">
                            <div class="draw-card-choose-item mb-3">
                                <div class="draw-card-choose-text" @click="chooseDrawCard(drawCardChooseIndex)">
                                    {{ drawCardChoose.title || $t('DrawCardStorage.EmptyTitle') }}
                                </div>
                                <div class="draw-card-choose-del" @click="removeDrawCard(drawCardChooseIndex)">
                                    <i class="fas fa-trash-alt"></i>
                                </div>
                            </div>
                        </template>
                    </div>
                    <h6 class="pb-2">
                        {{ $t('DrawCardStorage.OrCreateEvent') }}
                    </h6>
                    <template v-if="createDefaultDrawCardFlag === false">
                        <button
                            type="button"
                            class="btn btn-warning btn-lg btn-block"
                            @click="createDefaultDrawCardFlag = true"
                        >
                            {{ $t('DrawCardStorage.CreateEvent') }}
                        </button>
                    </template>
                    <template v-else>
                        <div class="input-group input-group-lg mb-3">
                            <div class="input-group-prepend">
                                <span id="basic-addon2" class="input-group-text">
                                    {{ $t('DrawCardStorage.EventName') }}
                                </span>
                            </div>
                            <input v-model="DrawCardName"
                                type="text"
                                class="form-control"
                                :placeholder="$t('DrawCardStorage.EventName')"
                            >
                            <div class="input-group-append">
                                <button class="btn btn-info" type="button" @click="create">
                                    {{ $t('DrawCardStorage.Create') }}
                                </button>
                            </div>
                        </div>
                    </template>

                    <hr>
                    <google-support></google-support>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import popup from 'lib/common/util/popup';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { defineAsyncComponent } from 'vue';
import { trackJS, localStorage } from 'lib/common/util';

export default {
    components: {
        GoogleSupport: defineAsyncComponent(() => import('components/GoogleSupport/main.vue')),
    },
    filters: {},
    props: {},
    data(){
        return {
            langPaths: [
                'DrawCardStorage',
            ],
            createDefaultDrawCardFlag: false,
            DrawCardName: '',
        };
    },
    computed: {
        ...mapGetters({
            drawCardChooseList: 'drawCardChooseList',
            defaultConfig: 'defaultConfig',
            defaultCardInfo: 'defaultCardInfo',
        }),
    },
    watch: {
        drawCardChooseList: {
            deep: true,
            immediate: true,
            handler(){
                if (this.drawCardChooseList.length > 0) {
                    setTimeout(() => {
                        $(this.$refs.box).modal('show');
                    }, 10);
                } else {
                    setTimeout(() => {
                        $(this.$refs.box).modal('hide');
                    }, 10);
                }
            },
        },
    },
    created(){},
    mounted(){
        const that = this;
        $(that.$refs.box).bind('shown.bs.modal', () => {
            trackJS.mixpanel('DrawCardStorageOpen_click');
            trackJS.gtag('event', 'DrawCardStorageOpen_click');
        });

        $(that.$refs.box).bind('hidden.bs.modal', () => {
            trackJS.mixpanel('DrawCardStorageClose_click');
            trackJS.gtag('event', 'DrawCardStorageClose_click');
        });

        /**
         * 新舊版資料轉換
         */
        this.syncOldVersionData();
    },
    updated(){},
    unmounted(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            chooseDrawCardFromStorage: 'chooseDrawCardFromStorage',
            removeDrawCardFromStorage: 'removeDrawCardFromStorage',
            createDefaultDrawCard: 'createDefaultDrawCard',
            saveOldVerDataToStorage: 'saveOldVerDataToStorage',
        }),
        chooseDrawCard(index){
            const that = this;
            const drawCardChoose = that.drawCardChooseList[index];
            trackJS.mixpanel('DrawCardStorageChoose_click', drawCardChoose);
            trackJS.gtag('event', 'DrawCardStorageChoose_click', drawCardChoose);
            that.chooseDrawCardFromStorage(drawCardChoose.key);
        },
        removeDrawCard(index){
            const that = this;
            const drawCardChoose = that.drawCardChooseList[index];
            const noticeHtml = `${this.$t('DrawCardStorage.Notice.RemoveDrawEvent', { EventTitle: drawCardChoose.title })}<br><div class="text-danger">${this.$t('DrawCardStorage.Notice.RemoveDrawEventCantUndo')}</div>`;
            popup.confirm({
                title: this.$t('common.popup.Warning'),
                html: noticeHtml,
                confirmButtonText: this.$t('common.Button.Confirm'),
                cancelButtonText: this.$t('common.Button.Cancel'),
            }, () => {
                that.removeDrawCardFromStorage(drawCardChoose.key);
                trackJS.mixpanel('DrawCardStorageActionRemove_click', drawCardChoose);
                trackJS.gtag('event', 'DrawCardStorageActionRemove_click', drawCardChoose);
            }, () => {

            });
        },
        create(){
            const that = this;
            const parmas = {
                DrawCardName: that.DrawCardName,
            };
            that.createDefaultDrawCard(parmas);
            trackJS.mixpanel('DrawCardStorageActionCreate_click', parmas);
            trackJS.gtag('event', 'DrawCardStorageActionCreate_click', parmas);
        },
        syncOldVersionData(){
            const that = this;
            const drawCardsSetting = localStorage.get('drawCardsSetting', false);
            if (drawCardsSetting) {
                that.saveOldVerDataToStorage(drawCardsSetting);
                localStorage.del('drawCardsSetting');
            }
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
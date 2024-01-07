<template>
    <div>
        <div
            id="ResultBox"
            ref="box"
            class="modal"
            tabindex="-1"
            role="dialog"
            data-backdrop="static"
            data-keyboard="false"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-poll"></i>
                            {{ $t('common.Header.ResultList') }}
                        </h5>
                        <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div ref="body" class="modal-body" style="max-height: calc(100vh - 200px); overflow: auto; min-height:400px;">
                        <div class="card-list-page">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style="width: 20%;">
                                            卡片
                                        </th>
                                        <th style="width: 30%;">
                                            名稱
                                        </th>
                                        <th>獎項</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(cardInfo, cardIndex) in cardListWithPrize" :key="cardInfo.sn">
                                        <tr>
                                            <td style="width: 20%;">
                                                <div>
                                                    <card-info-box :card-info="cardInfo" :box-size="100"></card-info-box>
                                                </div>
                                            </td>
                                            <td style="width: 30%;">
                                                {{ cardInfo.title }}
                                            </td>
                                            <td>{{ cardInfo.prize.join("、") }}</td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>

                        <hr>
                        <google-support></google-support>
                    </div>
                    <div class="modal-footer">
                        <div class="col-6 text-left">
                        </div>
                        <div class="col-6 text-right">
                            <!-- <button type="button" class="btn btn-primary" @click="download">下載</button> -->

                            <button type="button" class="btn btn-primary download-btn" @click="downloadResult">
                                {{ $t('ResultList.DownloadPrizeList') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div ref="download" class="modal result-modal" tabindex="-1"
            role="dialog"
            data-backdrop="static" data-keyboard="false"
        >
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <p class="text-center mb-3" style="font-size: 50px;">
                            <i class="fa-spin fas fa-sync"></i>
                        </p>
                        <h5 class="text-center" style="font-size: 30px;">
                            {{ $t('ResultList.DownloadProcessing') }}
                        </h5>
                        <google-support v-if="showGooglSupport"></google-support>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import popup from 'lib/common/util/popup';
import { string, trackJS } from 'lib/common/util';
// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {
        GoogleSupport: defineAsyncComponent(() => import('components/GoogleSupport/main.vue')),
        CardInfoBox: defineAsyncComponent(() => import('components/CardInfoBox/main.vue')),
    },
    filters: {},
    props: {},
    data(){
        return {
            langPaths: [
                'common',
                'ResultList',
            ],
            isDownload: false,
            showGooglSupport: false,
        };
    },
    computed: {
        ...mapGetters({
            config: 'config',
            triggerOpenResult: 'triggerOpenResult',
            prizeCardMapping: 'prizeCardMapping',
            validCardList: 'validCardList',
            validPrizeList: 'validPrizeList',
        }),
        cardListWithPrize(){
            const that = this;
            const cardListWithPrize = [];
            const validPrizeList = JSON.parse(JSON.stringify(that.validPrizeList));
            const prizeCardMapping = JSON.parse(JSON.stringify(that.prizeCardMapping));
            const validCardList = JSON.parse(JSON.stringify(that.validCardList));

            const validPrizeListMapping = {};
            validPrizeList.forEach((prizeInfo) => {
                validPrizeListMapping[prizeInfo.sn] = prizeInfo;
            });

            const cardPrizeMapping = {};
            for (const prizeSN in prizeCardMapping) {
                prizeCardMapping[prizeSN].forEach((cardSN) => {
                    if (validPrizeListMapping[prizeSN]) {
                        if (typeof cardPrizeMapping[cardSN] === 'undefined') {
                            cardPrizeMapping[cardSN] = [];
                        }
                        cardPrizeMapping[cardSN].push(validPrizeListMapping[prizeSN].title);
                    }
                });
            }

            validCardList.forEach((cardInfo) => {
                cardInfo.prize = [];
                if (cardPrizeMapping[cardInfo.sn]) {
                    cardInfo.prize = cardPrizeMapping[cardInfo.sn];
                }
                cardListWithPrize.push(cardInfo);
            });

            return cardListWithPrize;
        },
    },
    watch: {
        triggerOpenResult: {
            immediate: true,
            handler(){
                this.$nextTick(() => {
                    if (this.triggerOpenResult) {
                        $(this.$refs.box).modal('show');
                    } else {
                        $(this.$refs.box).modal('hide');
                    }
                });
            },
        },
    },
    beforeCreate(){
    },
    created(){},
    mounted(){
        const that = this;
        that.box = $(that.$refs.box);
        that.box.bind('shown.bs.modal', () => {
            trackJS.mixpanel('ResultOpen_click');
            trackJS.gtag('event', 'ResultOpen_click');
        });
        that.box.bind('hidden.bs.modal', () => {
            if (!that.isDownload) {
                that.triggerModal({ key: 'Result', close: true });
                trackJS.mixpanel('ResultClose_click');
                trackJS.gtag('event', 'ResultClose_click');
            }
        });


        that.downloadBox = $(that.$refs.download);
        that.downloadBox.bind('shown.bs.modal', () => {
            that.showGooglSupport = true;
        });

        that.downloadBox.bind('hidden.bs.modal', () => {
            that.showGooglSupport = false;
        });
    },
    updated(){},
    beforeUnmount(){
        const that = this;
        const box = $(that.$refs.box);
        box.modal('hide');
    },
    unmounted(){
    },
    methods: {
        ...mapActions({}),
        ...mapMutations({
            triggerModal: 'triggerModal',
        }),
        downloadResult(){
            const that = this;
            that.isDownload = true;
            that.box.modal('hide');
            that.downloadBox.modal('show');
            clearTimeout(that.downloadTimer);
            const waitTime = string.randRange(2000, 5000);

            const csvName = `${this.config.webTitle || 'DrawCard'} - ${that.$t('common.Header.ResultList')}`;
            const cardListWithPrize = JSON.parse(JSON.stringify(that.cardListWithPrize));

            let csv = `${this.$t('ResultList.DownloadHeaderCardTitle')},${this.$t('ResultList.DownloadHeaderPrizeList')}\n`;
            cardListWithPrize.forEach((Obj) => {
                csv += `${[Obj.title, Obj.prize.join('、')].join(',')}\n`;
            });
            const csvContent = `data:text/csv;charset=utf-8,${csv}`;
            const encodedUri = encodeURI(csvContent);

            const link = document.createElement('a');
            link.style.display = 'none';
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', `${csvName}.csv`);
            document.body.appendChild(link); // Required for FF

            that.downloadTimer = setTimeout(() => {
                link.click();
                that.box.modal('show');
                that.downloadBox.modal('hide');
                that.isDownload = true;

                trackJS.mixpanel('ResultDownload_click', { csv });
                trackJS.gtag('event', 'ResultDownload_click');
            }, waitTime);
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
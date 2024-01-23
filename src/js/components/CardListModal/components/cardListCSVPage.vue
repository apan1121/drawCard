<template>
    <div id="cardListCSVPage" class="modal-body" style="max-height: calc(100vh - 200px); overflow: auto;">
        <div class="form-group">
            <textarea v-model="csvInput" class="form-control csv-input">
            </textarea>
            <hr>
            <google-support :trigger="triggerOpenCardList"></google-support>
        </div>
    </div>
    <div v-show="csvInput === cardListCSV" class="modal-footer">
        <div style="flex: 1">
            <button class="btn btn-sm btn-block btn-warning" @click="downloadCSV">
                {{ $t('common.Button.DownloadCSV') }}
            </button>
        </div>
        <div style="flex: 1">
            <button id="cardListCSVButton" class="btn btn-sm btn-block btn-success">
                {{ $t('common.Button.UploadCSV') }}
            </button>
        </div>
    </div>
    <div v-show="csvInput !== cardListCSV" class="modal-footer">
        <div style="flex: 1">
            <button class="btn btn-sm btn-block btn-warning" @click="cancel">
                {{ $t('common.Button.Cancel') }}
            </button>
        </div>
        <div style="flex: 1">
            <button class="btn btn-sm btn-block btn-success" @click="save">
                {{ $t('common.Button.Save') }}
            </button>
        </div>
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { json2csv } from 'json-2-csv';
import * as Papa from 'papaparse';
import popup from 'lib/common/util/popup';
import { trackJS } from 'lib/common/util';


export default {
    components: {
        GoogleSupport: defineAsyncComponent(() => import('components/GoogleSupport/main.vue')),
    },
    filters: {},
    props: {},
    emits: ['change-tab'],
    data(){
        return {
            csvInput: '',
            dropUpload: false,
            cardListCSV: '',
        };
    },
    computed: {
        ...mapGetters({
            triggerOpenCardList: 'triggerOpenCardList',
            config: 'config',
            cardList: 'cardList',
        }),
    },
    watch: {
        cardList: {
            immediate: true,
            deep: true,
            handler(){
                const cardList = JSON.parse(JSON.stringify(this.cardList));
                const csv = Papa.unparse(cardList, {
                    quotes: true,
                    quoteChar: '"',
                    escapeChar: '"',
                    delimiter: ',',
                    header: true,
                    newline: '\r\n',
                    skipEmptyLines: true,
                    escapeFormulae: true,
                });
                if (csv) {
                    this.cardListCSV = csv;
                } else {
                    this.cardListCSV = 'sn,img,title,showTitleFlag,note,del';
                }
            },
        },
        cardListCSV: {
            immediate: true,
            deep: true,
            handler(){
                this.csvInput = this.cardListCSV;
            },
        },
    },
    created(){},
    async mounted(){
        const that = this;
        const { default: DropUploadObj } = await import('components/DropUpload/main');
        that.DropUploadObj = DropUploadObj;
        that.$nextTick(() => {
            that.init();
        });
    },
    updated(){},
    unmounted(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            setCardList: 'setCardList',
        }),
        init(){
            const that = this;
            that.dropUpload = new this.DropUploadObj({
                dropSelector: '#cardListCSVPage',
                clickBtnSelector: '#cardListCSVButton',
                mimeTypeList: ['text/csv'],
                process_callback(type, data, fileIndex){
                    switch (type) {
                        case 'outputFile': {
                            const reader = new FileReader();
                            reader.onload = () => {
                                that.csvInput = reader.result;
                            };
                            reader.readAsText(data);
                            break;
                        }
                        default:
                            break;
                    }
                },
            });
        },
        downloadCSV(){
            const that = this;
            const csvName = `${this.config.webTitle || 'DrawCard'} - ${that.$t('common.Header.CardList')}`;
            const csvContent = `data:text/csv;charset=utf-8,${this.csvInput}`;
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', csvName);
            document.body.appendChild(link);
            link.click();

            trackJS.mixpanel('CardInfoCSVDownload_click', { csv: this.csvInput });
            trackJS.gtag('event', 'CardInfoCSVDownload_click', { csv: this.csvInput });
        },
        save(){
            const that = this;
            popup.confirm({
                title: this.$t('common.popup.Confirm'),
                html: this.$t('CardList.SaveModifiedCardNotice'),
                confirmButtonText: this.$t('common.Button.Confirm'),
                cancelButtonText: this.$t('common.Button.Cancel'),
            }, () => {
                Papa.parse(this.csvInput, {
                    complete: (results) => {
                        const csvData = results.data;
                        const cardList = [];
                        if (csvData.length > 0) {
                            let columns = csvData.splice(0, 1);
                            // eslint-disable-next-line prefer-destructuring
                            columns = columns[0];
                            for (const csvInfo of csvData) {
                                const data = {};
                                for (const index in columns) {
                                    const key = columns[index];
                                    data[key] = csvInfo[index] || '';
                                }
                                data.del = ['true', true, 1].includes(data.del);
                                cardList.push(data);
                            }
                        }
                        if (cardList.length > 0) {
                            that.setCardList(cardList);
                            that.$emit('change-tab', 'list');
                            trackJS.mixpanel('CardInfoCSVSave_click', { csv: this.csvInput });
                            trackJS.gtag('event', 'CardInfoCSVSave_click', { csv: this.csvInput });
                        } else {
                            popup.warning({
                                title: this.$t('common.popup.Warning'),
                                html: that.$t('common.Alert.NoValidContent'),
                                confirmButtonText: this.$t('common.Button.Confirm'),
                            });
                        }
                    },
                });
            }, () => {
            });
        },
        cancel(){
            popup.confirm({
                title: this.$t('common.popup.Confirm'),
                html: this.$t('common.Alert.AreYouSureDiscardEdit'),
                confirmButtonText: this.$t('common.Button.Confirm'),
                cancelButtonText: this.$t('common.Button.Cancel'),
            }, () => {
                this.csvInput = this.cardListCSV;
                trackJS.mixpanel('CardInfoCSVCancel_click', {});
                trackJS.gtag('event', 'CardInfoCSVCancel_click', {});
            }, () => {

            });
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
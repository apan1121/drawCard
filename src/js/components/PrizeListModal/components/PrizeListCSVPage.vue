<template>
    <div id="prizeListCSVPage" class="modal-body" style="max-height: calc(100vh - 200px); overflow: auto;">
        <div class="form-group">
            <textarea v-model="csvInput" class="form-control csv-input">
            </textarea>
            <hr>
            <google-support :trigger="triggerOpenPrizeList"></google-support>
        </div>
    </div>
    <div v-show="csvInput === prizeListCSV" class="modal-footer">
        <div style="flex: 1">
            <button class="btn btn-sm btn-block btn-warning download-csv" @click="downloadCSV">
                {{ $t('common.Button.DownloadCSV') }}
            </button>
        </div>
        <div style="flex: 1">
            <button id="prizeListCSVButton" class="btn btn-sm btn-block btn-success upload-csv">
                {{ $t('common.Button.UploadCSV') }}
            </button>
        </div>
    </div>
    <div v-show="csvInput !== prizeListCSV" class="modal-footer">
        <div style="flex: 1">
            <button class="btn btn-sm btn-block btn-warning" @click="cancel">
                {{ $t('common.Button.Cancel') }}
            </button>
        </div>
        <div style="flex: 1">
            <button class="btn btn-sm btn-block btn-success save" @click="save">
                {{ $t('common.Button.Save') }}
            </button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import * as Papa from 'papaparse';
import popup from 'lib/common/util/popup';
import { defineAsyncComponent } from 'vue';
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
            langPaths: [
                'common',
                'PrizeList',
            ],
            csvInput: '',
            dropUpload: false,
            prizeListCSV: '',
        };
    },
    computed: {
        ...mapGetters({
            triggerOpenPrizeList: 'triggerOpenPrizeList',
            config: 'config',
            prizeList: 'prizeList',
        }),
    },
    watch: {
        prizeList: {
            immediate: true,
            deep: true,
            handler(){
                const prizeList = JSON.parse(JSON.stringify(this.prizeList));
                const csv = Papa.unparse(prizeList, {
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
                    this.prizeListCSV = csv;
                } else {
                    this.prizeListCSV = 'sn,img,title,showTitleFlag,note,del';
                }
            },
        },
        prizeListCSV: {
            immediate: true,
            deep: true,
            handler(){
                this.csvInput = JSON.parse(JSON.stringify(this.prizeListCSV));
            },
        },
    },
    beforeCreate(){
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
    methods: {
        ...mapActions({}),
        ...mapMutations({
            setPrizeList: 'setPrizeList',
        }),
        init(){
            const that = this;
            that.dropUpload = new this.DropUploadObj({
                dropSelector: '#prizeListCSVPage',
                clickBtnSelector: '#prizeListCSVButton',
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
            const csvName = `${this.config.webTitle || 'DrawCard'} - ${that.$t('common.Header.PrizeList')}`;
            const csvContent = `data:text/csv;charset=utf-8,${this.csvInput}`;
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', csvName);
            document.body.appendChild(link);
            link.click();

            trackJS.mixpanel('PrizeInfoCSVDownload_click', { csv: this.csvInput });
            trackJS.gtag('event', 'PrizeInfoCSVDownload_click', { csv: this.csvInput });
        },
        save(){
            const that = this;
            popup.confirm({
                title: this.$t('common.popup.Confirm'),
                html: this.$t('PrizeList.SaveModifiedPrizeNotice'),
                confirmButtonText: this.$t('common.Button.Confirm'),
                cancelButtonText: this.$t('common.Button.Cancel'),
            }, () => {
                Papa.parse(this.csvInput, {
                    complete: (results) => {
                        const csvData = results.data;
                        const prizeList = [];
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
                                prizeList.push(data);
                            }
                        }
                        if (prizeList.length > 0) {
                            that.setPrizeList(prizeList);
                            that.$emit('change-tab', 'list');

                            trackJS.mixpanel('PrizeInfoCSVSave_click', { csv: this.csvInput });
                            trackJS.gtag('event', 'PrizeInfoCSVSave_click', { csv: this.csvInput });
                        } else {
                            popup.warning({
                                title: this.$t('common.popup.Warning'),
                                html: this.$t('common.Alert.NoValidContent'),
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
                this.csvInput = this.prizeListCSV;

                trackJS.mixpanel('PrizeInfoCSVCancel_click', {});
                trackJS.gtag('event', 'PrizeInfoCSVCancel_click', {});
            }, () => {

            });
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
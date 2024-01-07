<template>
    <template v-if="mode === 'view'">
        <div v-show="['false', false].includes(del)" class="prize-info-box">
            <div class="prize-info-item handle" rel="drag">
                <i class="fas fa-bars"></i>
            </div>
            <div class="prize-info-item" rel="title">
                <div class="prize-title ellipsis">
                    {{ title }}
                </div>
                <div class="prize-desc ellipsis">
                    {{ desc }}
                </div>
            </div>
            <div class="prize-info-item" rel="cnt">
                {{ cnt }}
            </div>
            <div class="prize-info-item" rel="tool">
                <button class="btn btn-sm btn-primary" @click="editPrizeInfo">
                    <div class="far fa-edit"></div>
                </button>
                <button class="btn btn-sm btn-warning" @click="removePrizeInfo">
                    <div class="fas fa-trash-alt"></div>
                </button>
            </div>
        </div>
    </template>
    <template v-else-if="mode === 'edit'">
        <div class="edit-prize-box mt-3 mb-3">
            <h5>{{ sn === 'add' ? $t('PrizeList.AddPrize') : $t('PrizeList.EditPrize') }}</h5>
            <form action="javascript:;">
                <div class="form-group">
                    <label for="title">{{ $t('PrizeList.PrizeTitle') }}</label>
                    <input v-model.trim="input.title" name="title" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="desc">{{ $t('PrizeList.PrizeDesc') }}</label>
                    <input v-model.trim="input.desc" name="desc" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="cnt">{{ $t('PrizeList.PrizeCount') }}</label>
                    <input v-model.number.trim="input.cnt" name="cnt" :min="1" :step="0"
                        type="number" class="form-control"
                    >
                </div>
                <div class="form-group">
                    <label for="audio">{{ $t('PrizeList.PrizeSound') }}</label>
                    <select v-model.trim="input.audio" class="form-control">
                        <option value="">
                            {{ $t('PrizeList.PrizeNoSound') }}
                        </option>
                        <option v-for="(path, key) in winnerAudio"
                            :key="key" :value="key"
                            v-text="key"
                        ></option>
                    </select>
                </div>
            </form>
            <div class="row">
                <div class="col">
                    <button class="btn btn-block btn-warning btn-sm" @click="cancel">
                        {{ $t('common.Button.Cancel') }}
                    </button>
                </div>
                <div class="col">
                    <button class="btn btn-block btn-primary btn-sm" @click="save">
                        {{ $t('common.Button.Save') }}
                    </button>
                </div>
            </div>
        </div>
    </template>
</template>
<script>
import popup from 'lib/common/util/popup';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { trackJS } from 'lib/common/util';

// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {},
    filters: {},
    props: {
        mode: {
            type: String,
            default: 'view',
        },
        sn: {
            type: [String, Number],
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        desc: {
            type: String,
            default: '',
        },
        audio: {
            type: [String, Number, Boolean],
            default: '',
        },
        cnt: {
            type: [Number, String],
            default: 0,
        },
        del: {
            type: [Boolean, String],
            default: false,
        },
    },
    emits: ['close', 'edit'],
    data(){
        return {
            langPaths: [
                'common',
                'PrizeList',
            ],
            input: {
                sn: '',
                title: '',
                desc: '',
                audio: false,
                cnt: 1,
                del: false,
            },
        };
    },
    computed: {
        ...mapGetters({
            winnerAudio: 'winnerAudio',
        }),
        formatInput(){
            return {
                sn: this.sn,
                title: this.title,
                desc: this.desc,
                audio: this.audio,
                cardIds: this.cardIds,
                cnt: this.cnt,
                del: !!this.del,
            };
        },
    },
    watch: {
        mode: {
            immediate: true,
            handler(){
                if (this.mode === 'edit') {
                    this.input = JSON.parse(JSON.stringify(this.formatInput));
                }
            },
        },
        formatInput: {
            immediate: true,
            deep: true,
            handler(){
                this.input = JSON.parse(JSON.stringify(this.formatInput));
            },
        },
        'input.audio': {
            deep: false,
            handler(newVal, oldVal){
                if (newVal !== oldVal) {
                    this.setPlayWinnerAudio(newVal);
                }
            },
        },
    },
    beforeCreate(){
    },
    created(){},
    mounted(){},
    updated(){},
    unmounted(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            setPlayWinnerAudio: 'setPlayWinnerAudio',
            savePrize: 'savePrize',
            removePrize: 'removePrize',
        }),
        editPrizeInfo(){
            this.$emit('edit', this.sn);
        },
        removePrizeInfo(){
            const that = this;
            popup.confirm({
                title: this.$t('common.popup.Confirm'),
                html: this.$t('common.Alert.AreYouSureDelete'),
                confirmButtonText: this.$t('common.Button.Confirm'),
                cancelButtonText: this.$t('common.Button.Cancel'),
            }, () => {
                const params = {
                    sn: this.sn,
                };
                this.removePrize({ sn: this.sn });
                this.$emit('close');
                trackJS.mixpanel('EditPrizeInfoRemove_click', {});
                trackJS.gtag('event', 'EditPrizeInfoRemove_click', {});
            }, () => {

            });
        },
        save(){
            const that = this;

            const params = {
                sn: `${this.input.sn}`,
                title: this.input.title,
                desc: `${this.input.desc}`,
                audio: `${this.input.audio}`,
                cnt: parseInt(this.input.cnt),
                del: !!this.input.del,
            };

            let can_save = true;
            if (!params.title) {
                popup.warning({
                    title: this.$t('common.popup.Warning'),
                    html: this.$t('PrizeList.PlzEnterPrizeTitle'),
                    confirmButtonText: this.$t('common.Button.Confirm'),
                });
                can_save = false;
            }

            console.log(params.cnt);
            if (isNaN(params.cnt) || params.cnt === '' || params.cnt < 0) {
                popup.warning({
                    title: this.$t('common.popup.Warning'),
                    html: this.$t('PrizeList.PlzCountDoNotZero'),
                    confirmButtonText: this.$t('common.Button.Confirm'),
                });
                can_save = false;
            }

            if (can_save) {
                that.savePrize(params);
                this.$emit('close');

                trackJS.mixpanel('EditPrizeInfoSave_click', params);
                trackJS.gtag('event', 'EditPrizeInfoSave_click', params);
            }
        },
        cancel(){
            const cancelAct = () => {
                this.$emit('close');
            };

            if (JSON.stringify(this.input) !== JSON.stringify(this.formatInput)) {
                popup.confirm({
                    title: this.$t('common.popup.Confirm'),
                    html: this.$t('common.Alert.AreYouSureDiscardEdit'),
                    confirmButtonText: this.$t('common.Button.Confirm'),
                    cancelButtonText: this.$t('common.Button.Cancel'),
                }, () => {
                    this.$emit('close');

                    trackJS.mixpanel('EditPrizeInfoCancel_click', {});
                    trackJS.gtag('event', 'EditPrizeInfoCancel_click', {});
                }, () => {

                });
            } else {
                cancelAct();
            }
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
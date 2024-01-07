<template>
    <template v-if="mode === 'view'">
        <div class="card-info-box">
            <div class="card-info-item" rel="img">
                <div class="preview-card-img" :style="{
                    'background-image': `url(${img})`,
                    'background-size': 'cover',
                    'background-position': 'center center',
                    'background-repeat': 'no-repeat',
                }">
                </div>
            </div>
            <div class="card-info-item ellipsis" rel="title" v-text="title">
            </div>
            <div class="card-info-item" rel="tool">
                <button class="btn btn-sm btn-primary" @click="editCardInfo">
                    <div class="far fa-edit"></div>
                </button>
                <button class="btn btn-sm btn-warning" @click="removeCardInfo">
                    <div class="fas fa-trash-alt"></div>
                </button>
            </div>
        </div>
    </template>
    <template v-else-if="mode === 'edit'">
        <div class="edit-card-box mt-3 mb-3">
            <h5>{{ sn === 'add' ? $t('CardList.AddCard') : $t('CardList.EditCard') }}</h5>
            <div class="text-center">
                <card-box v-if="input.img || input.title"
                    :card-info="input"
                    :box-size="100"
                ></card-box>
            </div>
            <form action="javascript:;">
                <div class="form-group">
                    <label for="img">
                        {{ $t('CardList.CardUrl') }}
                    </label>
                    <input v-model.trim="input.img" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="title">
                        {{ $t('CardList.CardTitle') }}
                    </label>

                    <div class="input-group mb-3">
                        <input v-model.trim="input.title" type="text" class="form-control">
                        <div class="input-group-append">
                            <button
                                class="btn btn-sm"
                                :class="{
                                    'btn-success': input.showTitleFlag,
                                    'btn-secondary': !input.showTitleFlag,
                                }"
                                @click="input.showTitleFlag = !input.showTitleFlag"
                                v-text="input.showTitleFlag ? $t('CardList.CardTitleShow'): $t('CardList.CardTitleHide')"
                            ></button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="title">
                        {{ $t('CardList.CardNotice') }}
                    </label>
                    <textarea v-model.trim="input.note" class="form-control"></textarea>
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
import { defineAsyncComponent } from 'vue';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import popup from 'lib/common/util/popup';
import { trackJS } from 'lib/common/util';

export default {
    components: {
        CardBox: defineAsyncComponent(() => import('components/CardBox/main.vue')),
    },
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
        img: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        showTitleFlag: {
            type: Boolean,
            default: false,
        },
        note: {
            type: String,
            default: '',
        },
    },
    emits: ['close', 'edit'],
    data(){
        return {
            langPaths: [
                'common',
            ],
            input: {
                sn: '',
                img: '',
                title: '',
                showTitleFlag: false,
                note: '',
                del: false,
            },
        };
    },
    computed: {
        ...mapGetters({
        }),
        formatInput(){
            return {
                sn: this.sn,
                img: this.img,
                title: this.title,
                note: this.note,
                showTitleFlag: !!this.showTitleFlag,
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
    },
    created(){},
    mounted(){},
    updated(){},
    unmounted(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            saveCard: 'saveCard',
            removeCard: 'removeCard',
        }),
        editCardInfo(){
            this.$emit('edit', this.sn);
        },
        removeCardInfo(){
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
                that.removeCard(params);
                this.$emit('close');
            }, () => {
                trackJS.mixpanel('EditCardInfoRemove_click', {});
                trackJS.gtag('event', 'EditCardInfoRemove_click', {});
            });
        },
        save(){
            const that = this;

            const params = {
                sn: `${this.input.sn}`,
                img: `${this.input.img}`,
                title: this.input.title,
                showTitleFlag: !!this.input.showTitleFlag,
                note: this.input.note,
                del: !!this.input.del,
            };

            let can_save = true;
            if (!params.title) {
                popup.warning({
                    title: this.$t('common.popup.Warning'),
                    html: this.$t('CardList.PlzEnterCardTitle'),
                    confirmButtonText: this.$t('common.Button.Confirm'),
                });
                can_save = false;
            }

            if (can_save) {
                that.saveCard(params);
                this.$emit('close');
                trackJS.mixpanel('EditCardInfoSave_click', params);
                trackJS.gtag('event', 'EditCardInfoSave_click', params);
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
                    trackJS.mixpanel('EditCardInfoCancel_click', {});
                    trackJS.gtag('event', 'EditCardInfoCancel_click', {});
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
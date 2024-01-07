<template>
    <div
        id="PrizeListBox"
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
                    <h5 class="modal-title mr-2">
                        <i class="fas fa-award"></i>
                        {{ $t('common.Header.PrizeList') }}
                    </h5>
                    <div class="btn-group" role="group" aria-label="prize-edit-type">
                        <template v-for="(icon, key) in editTypeOptions" :key="key">
                            <button
                                type="button"
                                class="btn btn-sm"
                                :class="{
                                    'btn-primary': key === editType,
                                    'btn-secondary': key !== editType,
                                }"
                                :edit-type="key"
                                @click="editType = key"
                            >
                                <i :class="icon"></i>
                            </button>
                        </template>
                    </div>
                    <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <component :is="editComponent" @change-tab="changeTab"></component>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

import PrizeListPage from './components/PrizeListPage.vue';
import PrizeListCSVPage from './components/PrizeListCSVPage.vue';
import { trackJS } from 'lib/common/util';

// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {
        PrizeListPage,
        PrizeListCSVPage,
    },
    filters: {},
    props: {},
    data(){
        return {
            langPaths: [
                'common',
                'PrizeList',
            ],
            editType: '',
            editTypeOptions: {
                list: 'fas fa-list',
                csv: 'fas fa-file-csv',
            },
        };
    },
    computed: {
        ...mapGetters({
            triggerOpenPrizeList: 'triggerOpenPrizeList',
        }),
        editComponent(){
            const that = this;
            let componentName = 'PrizeListPage';
            switch (that.editType) {
                case 'csv':
                    componentName = 'PrizeListCSVPage';
                    break;
                default:
                    componentName = 'PrizeListPage';
                    break;
            }
            return componentName;
        },
    },
    watch: {
        triggerOpenPrizeList: {
            immediate: true,
            handler(){
                this.$nextTick(() => {
                    if (this.triggerOpenPrizeList) {
                        $(this.$refs.box).modal('show');
                    } else {
                        $(this.$refs.box).modal('hide');
                    }
                });
            },
        },
        editType: {
            handler(newVal, oldVal){
                if (newVal !== oldVal && !!oldVal) {
                    trackJS.mixpanel('PrizeListEditType_choose', { type: this.editType });
                    trackJS.gtag('event', 'PrizeListEditType_choose', { type: this.editType });
                }
            },
        },
    },
    beforeCreate(){
    },
    created(){},
    mounted(){
        const that = this;
        const box = $(that.$refs.box);
        box.bind('shown.bs.modal', () => {
            const editTypeOptionsKeys = Object.keys(that.editTypeOptions);
            // eslint-disable-next-line prefer-destructuring
            that.editType = editTypeOptionsKeys[0];

            trackJS.mixpanel('PrizeListOpen_click');
            trackJS.gtag('event', 'PrizeListOpen_click');
        });
        box.bind('hidden.bs.modal', () => {
            that.triggerModal({ key: 'PrizeList', close: true });

            trackJS.mixpanel('PrizeListClose_click');
            trackJS.gtag('event', 'PrizeListClose_click');
        });
    },
    updated(){},
    beforeUnmount(){
        const that = this;
        const box = $(that.$refs.box);
        box.modal('hide');
    },
    unmounted(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            triggerModal: 'triggerModal',
        }),
        changeTab(key){
            this.editType = key;
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
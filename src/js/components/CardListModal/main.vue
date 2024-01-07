<template>
    <div
        id="CardListBox"
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
                        <i class="far fa-image"></i>
                        {{ $t('common.Header.CardList') }}
                    </h5>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <template v-for="(icon, key) in editTypeOptions" :key="key">
                            <button
                                type="button"
                                class="btn btn-sm"
                                :class="{
                                    'btn-primary': key === editType,
                                    'btn-secondary': key !== editType,
                                }"
                                @click="editType = key"
                            >
                                <i :class="icon"></i>
                            </button>
                        </template>
                    </div>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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


import cartListPage from './components/cartListPage.vue';
import cardListCSVPage from './components/cardListCSVPage.vue';
import { trackJS } from 'lib/common/util';

export default {
    components: {
        cartListPage,
        cardListCSVPage,
    },
    filters: {},
    props: {},
    data(){
        return {
            langPaths: [
                'common',
                'CardList',
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
            triggerOpenCardList: 'triggerOpenCardList',
        }),
        editComponent(){
            const that = this;
            let componentName = 'cartListPage';
            switch (that.editType) {
                case 'csv':
                    componentName = 'cardListCSVPage';
                    break;
                default:
                    componentName = 'cartListPage';
                    break;
            }
            return componentName;
        },
    },
    watch: {
        triggerOpenCardList: {
            immediate: true,
            handler(){
                this.$nextTick(() => {
                    if (this.triggerOpenCardList) {
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
                    trackJS.mixpanel('CardListEditType_choose', { type: this.editType });
                    trackJS.gtag('event', 'CardListEditType_choose', { type: this.editType });
                }
            },
        },
    },
    created(){},
    mounted(){
        const that = this;
        const box = $(that.$refs.box);
        box.bind('shown.bs.modal', () => {
            const editTypeOptionsKeys = Object.keys(that.editTypeOptions);
            // eslint-disable-next-line prefer-destructuring
            that.editType = editTypeOptionsKeys[0];

            trackJS.mixpanel('CardListOpen_click');
            trackJS.gtag('event', 'CardListOpen_click');
        });
        box.bind('hidden.bs.modal', () => {
            that.triggerModal({ key: 'CardList', close: true });

            trackJS.mixpanel('CardListClose_click');
            trackJS.gtag('event', 'CardListClose_click');
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
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
                    <h5 class="modal-title">
                        <i class="fas fa-award"></i>
                        獎項名單
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                    <!-- <div class="col-6 text-left">
                        <button type="button"
                            class="btn btn-danger mr-2"
                            @click="clear"
                        >
                            清除資料
                        </button>

                        <button type="button"
                            class="btn btn-warning"
                            @click="clearAward"
                        >
                            清除獲獎
                        </button>
                    </div>
                    <div class="col-6 text-right">
                        <button type="button"
                            class="btn btn-default mr-2"
                            @click="cancel"
                        >
                            回復
                        </button>
                        <button type="button"
                            class="btn btn-primary"
                            @click="save"
                        >
                            儲存
                        </button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
// import $ from 'jquery';
// import 'bootstrap';

// import 'app';
// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {},
    filters: {},
    props: {},
    data(){
        return {};
    },
    computed: {
        ...mapGetters({
            triggerOpenPrizeList: 'triggerOpenPrizeList',
        }),
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
    },
    beforeCreate(){
    },
    created(){},
    mounted(){
        const that = this;
        const box = $(that.$refs.box);
        box.bind('shown.bs.modal', () => {
        });
        box.bind('hidden.bs.modal', () => {
            that.triggerModal({ key: 'CardList', close: true });
        });
    },
    updated(){},
    unmounted(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({
            triggerModal: 'triggerModal',
        }),
    },
};
</script>
<style lang="scss" scoped>
</style>
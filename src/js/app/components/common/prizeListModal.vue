<template>
    <div class="modal card-list-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
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
                    可用數量：{{allCnt}}
                    <template v-if="usedCnt > allCnt">
                        <span style="color: red">(已用數量大於可用數量)</span>
                    </template>
                    <template v-for="(prizeInfo, prizeIndex) in validPrizeList">
                        <template v-if="prizeInfo.sn != focuseEditPrizeSN">
                            <div class="input-group mb-3">
                                <div class="form-control">
                                    {{prizeInfo.title}} [{{prizeInfo.cnt}}]
                                </div>
                                <div class="input-group-append">
                                    <span class="input-group-text" style="cursor: pointer" v-on:click="openEditPrize(prizeInfo)">
                                        <i class="far fa-edit"></i>
                                    </span>
                                    <span class="input-group-text" style="cursor: pointer" v-on:click="delEditPrize(prizeInfo.sn)">
                                        <i class="fas fa-trash-alt"></i>
                                    </span>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="編輯獎項" v-model="editPrize.title">
                                <input style="width: 100px;flex: none; text-align: center;" type="number" class="form-control" placeholder="數量" min="0" :max="editMaxCnt" step="1" v-model="editPrize.cnt">
                                <div class="input-group-append">
                                    <span class="input-group-text" style="cursor: pointer" v-on:click="saveEditPrize(prizeInfo)">
                                        <i class="far fa-save"></i>
                                    </span>
                                </div>
                            </div>
                        </template>

                    </template>
                    <hr/>
                    <template v-if="addMaxCnt == 0">
                        <button type="button" class="btn btn-info btn-block" disabled>新增獎項</button>
                    </template>
                    <template v-else>
                        <template v-if="!addNewFlag">
                            <button type="button" class="btn btn-info btn-block" v-on:click="openAddPrize(true)">新增獎項</button>
                        </template>
                        <template v-else>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="新增獎項" v-model="addNewPrize.title">
                                <input style="width: 100px;flex: none; text-align: center;" type="number" class="form-control" placeholder="數量" min="0" :max="addMaxCnt" step="1" v-model="addNewPrize.cnt">
                                <div class="input-group-append">
                                    <span class="input-group-text" style="cursor: pointer" v-on:click="saveAddPrize">
                                        <i class="far fa-save"></i>
                                    </span>
                                </div>
                            </div>
                        </template>
                    </template>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

let targetDom = null;

export default {
    data: function(){
        return {
            addNewFlag: false,
            addNewPrize: {
                title: "",
                cnt: "",
            },

            focuseEditPrizeSN: null,
            editPrize: {
                sn: "",
                img: "",
                title: "",
            }
        }
    },
    methods: {
        openEditPrize: function(prizeInfo){
            const that = this;
            that.focuseEditPrizeSN = prizeInfo.sn;
            that.editPrize = { ...prizeInfo};
        },

        saveEditPrize: function(prizeInfo){
            const that = this;
            const params = {
                prizeInfo: {
                    ...that.editPrize,
                    sn: prizeInfo.sn,
                }
            };
            that.$store.dispatch("saveEditPrize", params);
            that.focuseEditPrizeSN = null;
        },

        delEditPrize: function(sn){
            const that = this;
            const params ={
                sn: sn,
            }
            that.$store.dispatch("delEditPrize", params);
        },
        openAddPrize: function(flag){
            const that = this;
            that.addNewFlag = flag;
            that.addNewPrize = {
                title: "",
                cnt: "",
            };
        },
        saveAddPrize: function(){
            const that = this;
            if (!!that.addNewPrize.title && !!that.addNewPrize.cnt && that.addNewPrize.cnt > 0) {
                const params = {
                    prizeInfo: that.addNewPrize,
                };

                that.$store.dispatch("saveAddPrize", params);
                that.addNewFlag = false;
            }
        },
    },
    watch: {
        triggerOpenPrizeList: function() {
            const that = this;
            targetDom.modal("show");
        },

    },
    computed: {
        allCnt: function(){
            const that = this;
            let cnt = that.validCardList.length;
            return cnt;
        },
        usedCnt: function(){
            const that = this;
            let cnt = 0;
            that.validPrizeList.forEach(function(prizeInfo){
                cnt = cnt + parseInt(prizeInfo.cnt);
            });
            return cnt;
        },
        addMaxCnt: function(){
            const that = this;
            let cnt = that.validCardList.length;
            that.validPrizeList.forEach(function(prizeInfo){
                cnt = cnt - prizeInfo.cnt;
            });
            return cnt;
        },
        editMaxCnt: function(){
            const that = this;
            let cnt = that.validCardList.length;
            that.validPrizeList.forEach(function(prizeInfo){
                if (prizeInfo.sn != that.focuseEditPrizeSN) {
                    cnt = cnt - prizeInfo.cnt;
                }
            });
            console.log(cnt);
            return cnt;
        },
        ...mapGetters([
            "triggerOpenPrizeList",
            "validCardList",
            "validPrizeList",
        ]),
    },
    mounted() {
        const that = this;
        targetDom = $(that.$el);
        targetDom.bind("shown.bs.modal", function() {
        });
    },
    props: {

    },
    components: {

    }
};
</script>
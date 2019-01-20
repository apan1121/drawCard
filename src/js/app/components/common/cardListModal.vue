<template>
    <div class="modal card-list-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="far fa-image"></i>
                        編輯圖卡
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <template  v-for="(cardInfo, cardIndex) in validCardList">
                        <template v-if="focuseEditCardSN !== cardInfo.sn">
                            <div class="edit-card-box" :key="cardIndex">
                                <div class="row align-items-center">
                                    <div class="col-3">
                                        <div class="preview-card-img imgLiquidFill">
                                            <img :src="cardInfo.img">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <h5>{{cardInfo.title || "無設定圖片名稱"}}</h5>
                                    </div>
                                    <div class="col-3">
                                        <button type="btn btn-info" v-on:click="openEditCard(cardInfo)">
                                            <i class="far fa-edit"></i>
                                        </button>
                                        <button type="btn btn-info" v-on:click="delEditCard(cardInfo.sn)">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="edit-card-box">
                                <div class="preview-card-img imgLiquidFill">
                                    <img :src="editCard.img">
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="新增的圖卡網址" v-model="editCard.img">
                                    <input type="text" class="form-control" placeholder="新增的圖卡名稱" v-model="editCard.title">
                                    <div class="input-group-append">
                                        <span class="input-group-text" style="cursor: pointer" v-on:click="saveEditCard(editCard)">
                                            <i class="far fa-save"></i>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <textarea class="form-control" v-model="editCard.memberList" placeholder="請條列輸入綁定名單"></textarea>
                                </div>
                            </div>
                        </template>
                    </template>

                    <hr/>
                    <template v-if="!addNewFlag">
                        <button type="button" class="btn btn-info btn-block" v-on:click="openAddCard(true)">新增圖卡</button>
                    </template>
                    <template v-else>
                        <div class="edit-card-box">
                            <div class="preview-card-img imgLiquidFill">
                                <img :src="addNewCard.img">
                            </div>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="新增的圖卡網址" v-model="addNewCard.img">
                                <input type="text" class="form-control" placeholder="新增的圖卡名稱" v-model="addNewCard.title">
                                <div class="input-group-append">
                                    <span class="input-group-text" style="cursor: pointer" v-on:click="saveAddCard">
                                        <i class="far fa-save"></i>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <textarea class="form-control" v-model="addNewCard.memberList" placeholder="請條列輸入綁定名單"></textarea>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import {mixpanel} from 'lib/common/util';

let targetDom = null;

export default {
    data: function(){
        return {
            addNewFlag: false,

            addNewCard: {
                img: "",
                title: "",
                memberList: "",
            },

            focuseEditCardSN: null,
            editCard: {
                sn: "",
                img: "",
                title: "",
                memberList: "",
            }
        }
    },
    methods: {
        delEditCard: function(sn){
            const that = this;
            if (confirm("您確定要刪除嗎？")) {
                const params = {
                    sn: sn,
                };
                that.$store.dispatch("delCardBySN", params);
            }
        },
        openEditCard: function(cardInfo){
            const that = this;
            let memberList = "";

            if (Array.isArray(cardInfo.memberList)) {
                memberList = cardInfo.memberList.join("\n");
            } else {
                memberList = "";
            }


            that.focuseEditCardSN = cardInfo.sn;
            that.editCard.sn = cardInfo.sn;
            that.editCard.img = cardInfo.img;
            that.editCard.title = cardInfo.title;
            that.editCard.memberList = memberList;

        },
        saveEditCard: function(cardInfo){
            const that = this;
            if (!!that.editCard.title && !!that.editCard.img) {
                let editCard = JSON.parse(JSON.stringify(that.editCard));
                let memberList = editCard.memberList;

                if (!!memberList) {
                    memberList = memberList.split("\n");
                } else {
                    memberList = [];
                }

                let params = {
                    cardInfo: {
                        sn: cardInfo.sn,
                        img: that.editCard.img,
                        title: that.editCard.title,
                        memberList: memberList,
                    }
                };

                that.$store.dispatch("saveEditCard", params);
                that.focuseEditCardSN = null;
            }

        },
        openAddCard: function(flag){
            const that = this;

            that.addNewCard = {
                img: "",
                title: "",
                memberList: "",
            };
            that.addNewFlag = flag;
        },
        saveAddCard: function(){
            const that = this;

            if (!!that.addNewCard.title && !!that.addNewCard.img) {
                let addNewCard = JSON.parse(JSON.stringify(that.addNewCard));
                let memberList = addNewCard.memberList.trim();

                if (!!memberList) {
                    addNewCard.memberList = memberList.split("\n");
                } else {
                    addNewCard.editCard.memberList = [];
                }

                const params = {
                    cardInfo: addNewCard,
                };
                that.$store.dispatch("saveAddCard", params);

                that.addNewFlag = false;
            }
        }
    },
    watch: {
        triggerOpenCardList: function() {
            const that = this;
            targetDom.modal("show");
        },
        addNewCard: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                $("body").trigger("resizeImg");
            }
        },
        editCard: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                $("body").trigger("resizeImg");
            }
        },
        validCardList: function(){
            $("body").trigger("resizeImg");
        }
    },
    computed: {
        ...mapGetters([
            "triggerOpenCardList",
            "validCardList",
        ])
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
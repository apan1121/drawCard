<template>
    <div class="modal card-list-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-award"></i>
                        設定
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">網站標題</label>
                            <input type="text" class="form-control"   v-model="input.webTitle">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1" style="display: flex;">
                                Header 顏色
                                <span :style="{ background: input.headerColor, width: '20px', height: '20px', display: 'inline-block', border: '1px solid #999' }"></span>
                            </label>
                            <input type="text" class="form-control"   v-model="input.headerColor">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1" style="display: flex;">
                                背景圖片
                            </label>
                            <input type="text" class="form-control"   v-model="input.backgroundImg">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1" style="display: flex;">
                                背景透明度
                            </label>
                            <input type="number" class="form-control" v-model.number="input.backgroundOpacity" min="0" max="1" step="0.1">
                        </div>
                        <hr />
                        <div class="form-group">
                            <label for="exampleInputEmail1">圖片大小 [{{input.boxSize}} px]</label>
                            <input type="range" class="form-control"  min="100" max="200" v-model="input.boxSize">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">圖片隨機速度 [{{input.randomDrawWait}} ms]</label>
                            <input type="range" class="form-control"  min="10" max="1000" v-model="input.randomDrawWait">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">圖片抽取速度 [{{input.drawNextWait}} ms]</label>
                            <input type="range" class="form-control"  min="700" max="5000" v-model="input.drawNextWait">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="col-6 text-left">
                        <button type="button" class="btn btn-danger" v-on:click="clear">清除所有</button>
                        <button type="button" class="btn btn-warning" v-on:click="clearAward">清除獲獎</button>
                    </div>
                    <div class="col-6 text-right">
                        <button type="button" class="btn btn-default" v-on:click="cancel">回復</button>
                        <button type="button" class="btn btn-primary" v-on:click="save">儲存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import cardBox from './cardBox';

let targetDom = null;

export default {
    data: function(){
        return {
            input: {
                webTitle: "",
                boxSize: 0,
                headerColor: '#343a40',
                backgroundImg: '',
                backgroundOpacity: 0.5,
                randomDrawWait: 0,
            },
            orgInput: {
                webTitle: "",
                boxSize: 0,
                headerColor: '#343a40',
                backgroundImg: '',
                backgroundOpacity: 0.5,
                randomDrawWait: 0,
            },
        }
    },
    methods: {
        save: function(){
            const that = this;
            const params = {
                config: that.input,
            };
            targetDom.modal("hide");
        },
        cancel: function(){
            const that = this;
            const params = {
                config: that.orgInput,
            };
            that.$store.dispatch("setConfig", params)
            targetDom.modal("hide");
        },
        clear: function(){
            const that = this;
            if (confirm("您確定要清除所有的資料嗎？")) {
                that.$store.dispatch("clearAllData");
                targetDom.modal("hide");
            }
        },
        clearAward(){
            const that = this;
            if (confirm("您確定要清除獲獎資料嗎？")) {
                that.$store.dispatch("clearAwardData");
                targetDom.modal("hide");
            }
        },
    },
    watch: {
        input: {
            deep: true,
            handler: function (val, oldVal) {
                const that = this;
                const params = {
                    config: that.input,
                };
                that.$store.dispatch("setConfig", params);
            },
        },
        triggerOpenSetting: function(){
            const that = this;
            targetDom.modal("show");
        },
    },
    computed: {
        ...mapGetters([
            "triggerOpenSetting",
            "config",
        ])
    },
    mounted() {
        const that = this;
        targetDom = $(that.$el);
        targetDom.bind("shown.bs.modal", function() {
            let config = JSON.parse(JSON.stringify(that.config));
            that.input = { ...that.input, ...config};
            that.orgInput = { ...that.orgInput, ...config};
        });
    },
    props: {

    },
    components: {
    }
};
</script>

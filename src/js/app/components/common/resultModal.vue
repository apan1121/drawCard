<template>
    <div class="modal card-list-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-award"></i>
                        開獎結果
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th style="width: 15%;">#</th>
                                <th style="width: 20%;">卡片</th>
                                <th style="width: 30%;">名稱</th>
                                <th>獎項</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(cardInfo, cardIndex) in cardListByPrize">
                                <tr>
                                    <td style="width: 15%;">{{cardInfo.sn}}</td>
                                    <td style="width: 20%;">
                                        <div style="width: 100px; height: 100px;">
                                            <card-box v-bind:cardSN="cardInfo.sn"></card-box>
                                        </div>
                                    </td>
                                    <td style="width: 30%;">{{cardInfo.title}}</td>
                                    <td>{{cardInfo.award.join("、")}}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <div class="col-6 text-left">
                    </div>
                    <div class="col-6 text-right">
                        <button type="button" class="btn btn-primary" v-on:click="download">下載</button>

                        <button type="button" class="btn btn-primary" v-on:click="downloadResult">下載兌獎列表</button>
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

        }
    },
    methods: {
        downloadResult: function(){
            const that = this;
            let cardListByPrize = JSON.parse(JSON.stringify(that.cardListByPrize));

            let cvs = "人名,圖片名稱,獎項\n";
            cardListByPrize.forEach(function(Obj){
                if (!!Obj.memberList) {
                    Obj.memberList.forEach(function(memberName){
                        cvs += [ memberName, Obj.title, Obj.award.join("、")].join(",") + "\n";
                    });
                }
            });
            let csvContent = "data:text/csv;charset=utf-8," + cvs;
            let encodedUri = encodeURI(csvContent);

            let link = document.createElement("a");
            link.style.display = "none";
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", that.config.webTitle + "中獎人名單.csv");
            document.body.appendChild(link); // Required for FF
            link.click();
        },
        download: function(){
            const that = this;
            let cardListByPrize = JSON.parse(JSON.stringify(that.cardListByPrize));

            let cvs = "編號,圖片名稱,獎項\n" + cardListByPrize.map(function(Obj){
                let data = [];
                data.push( Obj.sn );
                data.push( Obj.title );
                if (Obj.award.length > 0) {
                    data.push( Obj.award.join("、"));
                } else {
                    data.push( "--" );
                }

                return data.join(",");
            }).join("\r\n");

            let csvContent = "data:text/csv;charset=utf-8," + cvs;
            let encodedUri = encodeURI(csvContent);

            let link = document.createElement("a");
            link.style.display = "none";
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", that.config.webTitle + "中獎名單.csv");
            document.body.appendChild(link); // Required for FF
            link.click();

        },
    },
    watch: {
        triggerOpenResult: function(){
            const that = this;
            targetDom.modal("show");
        },
    },
    computed: {
        ...mapGetters([
            "triggerOpenResult",
            "cardListByPrize",
            "config",
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
        cardBox
    }
};
</script>
<style scoped>
.card-box-wrapper{
    width: 100%;
    height: 100%;
}
</style>
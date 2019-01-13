<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    data: function(){
        return {
        }
    },
    methods: {
        triggerOpenCardListModal: function(){
            const that = this;
            that.$store.dispatch("triggerOpenCardListModal");
        },
        triggerOpenPrizeListModal: function(){
            const that = this;
            that.$store.dispatch("triggerOpenPrizeListModal");
        },
        triggerOpenResultModal: function(){
            const that = this;
            that.$store.dispatch("triggerOpenResultModal");
        },
        triggerOpenSettingModal: function(){
            const that = this;
            that.$store.dispatch("triggerOpenSettingModal");
        },
    },
    watch: {

    },
    computed: {
        ...mapGetters([
            "validShortlistSN",
            "config",
        ])
    },
    mounted() {
    },
    props: {

    },
    components: {

    }
};
</script>
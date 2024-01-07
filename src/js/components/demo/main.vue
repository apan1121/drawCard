<template>
    <div></div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

import { module_name, module_store } from './lib/store/index';
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
        ...mapGetters([
            'PageSetting',
        ]),
    },
    watch: {
        PageSetting(newVal){
            const that = this;
            if (newVal.width) {
                if (newVal.width < that.pc_min_size) {
                    that.mode_type = 'mobile';
                } else {
                    that.mode_type = 'pc';
                }
            } else {
                that.mode_type = newVal.mode_type;
            }
        },
    },
    beforeCreate(){
        if (!this.$store.state[module_name]) {
            this.$store.registerModule(module_name, module_store);
        }
    },
    created(){},
    mounted(){},
    updated(){},
    destroyed(){},
    methods: {
        ...mapActions({}),
        ...mapMutations({}),
    },
};
</script>
<style lang="scss" scoped>
</style>
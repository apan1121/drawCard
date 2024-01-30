<template>
    <div
        id="SettingBox"
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
                        <i class="fas fa-cog"></i>
                        {{ $t('common.Header.Setting') }}
                    </h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="box-setting" rel="Style">
                            <div class="form-group">
                                <label for="webTitle">
                                    {{ $t('Setting.EventTitle') }}
                                </label>
                                <input v-model="input.webTitle" name="webTitle" type="text"
                                    class="form-control"
                                >
                            </div>
                            <div class="form-group">
                                <label for="headerColor" style="display: flex;">
                                    {{ $t('Setting.HeaderColor') }}
                                    <span :style="{
                                              background: input.headerColor,
                                              width: '20px',
                                              height: '20px',
                                              display: 'inline-block',
                                              border: '1px solid #999'
                                          }"
                                        class="ml-2"
                                    ></span>
                                </label>
                                <input v-model="input.headerColor" name="headerColor" type="text"
                                    class="form-control"
                                >
                            </div>

                            <div class="form-group">
                                <label for="PrizeTitleColor" style="display: flex;">
                                    {{ $t('Setting.PrizeTitleColor') }}
                                    <span :style="{
                                              background: input.PrizeTitleColor,
                                              width: '20px',
                                              height: '20px',
                                              display: 'inline-block',
                                              border: '1px solid #999'
                                          }"
                                        class="ml-2"
                                    ></span>
                                </label>
                                <input v-model="input.PrizeTitleColor" name="PrizeTitleColor" type="text"
                                    class="form-control"
                                >
                            </div>

                            <div class="form-group">
                                <label for="PrizeDescColor" style="display: flex;">
                                    {{ $t('Setting.PrizeDescColor') }}
                                    <span :style="{
                                              background: input.PrizeDescColor,
                                              width: '20px',
                                              height: '20px',
                                              display: 'inline-block',
                                              border: '1px solid #999'
                                          }"
                                        class="ml-2"
                                    ></span>
                                </label>
                                <input v-model="input.PrizeDescColor" name="PrizeDescColor" type="text"
                                    class="form-control"
                                >
                            </div>

                            <div class="form-group">
                                <label for="PrizeDescBgColor" style="display: flex;">
                                    {{ $t('Setting.PrizeDescBgColor') }}
                                    <span :style="{
                                              background: input.PrizeDescBgColor,
                                              width: '20px',
                                              height: '20px',
                                              display: 'inline-block',
                                              border: '1px solid #999'
                                          }"
                                        class="ml-2"
                                    ></span>
                                </label>
                                <input v-model="input.PrizeDescBgColor" name="PrizeDescBgColor" type="text"
                                    class="form-control"
                                >
                            </div>

                            <div class="form-group">
                                <label for="backgroundImg" style="display: flex;">
                                    {{ $t('Setting.BgImage') }}
                                </label>
                                <div class="input-group mb-3">
                                    <input v-model="input.backgroundImg"
                                        type="text"
                                        class="form-control"
                                        name="backgroundImg"
                                        :placeholder="$t('Setting.PlzEnterBgImageURL')"
                                        autocomplete="off"
                                    >
                                    <div class="input-group-append">
                                        <span class="input-group-text" style="cursor: pointer" @click="getBgImg">
                                            <i :class="diceArr[diceFocus]"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <google-support :trigger="triggerOpenSetting"></google-support>

                            <div class="form-group">
                                <label for="backgroundOpacity" style="display: flex;">
                                    {{ $t('Setting.BgOpacity') }}
                                </label>
                                <input v-model.number="input.backgroundOpacity"
                                    name="backgroundOpacity"
                                    type="number"
                                    class="form-control"
                                    min="0" max="1" step="0.1"
                                >
                            </div>
                        </div>
                        <hr />
                        <div class="box-setting" rel="Card">
                            <div class="form-group">
                                <label for="boxSize">{{ $t('Setting.CardSize') }} [{{ input.boxSize }} px]</label>
                                <input v-model.number="input.boxSize" name="boxSize"
                                    type="range"
                                    class="form-control"
                                    min="100" max="200"
                                >
                            </div>
                            <div class="form-group">
                                <label for="boxFontSize">{{ $t('Setting.CardFontSize') }} [{{ input.boxFontSize }} px]</label>
                                <input v-model.number="input.boxFontSize" name="boxFontSize"
                                    type="range"
                                    class="form-control"
                                    min="11" max="60"
                                >
                            </div>
                            <div class="form-group">
                                <label for="boxFontColor" style="display: flex;">
                                    {{ $t('Setting.CardFontColor') }}
                                    <span :style="{
                                              background: input.boxFontColor,
                                              width: '20px',
                                              height: '20px',
                                              display: 'inline-block',
                                              border: '1px solid #999'
                                          }"
                                        class="ml-2"
                                    ></span>
                                </label>
                                <input v-model="input.boxFontColor" name="boxFontColor" type="text"
                                    class="form-control"
                                >
                            </div>
                            <div class="form-group">
                                <label for="boxFontBgColor" style="display: flex;">
                                    {{ $t('Setting.CardFontBgColor') }}
                                    <span :style="{
                                              background: input.boxFontBgColor,
                                              width: '20px',
                                              height: '20px',
                                              display: 'inline-block',
                                              border: '1px solid #999'
                                          }"
                                        class="ml-2"
                                    ></span>
                                </label>
                                <input v-model="input.boxFontBgColor" name="boxFontBgColor" type="text"
                                    class="form-control"
                                >
                            </div>
                            <div class="form-group">
                                <label for="boxFontBgOpacity">
                                    {{ $t('Setting.CardFontBgOpacity') }} [{{ input.boxFontBgOpacity }}]
                                </label>
                                <input v-model.number="input.boxFontBgOpacity" name="boxFontBgOpacity"
                                    type="range"
                                    class="form-control"
                                    min="0.1" max="1"
                                    step="0.01"
                                >
                            </div>


                            <div class="form-group">
                                <label for="randomDrawWait">{{ $t('Setting.RandomSpeed') }} [{{ input.randomDrawWait }} ms]</label>
                                <input v-model.number="input.randomDrawWait"
                                    name="randomDrawWait"
                                    type="range"
                                    class="form-control"
                                    min="10" max="1000"
                                >
                            </div>
                            <div class="form-group">
                                <label for="drawNextWait">{{ $t('Setting.DrawingSpeed') }} [{{ input.drawNextWait }} ms]</label>
                                <input v-model.number="input.drawNextWait"
                                    name="drawNextWait"
                                    type="range"
                                    class="form-control"
                                    min="700" max="5000"
                                >
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <h4>{{ $t('Setting.BuyMeACoffee') }}</h4>
                            </div>
                            <div class="col-12">
                                <a href="https://www.buymeacoffee.com/apan1121" target="_blank" @click="donateAct">
                                    <div class="donate-image">
                                        <img :src="'./dist/img/buymeacoffee.jpeg'">
                                    </div>
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="col-7 text-left">
                        <button type="button"
                            class="btn btn-danger btn-sm mr-2"
                            @click="clear"
                        >
                            {{ $t('Setting.Button.ClearAll') }}
                        </button>

                        <button type="button"
                            class="btn btn-warning btn-sm"
                            @click="clearAward"
                        >
                            {{ $t('Setting.Button.ClearPrizeWinning') }}
                        </button>
                    </div>
                    <div class="col-5 text-right">
                        <button type="button"
                            class="btn btn-default btn-sm mr-2"
                            @click="cancel"
                        >
                            {{ $t('common.Button.Undo') }}
                        </button>
                        <button type="button"
                            class="btn btn-primary btn-sm"
                            @click="save"
                        >
                            {{ $t('common.Button.Save') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { string, trackJS } from 'lib/common/util';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import popup from 'lib/common/util/popup';
import { defineAsyncComponent } from 'vue';

// import { string, jsVars, popup, trackJS, localStorage, ppPanel } from 'lib/common/util';

export default {
    components: {
        GoogleSupport: defineAsyncComponent(() => import('components/GoogleSupport/main.vue')),
    },
    filters: {},
    props: {},
    data(){
        return {
            langPaths: [
                'common',
                'Setting',
            ],
            orgInput: {
                webTitle: 'Draw Card',
                PrizeTitleColor: '#212529',
                PrizeDescColor: '#FFF',
                PrizeDescBgColor: '#900',
                boxSize: 200,
                boxFontSize: 16,
                boxFontColor: '#FFF',
                boxFontBgColor: '#000',
                boxFontBgOpacity: 0.8,
                headerColor: '#343a40',
                backgroundImg: '',
                backgroundOpacity: 0.5,
                randomDrawWait: 80,
                drawNextWait: 1000,
            },
            input: {
                webTitle: 'Draw Card',
                PrizeTitleColor: '#212529',
                PrizeDescColor: '#FFF',
                PrizeDescBgColor: '#900',
                boxSize: 200,
                boxFontSize: 16,
                boxFontColor: '#FFF',
                boxFontBgColor: '#000',
                boxFontBgOpacity: 0.8,
                headerColor: '#343a40',
                backgroundImg: '',
                backgroundOpacity: 0.5,
                randomDrawWait: 80,
                drawNextWait: 1000,
            },
            diceArr: [
                'fas fa-dice-one',
                'fas fa-dice-two',
                'fas fa-dice-three',
                'fas fa-dice-four',
                'fas fa-dice-five',
                'fas fa-dice-six',
            ],
            diceFocus: 2,
        };
    },
    computed: {
        ...mapGetters({
            triggerOpenSetting: 'triggerOpenSetting',

            defaultConfig: 'defaultConfig',
            config: 'config',
            randomBgImg: 'randomBgImg',
        }),
    },
    watch: {
        triggerOpenSetting: {
            immediate: true,
            deep: true,
            handler(){
                this.$nextTick(() => {
                    if (this.triggerOpenSetting) {
                        $(this.$refs.box).modal('show');
                    } else {
                        $(this.$refs.box).modal('hide');
                    }
                });
            },
        },
        input: {
            deep: true,
            handler(val, oldVal){
                const that = this;
                const params = {
                    config: that.input,
                };
                that.setConfig(params);

                // clearTimeout(that.mixpanelTrackerTimer);
                // // that.mixpanelTrackerTimer = setTimeout(() => {
                // //     trackJS.mixpanel('SettingTry_click', that.config);
                // //     trackJS.gtag('event', 'SettingTry_click', that.config);
                // // }, 2000);
            },
        },
    },
    created(){},
    mounted(){
        const that = this;
        const box = $(that.$refs.box);
        box.bind('shown.bs.modal', () => {
            const config = JSON.parse(JSON.stringify(that.config));
            that.orgInput = {
                ...that.orgInput,
                ...config,
            };
            that.input = JSON.parse(JSON.stringify(that.orgInput));

            trackJS.mixpanel('SettingOpen_click');
            trackJS.gtag('event', 'SettingOpen_click');
        });
        box.bind('hidden.bs.modal', () => {
            trackJS.mixpanel('SettingClose_click');
            trackJS.gtag('event', 'SettingClose_click');
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
            setConfig: 'setConfig',
            clearAllData: 'clearAllData',
            clearAwardData: 'clearAwardData',
        }),
        getBgImg(){
            const that = this;
            const randomBgImg = that.randomBgImg.split(',');

            const getRandomBgImg = () => {
                const index = string.randRange(0, randomBgImg.length - 1);
                const name = randomBgImg.splice(index, 1);
                return name[0];
            };

            const input = JSON.parse(JSON.stringify(that.input));
            input.backgroundImg = getRandomBgImg();
            that.input = input;
            that.diceFocus = string.randRange(0, that.diceArr.length - 1);
        },
        cancel(){
            const that = this;
            const params = {
                config: that.orgInput,
            };
            that.setConfig(params);
            $(that.$refs.box).modal('hide');
        },
        clear(){
            const that = this;
            popup.confirm({
                title: this.$t('common.popup.Warning'),
                html: this.$t('Setting.Notice.AreYouSureToClearAll'),
                confirmButtonText: this.$t('common.Button.Confirm'),
                cancelButtonText: this.$t('common.Button.Cancel'),
            }, () => {
                that.clearAllData();
                trackJS.mixpanel('SettingClearAll_click', {});
                trackJS.gtag('event', 'SettingClearAll_click', {});
                $(that.$refs.box).modal('hide');
            }, () => {

            });
        },
        clearAward(){
            const that = this;
            popup.confirm({
                title: this.$t('common.popup.Warning'),
                html: this.$t('Setting.Notice.AreYouSureToClearPrizeWinning'),
                confirmButtonText: this.$t('common.Button.Confirm'),
                cancelButtonText: this.$t('common.Button.Cancel'),
            }, () => {
                that.clearAwardData();
                trackJS.mixpanel('SettingClearPrizeWinner_click', {});
                trackJS.gtag('event', 'SettingClearPrizeWinner_click', {});
                $(that.$refs.box).modal('hide');
            }, () => {

            });
        },
        save(){
            const that = this;
            const params = {
                config: that.input,
            };
            trackJS.mixpanel('SettingSave_click', that.config);
            trackJS.gtag('event', 'SettingSave_click', that.config);
            $(that.$refs.box).modal('hide');
        },
        donateAct(){
            trackJS.gtag('event', 'donate_click', {
            });
            trackJS.mixpanel('donate_click', {
            });
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
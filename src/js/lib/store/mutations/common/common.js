import { localStorage, scrollTo, string } from 'lib/common/util';

export default {
    setFavicon(state, key){
        document.querySelector('link[type="image/x-icon"]').setAttribute('href', state.favicon[key]);
    },

    setIsTutorial(state, bool){
        state.isTutorial = !!bool;
    },

    CheckAdBlock(state, data){
        state.adBlocked = data;
    },

    initSystem(state, params){
        // state.prizeList = prizeList;
        const drawDrawStorage = localStorage.get('drawDrawStorage', {});
        const drawDrawKeyList = Object.keys(drawDrawStorage);

        console.log('params', params);

        if (drawDrawKeyList.length > 0) {
            this.commit('setDrawCardChooseList', []);
        } else {
            this.commit('createDefaultDrawCard', { DrawCardName: (params.DefaultEventName || 'Draw Card') });
        }
    },

    /**
     * 建立舊資料選單
     */
    setDrawCardChooseList(state){
        const drawDrawStorage = localStorage.get('drawDrawStorage', {});
        const drawCardChooseList = [];
        Object.keys(drawDrawStorage).forEach((key) => {
            drawCardChooseList.push({
                key,
                title: drawDrawStorage[key].config.webTitle,
            });
        });
        state.drawCardChooseList = drawCardChooseList;
    },

    /**
     * 建立一筆預設抽獎活動
     */
    createDefaultDrawCard(state, params){
        // trackJS.mixpanel('createDefaultLuckyDraw_trigger', params);
        const drawCardFocusKey = string.getRandomString(20);

        const config = JSON.parse(JSON.stringify(state.defaultConfig));
        if (!!params.DrawCardName && 1) {
            config.webTitle = params.DrawCardName;
        }
        const cardList = [];

        state.drawCardFocusKey = drawCardFocusKey;
        state.config = config;
        state.cardList = cardList;

        state.drawCardChooseList = [];
        // this.commit('formatHaveAwardCandidateSN');
    },

    /**
     * 選擇抽獎活動
     */
    chooseDrawCardFromStorage(state, key){
        const drawDrawStorage = localStorage.get('drawDrawStorage', {});

        if (drawDrawStorage[key]) {
            const { config, cardList, prizeList, prizeCardMapping, defaultConfig } = drawDrawStorage[key];
            state.drawCardFocusKey = key;
            state.config = config || defaultConfig;
            state.cardList = cardList || [];
            state.prizeList = prizeList || [];
            state.prizeCardMapping = prizeCardMapping || {};
            // state.candidateList_sort = candidateList_sort;
            // state.prizeList = prizeList;

            state.drawCardChooseList = [];
            // trackJS.mixpanel('LuckyDrawChooseResetData_trigger', { key, config, candidateList, candidateList_sort, prizeList });
            // this.commit('formatHaveAwardCandidateSN');
        }
    },

    /**
     * 刪除抽獎活動
     */
    removeDrawCardFromStorage(state, key){
        const drawDrawStorage = localStorage.get('drawDrawStorage', {});
        delete drawDrawStorage[key];
        localStorage.set('drawDrawStorage', drawDrawStorage);
        this.commit('setDrawCardChooseList', []);
    },

    /**
     *
     */
    saveOldVerDataToStorage(state, drawCardsSetting){
        const defaultConfig = JSON.parse(JSON.stringify(state.defaultConfig));
        console.log('drawCardsSetting', drawCardsSetting);
        const { config, prizeList, cardList } = drawCardsSetting;

        const input_config = {};
        for (const key in defaultConfig) {
            input_config[key] = config[key] || defaultConfig[key];
        }

        const input_cardList = [];
        if (Array.isArray(cardList) && cardList.length > 0) {
            for (const cardInfo of cardList) {
                input_cardList.push({
                    sn: `${cardInfo.sn}`,
                    title: cardInfo.title,
                    img: cardInfo.img,
                    note: cardInfo.memberList.join(','),
                    showTitleFlag: true,
                    del: cardInfo.del,
                });
            }
        }

        const input_prizeList = [];
        const prizeCardMapping = {};

        if (Array.isArray(prizeList) && prizeList.length > 0) {
            for (const prizeInfo of prizeList) {
                input_prizeList.push({
                    sn: `${prizeInfo.sn}`,
                    title: prizeInfo.title,
                    desc: prizeInfo.description,
                    audio: prizeInfo.audio,
                    cnt: parseInt(prizeInfo.cnt),
                    del: prizeInfo.del,
                });

                prizeCardMapping[`${prizeInfo.sn}`] = prizeInfo.cardIds.map((item) => `${item}`);
            }
        }

        const drawCardFocusKey = string.getRandomString(20);
        state.drawCardFocusKey = drawCardFocusKey;
        state.config = input_config;
        state.cardList = input_cardList;
        state.prizeList = input_prizeList;
        state.prizeCardMapping = prizeCardMapping || {};
        state.drawCardChooseList = [];
    },


    /**
     * LocalStorage Listen 同步回 state
     */
    listenLocalStorageChange(state, params){
        const { drawCardFocusKey } = state;
        const drawDrawStorage = localStorage.get('drawDrawStorage', {});

        if (!!drawDrawStorage[drawCardFocusKey] && 1) {
            const storage = drawDrawStorage[drawCardFocusKey];
            const LSData = {
                config: JSON.parse(JSON.stringify(storage.config)),
                cardList: JSON.parse(JSON.stringify(storage.cardList)),
                prizeList: JSON.parse(JSON.stringify(storage.prizeList)),
            };

            const NowData = {
                config: JSON.parse(JSON.stringify(state.config)),
                cardList: JSON.parse(JSON.stringify(state.cardList)),
                prizeList: JSON.parse(JSON.stringify(state.prizeList)),
            };

            if (JSON.stringify(LSData) !== JSON.stringify(NowData)) {
                // trackJS.mixpanel('LuckyDrawLS_sync', { key: luckyDrawFocusKey, ...storage });
                state.config = storage.config;
                state.cardList = storage.cardList;
                state.prizeList = storage.prizeList;

                // this.commit('formatHaveAwardCandidateSN');
            }
        }
    },

    SetPageSetting(state, params){
        for (const key in params) {
            state[`PageSetting_${key}`] = params[key];
        }
    },
    CheckAdBlock(state, data){
        state.adBlocked = data;
    },

    /**
     * 開啟 Modal
     */
    triggerModal(state, params){
        const { key } = params;
        const triggerKey = `triggerOpen${key}`;
        if (typeof state[triggerKey] !== 'undefined') {
            if (typeof params.close === 'undefined') {
                state[triggerKey] = new Date().getTime();
            } else {
                state[triggerKey] = false;
            }
        }
    },

    /**
     * 儲存卡片
     */
    saveCard(state, params){
        const cardInfo = params;
        const cardList = JSON.parse(JSON.stringify(state.cardList));
        const cardSNList = cardList.map((tmpCardInfo) => `${tmpCardInfo.sn}`);

        if (cardInfo.sn === 'add') {
            let sn = false;

            do {
                sn = string.getRandomString(10);
            } while (cardSNList.includes(sn));
            cardInfo.sn = sn;
        }

        const snIndex = cardSNList.indexOf(cardInfo.sn);

        if (snIndex === -1) {
            cardList.push(cardInfo);
        } else {
            cardList[snIndex] = cardInfo;
        }
        state.cardList = cardList;
        return true;
    },

    /**
     * 刪除卡片
     */
    removeCard(state, params){
        const cardList = JSON.parse(JSON.stringify(state.cardList));
        const cardSNList = cardList.map((tmpCardInfo) => `${tmpCardInfo.sn}`);
        const { sn } = params;
        const snIndex = cardSNList.indexOf(`${sn}`);
        if (snIndex !== -1) {
            cardList[snIndex].del = true;
        }
        state.cardList = cardList;
        return true;
    },

    /**
     * 快速儲存 cardList
     */
    setCardList(state, params){
        // defaultColumns: ['sn', 'img', 'title', 'showTitleFlag', 'note', 'del'],
        const cardList = [];
        for (const cardInfo of params) {
            const data = {};
            ['sn', 'img', 'title', 'showTitleFlag', 'note', 'del'].forEach((key) => {
                data[key] = cardInfo[key] || '';
                if (['showTitleFlag', 'del'].includes(key)) {
                    data[key] = [true, 'true', 'TRUE'].includes(data[key]);
                }
                if (!data.sn) {
                    data.sn = string.getRandomString(10);
                }
            });
            cardList.push(data);
        }
        state.cardList = cardList;
    },

    setPrizeList(state, params){
        const prizeList = JSON.parse(JSON.stringify(state.prizeList));
        const prizeListMapping = {};
        prizeList.forEach((prizeInfo) => {
            prizeListMapping[prizeInfo.sn] = prizeInfo;
        });

        params.forEach((paramInfo) => {
            prizeListMapping[paramInfo.sn] = paramInfo;
        });

        const orderPrizeSn = params.map((paramInfo) => paramInfo.sn);
        const newPrizeList = [];

        orderPrizeSn.forEach((sn) => {
            if (typeof prizeListMapping[sn] !== 'undefined') {
                newPrizeList.push(prizeListMapping[sn]);
                delete prizeListMapping[sn];
            }
        });

        Object.values(prizeListMapping).forEach((prizeInfo) => {
            prizeInfo.del = true;
            newPrizeList.push(prizeInfo);
        });

        state.prizeList = newPrizeList;
    },

    /**
     * 儲存獎項
     */
    savePrize(state, params){
        const prizeInfo = params;

        const prizeList = JSON.parse(JSON.stringify(state.prizeList));
        const prizeSNList = prizeList.map((tmpPrizeInfo) => `${tmpPrizeInfo.sn}`);

        if (prizeInfo.sn === 'add') {
            let sn = false;

            do {
                sn = string.getRandomString(10);
            } while (prizeSNList.includes(sn));
            prizeInfo.sn = sn;
        }

        const snIndex = prizeSNList.indexOf(prizeInfo.sn);
        if (snIndex === -1) {
            prizeList.push(prizeInfo);
        } else {
            prizeList[snIndex] = prizeInfo;
        }
        state.prizeList = prizeList;
    },

    removePrize(state, params){
        const prizeList = JSON.parse(JSON.stringify(state.prizeList));
        const prizeSNList = prizeList.map((tmpPrizeInfo) => `${tmpPrizeInfo.sn}`);
        const { sn } = params;
        const snIndex = prizeSNList.indexOf(`${sn}`);
        if (snIndex !== -1) {
            prizeList[snIndex].del = true;
        }
        state.prizeList = prizeList;
        return true;
    },

    /**
     * 鎖定正在收講的 PrizeSN
     */
    lockDrawIt(state, params){
        const oldPrize = state.lockDrawItByPrizeSN;
        const newPrize = params;
        state.lockDrawItByPrizeSN = params;

        const focusPrizeSn = (oldPrize || newPrize);
        if (focusPrizeSn) {
            scrollTo({
                selector: `.lucky-draw-prize-box[prize-sn="${focusPrizeSn}"]`,
            }, 1);
        }
    },

    /**
     * 設定獎項
     */
    setCardIdsByPrizeSN(state, params){
        const { prizeSN, cardIds } = params;
        const prizeCardMapping = JSON.parse(JSON.stringify(state.prizeCardMapping));
        prizeCardMapping[prizeSN] = cardIds;

        state.prizeCardMapping = prizeCardMapping;
    },

    /**
     * 設定列表
     */
    setConfig(state, params){
        let config = JSON.parse(JSON.stringify(state.config));
        config = { ...config, ...params.config };
        state.config = config;
    },

    /**
     * 清除此抽獎活動所有資訊
     */
    clearAllData(state, params){
        const defaultConfig = JSON.parse(JSON.stringify(state.defaultConfig));
        state.config = {
            ...defaultConfig,
            webTitle: state.config.webTitle,
        };
        state.cardList = [];
        state.prizeList = [];
        // // state.luckySN = [];
        // // state.shortlist = [];
        // // state.shortlist_sort = [];
        // // state.prizeList = [];

        // state.candidateList = [];
        // state.candidateList_sort = [];
        // state.prizeList = [];
        // state.focusCandidateSN = null;
        // state.focusPrizeSN = null;

        // this.commit('formatHaveAwardCandidateSN');
    },

    /**
     * 清除獲獎紀錄
     */
    clearAwardData(state){
        state.prizeCardMapping = {};
    },

    /**
     * 儲存到 localStorage
     */
    saveToLocalStorage(state){
        const drawDrawStorage = localStorage.get('drawDrawStorage', {});
        const { drawCardFocusKey, defaultConfig } = state;
        const { config, cardList, prizeList, prizeCardMapping } = state;

        drawDrawStorage[drawCardFocusKey] = {
            config,
            cardList,
            prizeList,
            prizeCardMapping,
        };
        localStorage.set('drawDrawStorage', drawDrawStorage);
    },

    setPlayWinnerAudio(state, params){
        const { winnerAudio } = state;
        let playWinnerAudio = false;
        if (winnerAudio[params]) {
            playWinnerAudio = params;
        }
        state.playWinnerAudio = playWinnerAudio;
    },

    createRandomLuckyDraw(state, params){
        const randomPrize = state.randomPrize.split(',');
        const randomCardTitle = state.randomCardTitle.split(',');
        const randomCardImg = state.randomCardImg.split(',');
        const randomColor = state.randomColor.split(',');
        const randomBgImg = state.randomBgImg.split(',');
        const randomConfig = JSON.parse(JSON.stringify(state.randomConfig));
        const config = JSON.parse(JSON.stringify(state.config));

        const getRandomCardTitle = () => {
            const index = string.randRange(0, randomCardTitle.length - 1);
            const name = randomCardTitle.splice(index, 1);
            return name[0];
        };

        const getRandomCardImg = () => {
            const index = string.randRange(0, randomCardImg.length - 1);
            const name = randomCardImg.splice(index, 1);
            return name[0];
        };

        const getRandomPrize = () => {
            const index = string.randRange(0, randomPrize.length - 1);
            const name = randomPrize.splice(index, 1);
            return name[0];
        };

        const getRandomColor = () => {
            const index = string.randRange(0, randomColor.length - 1);
            const name = randomColor.splice(index, 1);
            return name[0];
        };

        const getRandomBgImg = () => {
            const index = string.randRange(0, randomBgImg.length - 1);
            const name = randomBgImg.splice(index, 1);
            return name[0];
        };


        randomConfig.boxSize = string.randRange(100, 200);
        randomConfig.headerColor = getRandomColor();
        randomConfig.backgroundImg = getRandomBgImg();

        const PrizeListCount = string.randRange(3, 5);
        const prizeList = [];
        let cardListCount = 0;
        for (let i = 0; i < PrizeListCount; i += 1) {
            const prize_sn = string.getRandomString(10);
            const prizeInfo = getRandomPrize().split(':');
            const prizeCount = string.randRange(1, 8);
            cardListCount += prizeCount;

            prizeList.push({
                sn: prize_sn,
                title: prizeInfo[0],
                desc: prizeInfo[1],
                audio: false,
                cnt: prizeCount,
                del: false,
            });
        }

        cardListCount += string.randRange(1, 10);

        const cardList = [];
        for (let i = 0; i < cardListCount; i += 1) {
            const card_sn = string.getRandomString(10);
            const card_title = getRandomCardTitle();
            const card_img = getRandomCardImg();
            cardList.push({
                sn: card_sn,
                img: card_img,
                title: card_title,
                showTitleFlag: true,
                note: '',
                del: false,
            });
        }

        state.config = {
            ...randomConfig,
        };

        state.prizeList = prizeList;
        state.cardList = cardList;
    },

    setL10n(state, params){
        if (!!params) {
            for (const key in params) {
                if (typeof state[key] !== 'undefined') {
                    state[key] = JSON.parse(JSON.stringify(params[key]));
                }
            }
        }
    },
};
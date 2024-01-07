export default {
    adBlocked: (state) => state.adBlocked,
    isTutorial: (state) => state.isTutorial,

    langOptions: (state) => state.langOptions,

    defaultConfig: (state) => state.defaultConfig,
    defaultCardInfo: (state) => state.defaultCardInfo,

    config: (state) => state.config,

    PageSetting_width: (state) => state.PageSetting_width,
    PageSetting_mode_type: (state) => state.PageSetting_mode_type,

    triggerOpenCardList: (state) => state.triggerOpenCardList,
    triggerOpenPrizeList: (state) => state.triggerOpenPrizeList,
    triggerOpenResult: (state) => state.triggerOpenResult,
    triggerOpenSetting: (state) => state.triggerOpenSetting,

    drawCardChooseList: (state) => state.drawCardChooseList,

    cardList: (state) => state.cardList,
    cardListMapping: (state) => {
        const cardListMapping = {};
        state.cardList.forEach((cardInfo) => {
            if (cardInfo.del === false) {
                cardListMapping[cardInfo.sn] = cardInfo;
            }
        });
        return cardListMapping;
    },
    waitCardSN: (state) => {
        const cardList = JSON.parse(JSON.stringify(state.cardList));
        const prizeList = JSON.parse(JSON.stringify(state.prizeList));
        const prizeCardMapping = JSON.parse(JSON.stringify(state.prizeCardMapping));

        let waitCardSN = [];
        cardList.forEach((cardInfo) => {
            if (cardInfo.del === false) {
                waitCardSN.push(cardInfo.sn);
            }
        });

        prizeList.forEach((prizeInfo) => {
            if (prizeInfo.del === false) {
                if (typeof prizeCardMapping[prizeInfo.sn] !== 'undefined' && Array.isArray(prizeCardMapping[prizeInfo.sn])) {
                    const prizeCardSN = prizeCardMapping[prizeInfo.sn];
                    waitCardSN = waitCardSN.filter((e) => prizeCardSN.indexOf(e) === -1);
                }
            }
        });
        return waitCardSN;
    },

    validCardList: (state) => {
        let cardList = JSON.parse(JSON.stringify(state.cardList));
        cardList = cardList.filter((cardInfo) => !cardInfo.del);
        return cardList;
    },

    prizeList: (state) => state.prizeList,
    validPrizeList: (state) => {
        let prizeList = JSON.parse(JSON.stringify(state.prizeList));
        prizeList = prizeList.filter((prizeInfo) => [false, 'false'].includes(prizeInfo.del));
        return prizeList;
    },

    prizeCardMapping: (state) => state.prizeCardMapping,

    lockDrawItByPrizeSN: (state) => state.lockDrawItByPrizeSN,

    playWinnerAudio: (state) => state.playWinnerAudio,
    winnerAudio: (state) => state.winnerAudio,

    L10nStorage: (state) => state.L10nStorage,

    randomBgImg: (state) => state.randomBgImg,
    randomPrize: (state) => state.randomPrize,
    randomCardTitle: (state) => state.randomCardTitle,
    randomCardImg: (state) => state.randomCardImg,
};
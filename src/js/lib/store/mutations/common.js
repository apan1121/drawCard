export default {
    initSystem(state, params) {
        let defaultConfig = JSON.parse( JSON.stringify( state.defaultConfig) );
        let drawCards = JSON.parse(localStorage.getItem('drawCardsSetting'));

        let config = {};
        let cardList = [];
        let prizeList = [];
        if (!!drawCards) {
            config = drawCards.config || {};
            cardList = drawCards.cardList || [];
            prizeList = drawCards.prizeList || [];
        }

        if ( typeof config != "object") {
            config = {};
        }

        if (!Array.isArray(cardList)) {
            cardList = [];
        }

        if (!Array.isArray(prizeList)) {
            prizeList = [];
        }

        state.config = {...defaultConfig, ...config};
        state.cardList = cardList;
        state.prizeList = prizeList;
    },

    saveToLocalStorage(state, params) {
        let config = JSON.parse( JSON.stringify( state.config) );
        let cardList = JSON.parse( JSON.stringify( state.cardList) );
        let prizeList = JSON.parse( JSON.stringify( state.prizeList) );


        let drawCards= {
            config: config,
            cardList: cardList,
            prizeList: prizeList,
        };

        localStorage.setItem('drawCardsSetting', JSON.stringify(drawCards));
    },

    triggerOpenCardListModal(state, params) {
        state.triggerOpenCardList = new Date().getTime();
    },
    triggerOpenPrizeListModal(state, params) {
        state.triggerOpenPrizeList = new Date().getTime();
    },

    saveAddCard(state, params) {
        let cardList = JSON.parse( JSON.stringify( state.cardList) );

        let cardInfo = {
            sn: cardList.length,
            title: params.cardInfo.title,
            img: params.cardInfo.img,
        };
        cardList.push({
            sn: cardList.length,
            title: params.cardInfo.title,
            img: params.cardInfo.img,
            del: false,
        });

        state.cardList = cardList;
    },
    saveEditCard(state, params) {
        let cardList = JSON.parse( JSON.stringify( state.cardList) );

        let cardInfo = {
            sn: params.cardInfo.sn,
            title: params.cardInfo.title,
            img: params.cardInfo.img,
        };

        cardList[ cardInfo.sn ] = cardInfo;
        state.cardList = cardList;
    },
    delCardBySN(state, params) {
        let cardList = JSON.parse( JSON.stringify( state.cardList) );
        cardList[ params.sn].del = true;
        state.cardList = cardList;
    },

    saveAddPrize(state, params) {
        let prizeList = JSON.parse( JSON.stringify( state.prizeList) );

        let prizeInfo = {
            sn: prizeList.length,
            title: params.prizeInfo.title,
            cnt: params.prizeInfo.cnt,
            cardIds:[],
            del: false,
        };
        prizeList.push(prizeInfo);

        state.prizeList = prizeList;
    },

    saveEditPrize(state, params) {
        let prizeList = JSON.parse( JSON.stringify( state.prizeList) );

        let prizeInfo = {
            ...prizeList[ params.prizeInfo.sn ],
            title: params.prizeInfo.title,
            cnt: params.prizeInfo.cnt,
        };
        prizeList[ params.prizeInfo.sn ] = prizeInfo;
        state.prizeList = prizeList;
    },

    delEditPrize(state, params) {
        let prizeList = JSON.parse( JSON.stringify( state.prizeList) );
        prizeList[ params.sn ].del = true;
        state.prizeList = prizeList;
    },

    lockDrawIt(state, params) {
        state.lockDrawIt = params;
    },

    setCardIdsByPrizeSN(state, params){
        let prizeList = JSON.parse( JSON.stringify( state.prizeList) );

        for (var i in prizeList) {
            console.log(prizeList[i].sn , );
            if (prizeList[i].sn == params.sn) {
                prizeList[i].cardIds = params.cardIds;
            }
        }

        state.prizeList = prizeList;
    }
}
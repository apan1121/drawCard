export default {
    config: state => state.config,

    triggerOpenCardList: state => state.triggerOpenCardList,
    triggerOpenPrizeList: state => state.triggerOpenPrizeList,

    cardList: state => state.cardList,
    prizeList: state => state.prizeList,

    validCardList: function(state){
        let cardList = JSON.parse( JSON.stringify( state.cardList) );
        let validCardList = cardList.filter(function(cardInfo){
            return !cardInfo.del;
        });
        return validCardList;
    },
    validPrizeList: function(state){
        let prizeList = JSON.parse( JSON.stringify( state.prizeList) );
        let validPrizeList = prizeList.filter(function(prizeInfo){
            return !prizeInfo.del;
        });
        return validPrizeList;
    },
    waitCardSN: function(state){
        let prizeList = JSON.parse( JSON.stringify( state.prizeList) );
        let cardList = JSON.parse( JSON.stringify( state.cardList) );

        let awardCardSN = prizeList.reduce(function(cardSN, data){
            return cardSN.concat(data.cardIds);
        }, []);

        let cardSN = cardList.filter(function(data){
            return !awardCardSN.includes(data.sn);
        }).map(function(data){
            return data.sn;
        });
        return cardSN;
    },

    lockDrawIt: state => state.lockDrawIt,
}
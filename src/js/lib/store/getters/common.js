export default {
    config: state => state.config,

    triggerOpenCardList: state => state.triggerOpenCardList,
    triggerOpenPrizeList: state => state.triggerOpenPrizeList,
    triggerOpenResult: state => state.triggerOpenResult,
    triggerOpenSetting: state => state.triggerOpenSetting,

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
    cardListByPrize: function(state){
        let cardList = JSON.parse( JSON.stringify( state.cardList) );
        let validCardList = {};
        cardList.forEach(function(cardInfo){
            if (!cardInfo.del) {
                cardInfo.award = [];
                validCardList[ cardInfo.sn ] = cardInfo;
            }
        });

        let prizeList = JSON.parse( JSON.stringify( state.prizeList) );
        prizeList.forEach(function(prizeInfo){
            if (!prizeInfo.del){
                prizeInfo.cardIds.forEach(function(cardSN){
                    validCardList[cardSN].award.push( prizeInfo.title );
                });
            }
        });


        let output = [];
        for (let sn in validCardList) {
            output.push( validCardList[sn] );
        }
        return output;
    },

    lockDrawIt: state => state.lockDrawIt,
}
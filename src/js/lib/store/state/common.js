export default {
    test: false,

    triggerOpenCardList: null,
    triggerOpenPrizeList: null,
    triggerOpenResult: null,
    triggerOpenSetting: null,

    defaultConfig: {
        webTitle: "Draw Card",
        boxSize: 200,
        headerColor: '#343a40',
        backgroundImg: '',
        backgroundOpacity: 0.5,
        randomDrawWait: 80,
        drawNextWait: 1000,
    },

    config: {
        webTitle: "Draw Card",
        boxSize: 200,
        headerColor: '#343a40',
        backgroundImg: '',
        backgroundOpacity: 0.5,
        randomDrawWait: 80,
        drawNextWait: 1000,
    },

    winnerAudio: {
        winner1: "winner1.mp3",
        winner2: "winner2.mp3",
        winner3: "winner3.mp3",
        winner4: "winner4.mp3",
        winner5: "winner5.mp3",
    },

    cardList: [],
    prizeList: [],

    lockDrawIt: false,
}
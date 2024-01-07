export default {
    adBlocked: false,
    isTutorial: false,

    langOptions: {
        'zh-TW': '中文',
        en: 'English',
    },

    defaultConfig: {
        webTitle: 'Draw Card',
        PrizeTitleColor: '#212529',
        PrizeDescColor: '#FFF',
        PrizeDescBgColor: '#900',
        boxSize: 200,
        boxFontSize: 16,
        headerColor: '#343a40',
        backgroundImg: '',
        backgroundOpacity: 0.5,
        randomDrawWait: 80,
        drawNextWait: 1000,
    },

    defaultCardInfo: {
        sn: '',
        img: '',
        title: '',
        showTitleFlag: false,
        note: '',
        del: false,
    },

    config: {
        webTitle: 'Draw Card',
        PrizeTitleColor: '#212529',
        PrizeDescColor: '#FFF',
        PrizeDescBgColor: '#900',
        boxSize: 200,
        boxFontSize: 16,
        headerColor: '#343a40',
        backgroundImg: '',
        backgroundOpacity: 0.5,
        randomDrawWait: 80,
        drawNextWait: 1000,
    },

    triggerOpenCardList: null,
    triggerOpenPrizeList: null,
    triggerOpenResult: null,
    triggerOpenSetting: null,

    drawCardFocusKey: false,

    /**
     * 初始選擇列表
     */
    drawCardChooseList: [],

    /**
     * 卡片列表
     */
    cardList: [],

    /**
     * 獎項列表
     */
    prizeList: [],

    /**
     * 鎖定正在收講的 PrizeSN
     */
    lockDrawItByPrizeSN: false,

    prizeCardMapping: {},

    playWinnerAudio: false,
    winnerAudio: {
        winner1: 'winner1.mp3',
        winner2: 'winner2.mp3',
        winner3: 'winner3.mp3',
        winner4: 'winner4.mp3',
        winner5: 'winner5.mp3',
    },

    /**
     * 亂數
     */
    randomPrize: 'iPhone:最新款高階手機,iPad:最新款高階平板,Apple Watch:最新款數位手錶,MacBook Pro::最新款筆電,1000元獎金:加菜金,3000元獎金:加菜金,5000元獎金:加菜金,10000元獎金:加菜金,百貨公司 1000 禮券:購物金,百貨公司 2000 禮券:購物金,百貨公司 5000 禮券:購物金,Dyson電風扇:高級風扇兌換券,冰箱:兌換券一張,冷氣:兌換券一張,電鍋:兌換券一張,氣炸鍋:兌換券一張,微波爐:兌換券一張,烤箱:兌換券一張,60吋電視:兌換券一張,升降桌:兌換券一張,麻將:兌換券一張,降噪耳機:兌換券一張,80萬房車:兌換券一張,關島五日遊:機加酒旅遊金,北海道十日遊:機加酒旅遊金,綠島兩日遊:機加酒旅遊金,太平島一日遊:旅遊金,百貨公司餐券:知名百貨餐券,星巴克禮券:餐券,飯店住宿券:餐券,電影票兩張:兌換券兩張,高級腕表:戴在手腕上的錶,特休五天:帶薪休假,外接硬碟:兌換券一張,抱枕:兌換券一張,西提牛排:兌換券一張,衛生紙兩條:兌換券一張,A4紙一箱:兌換券一張,雞蛋一盒:兌換券一張,神戶牛排:兌換券一張,高麗菜一顆:兌換券一張,戰斧豬排:兌換券一張,黃金一兩:兌換券一張,健康檢查:兌換券一張,Switch:兌換券一張,PS5:兌換券一張,公司股票1張:兌換券一張,透氣風衣:兌換券一張,跑鞋:兌換券一張,行李箱:兌換券一張,50年陳釀酒:兌換券一張',
    randomCardTitle: 'Olivia,Liam,Emma,Noah,Ava,Isabella,Sophia,Jackson,Lucas,Mia,Aiden,Riley,Ethan,Aria,Madison,Ella,Logan,Grace,Lily,Oliver,Avery,Elijah,Scarlett,Chloe,Sebastian,Zoe,Layla,Harper,Caleb,Mason,Amelia,Benjamin,Abigail,Samuel,Evelyn,Henry,Addison,Aubrey,Nicholas,Natalie,Owen,Brooklyn,Hannah,Grayson,Victoria,Julian,Alexis,Stella,Levi,Savannah,Zoey,Landon,Aurora,Wyatt,Penelope,Lincoln,Paisley,Jack,Ellie,Matthew,Leo,Nora,Jayden,Skylar,Lucy,David,Kennedy,Joseph,Samantha,Isaac,Maria,Dylan,Aaliyah,Luke,Anna,Gabriel,Hailey,Anthony,Andrew,Kinsley,Xavier,Maya,Joshua,Audrey,Dominic,Autumn,Christopher,Claire,Samuel,Ariana,Christian,Gabriella,Elena,Max,Madelyn,Bailey,Hazel,Ruby,Adam,Lauren,Piper,Carson,Ian,Nova,Jasmine,Hudson,Sadie,Zachary,Isla,Nolan,Cameron,Eva,Carter,Lincoln,Isabelle,Vivian,Leo,Scarlett,Lauren,Eli,Piper,Carson,Grace,Ian,Nova,Xavier,Jasmine,Hudson,Sadie,Zachary,Isla,Nolan,Cameron,Eva,Carter,Lincoln,Isabelle,Vivian,Blake,Quinn,Emma,Avery,Liam,Ella,Aria,Zoe,Leo,Isaac,Aurora,Eva,Lucas,Nora,Mia,Riley,Owen,Eli,Scarlett,Lily,Lincoln,Noah,Sophia,Layla,Caleb,Jack,Maya,Aiden,Madison,Oliver,Luke,Harper,Landon,Amelia,Evelyn,Chloe,Samuel,Addison,Logan,Abigail,Charlotte,Aria,Ethan,Grace,Zachary,Anna,Henry,Skylar,Hailey,Nicholas,Leah,Sebastian,Savannah,Dylan,Aria,Claire,Lily,Nathan,Emily,Mia,Grace,Aubrey,Landon,Aria,Hannah,Jackson,Olivia,Lucas,Samuel,Jayden,Lily,Logan,Sophia,Isaac,Leo,Emma,Landon,Maya,Ethan,Lily,Jackson,Aria,Charlotte,Chloe,Addison,Scarlett,Elijah,Zoey,Henry,Avery,Mia,Riley,Oliver,Grace,Harper,Amelia,Madison,Ava,Ella,Liam,Levi,Lucas,Sebastian,Hazel,Sophia,Emily,Aiden,Evelyn,Owen,Isabella,Caleb,Jack,Samuel,Lily,Nora,Chloe,Mia,Noah,Sophia,Aria,Liam,Emma,Ella,Ava,Isabella,Olivia,Lily,Emily,Sophia,Mia,Ava,Olivia,Emma,Liam,Noah,Elijah,Oliver,Aiden,Caden,Jackson,Lucas,Logan,Ethan,Mason,Isaac,Liam,Noah,Elijah,Oliver,Aiden,Caden,Jackson,Lucas,Logan,Ethan,Mason,Isaac,Liam,Noah,Elijah,Oliver,Aiden,Caden,Jackson,Lucas,Logan,Ethan,Mason,Isaac',
    randomCardImg: 'https://cdn2.thecatapi.com/images/1u4.jpg,https://cdn2.thecatapi.com/images/2fk.png,https://cdn2.thecatapi.com/images/774.jpg,https://cdn2.thecatapi.com/images/7jg.jpg,https://cdn2.thecatapi.com/images/86a.jpg,https://cdn2.thecatapi.com/images/bl8.jpg,https://cdn2.thecatapi.com/images/chk.jpg,https://cdn2.thecatapi.com/images/MTUwNTk4NQ.gif,https://cdn2.thecatapi.com/images/MTYwNDgxNg.jpg,https://cdn2.thecatapi.com/images/hBXicehMA.jpg,https://cdn2.thecatapi.com/images/49f.gif,https://cdn2.thecatapi.com/images/a6a.jpg,https://cdn2.thecatapi.com/images/bh3.jpg,https://cdn2.thecatapi.com/images/eft.jpg,https://cdn2.thecatapi.com/images/MTY4OTA3OQ.jpg,https://cdn2.thecatapi.com/images/MTc3NTMyNg.jpg,https://cdn2.thecatapi.com/images/MTgwODA3MA.jpg,https://cdn2.thecatapi.com/images/MjA0MTQyNg.jpg,https://cdn2.thecatapi.com/images/MjA3NzYxNQ.jpg,https://cdn2.thecatapi.com/images/bqTGCEECv.jpg,https://cdn2.thecatapi.com/images/go.jpg,https://cdn2.thecatapi.com/images/1n7.jpg,https://cdn2.thecatapi.com/images/7ne.jpg,https://cdn2.thecatapi.com/images/9df.jpg,https://cdn2.thecatapi.com/images/9ju.jpg,https://cdn2.thecatapi.com/images/e8k.jpg,https://cdn2.thecatapi.com/images/ed4.jpg,https://cdn2.thecatapi.com/images/ixXGyLmIW.jpg,https://cdn2.thecatapi.com/images/2-AuRFDa9.jpg,https://cdn2.thecatapi.com/images/62Onx4gRb.jpg,https://cdn2.thecatapi.com/images/d7.gif,https://cdn2.thecatapi.com/images/4b2.gif,https://cdn2.thecatapi.com/images/5gr.jpg,https://cdn2.thecatapi.com/images/9or.jpg,https://cdn2.thecatapi.com/images/cbp.jpg,https://cdn2.thecatapi.com/images/dav.jpg,https://cdn2.thecatapi.com/images/dbc.gif,https://cdn2.thecatapi.com/images/dpp.jpg,https://cdn2.thecatapi.com/images/e1e.jpg,https://cdn2.thecatapi.com/images/MTg5NjEwOA.jpg,https://cdn2.thecatapi.com/images/m4.jpg,https://cdn2.thecatapi.com/images/301.jpg,https://cdn2.thecatapi.com/images/4o0.jpg,https://cdn2.thecatapi.com/images/5vm.jpg,https://cdn2.thecatapi.com/images/6r8.jpg,https://cdn2.thecatapi.com/images/9eu.jpg,https://cdn2.thecatapi.com/images/a9t.gif,https://cdn2.thecatapi.com/images/b99.jpg,https://cdn2.thecatapi.com/images/MTU2MzU1Mg.jpg,https://cdn2.thecatapi.com/images/sDns8AQGz.jpg',
    randomColor: '#85D96B,#7A2700,#DFD482,#403BDB,#2626C4,#24B1BA,#A88056,#75215F,#4D8441,#920BF3,#06240A,#80A183,#4122EF,#317613,#114A42,#3139AD,#920881,#5C5E42,#4092AF,#14719F,#342280,#D40C48,#8F44CD,#5D3220,#98405D,#EB243D,#3A1FA6,#4DA1B7,#4F1774,#533489',
    randomBgImg: ',,,,,,https://i.imgur.com/fAjZSBu.jpeg,https://i.imgur.com/OWxB9yc.jpeg,https://i.imgur.com/HpGLGxS.png,https://i.imgur.com/icBnFXZ.jpeg,https://i.imgur.com/jWQBfJY.jpeg,https://i.imgur.com/UEhS7e8.jpeg,https://i.imgur.com/xKi1E4U.jpeg,https://i.imgur.com/car6vRJ.jpeg,https://i.imgur.com/3UsU1vC.jpeg,https://i.imgur.com/DAqlYwh.jpeg,https://i.imgur.com/i3WoA1A.png,https://i.imgur.com/qMMJnNn.jpeg,https://i.imgur.com/P4BIfKe.jpeg,https://i.imgur.com/rnpsd4E.jpeg,https://i.imgur.com/z4zVvX1.jpeg,https://i.imgur.com/kf7tkok.jpeg,https://i.imgur.com/Mnwr2x1.jpeg,https://i.imgur.com/qsqF8vr.jpeg,https://i.imgur.com/HiYxOs6.jpeg,https://i.imgur.com/nPfD8cm.jpeg,https://i.imgur.com/JdaVmOO.png,https://i.imgur.com/5yeBVeM.jpeg,https://i.imgur.com/dCS4tQk.jpeg,https://i.imgur.com/9wHVhck.jpeg,https://i.imgur.com/ZqoEU9o.jpeg,https://i.imgur.com/yD5I5WH.jpeg,https://i.imgur.com/JKNnuSE.jpeg,https://i.imgur.com/YwAmPYu.jpeg,https://i.imgur.com/T7NBjJm.jpeg,https://i.imgur.com/ujJ3g1k.jpeg,https://i.imgur.com/6Q9rDjW.jpeg,https://i.imgur.com/zfU3vsM.jpeg,https://i.imgur.com/pDLPvFj.jpeg,https://i.imgur.com/pDLPvFj.jpeg,https://i.imgur.com/YWgcovn.jpeg,https://i.imgur.com/L07HyvL.jpeg,https://i.imgur.com/ZyNbQn6.jpeg,https://i.imgur.com/JGFRHHa.jpeg,https://i.imgur.com/H8IpPH2.jpeg,https://i.imgur.com/oCsPYGj.png,https://i.imgur.com/X6Iu6iB.jpeg,https://i.imgur.com/B1AZqOb.jpeg,https://i.imgur.com/e10uiOY.png,https://i.imgur.com/j9jfxqt.png,https://i.imgur.com/SukExBO.png,https://i.imgur.com/Hjmsizi.png,https://i.imgur.com/c5NvSCc.jpeg,https://i.imgur.com/9WAotEY.jpeg,https://i.imgur.com/7VHqY7X.jpeg',

    randomConfig: {
        webTitle: 'Draw Card',
        boxSize: 200,
        headerColor: '#343a40',
        PrizeDescColor: '#FFF',
        PrizeDescBgColor: '#900',
        backgroundImg: '',
        backgroundOpacity: 0.5,
        randomDrawWait: 80,
        drawNextWait: 1000,
    },
};
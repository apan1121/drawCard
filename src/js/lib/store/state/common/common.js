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
        boxFontColor: '#FFF',
        boxFontBgColor: '#000',
        boxFontBgOpacity: 0.8,
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
        boxFontColor: '#FFF',
        boxFontBgColor: '#000',
        boxFontBgOpacity: 0.8,
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
    randomCardImg: 'https://cdn2.thecatapi.com/images/1u4.jpg,https://cdn2.thecatapi.com/images/2fk.png,https://cdn2.thecatapi.com/images/774.jpg,https://cdn2.thecatapi.com/images/7jg.jpg,https://cdn2.thecatapi.com/images/86a.jpg,https://cdn2.thecatapi.com/images/bl8.jpg,https://cdn2.thecatapi.com/images/chk.jpg,https://cdn2.thecatapi.com/images/MTUwNTk4NQ.gif,https://cdn2.thecatapi.com/images/MTYwNDgxNg.jpg,https://cdn2.thecatapi.com/images/hBXicehMA.jpg,https://cdn2.thecatapi.com/images/49f.gif,https://cdn2.thecatapi.com/images/a6a.jpg,https://cdn2.thecatapi.com/images/bh3.jpg,https://cdn2.thecatapi.com/images/eft.jpg,https://cdn2.thecatapi.com/images/MTY4OTA3OQ.jpg,https://cdn2.thecatapi.com/images/MTc3NTMyNg.jpg,https://cdn2.thecatapi.com/images/MTgwODA3MA.jpg,https://cdn2.thecatapi.com/images/MjA0MTQyNg.jpg,https://cdn2.thecatapi.com/images/MjA3NzYxNQ.jpg,https://cdn2.thecatapi.com/images/bqTGCEECv.jpg,https://cdn2.thecatapi.com/images/go.jpg,https://cdn2.thecatapi.com/images/1n7.jpg,https://cdn2.thecatapi.com/images/7ne.jpg,https://cdn2.thecatapi.com/images/9df.jpg,https://cdn2.thecatapi.com/images/9ju.jpg,https://cdn2.thecatapi.com/images/e8k.jpg,https://cdn2.thecatapi.com/images/ed4.jpg,https://cdn2.thecatapi.com/images/ixXGyLmIW.jpg,https://cdn2.thecatapi.com/images/2-AuRFDa9.jpg,https://cdn2.thecatapi.com/images/62Onx4gRb.jpg,https://cdn2.thecatapi.com/images/d7.gif,https://cdn2.thecatapi.com/images/4b2.gif,https://cdn2.thecatapi.com/images/5gr.jpg,https://cdn2.thecatapi.com/images/9or.jpg,https://cdn2.thecatapi.com/images/cbp.jpg,https://cdn2.thecatapi.com/images/dav.jpg,https://cdn2.thecatapi.com/images/dbc.gif,https://cdn2.thecatapi.com/images/dpp.jpg,https://cdn2.thecatapi.com/images/e1e.jpg,https://cdn2.thecatapi.com/images/MTg5NjEwOA.jpg,https://cdn2.thecatapi.com/images/m4.jpg,https://cdn2.thecatapi.com/images/301.jpg,https://cdn2.thecatapi.com/images/4o0.jpg,https://cdn2.thecatapi.com/images/5vm.jpg,https://cdn2.thecatapi.com/images/6r8.jpg,https://cdn2.thecatapi.com/images/9eu.jpg,https://cdn2.thecatapi.com/images/a9t.gif,https://cdn2.thecatapi.com/images/b99.jpg,https://cdn2.thecatapi.com/images/MTU2MzU1Mg.jpg,https://cdn2.thecatapi.com/images/sDns8AQGz.jpg,https://images.dog.ceo/breeds/spaniel-blenheim/n02086646_3565.jpg,https://images.dog.ceo/breeds/terrier-bedlington/n02093647_3453.jpg,https://images.dog.ceo/breeds/spaniel-blenheim/n02086646_1733.jpg,https://images.dog.ceo/breeds/terrier-dandie/n02096437_1790.jpg,https://images.dog.ceo/breeds/terrier-scottish/n02097298_15251.jpg,https://images.dog.ceo/breeds/hound-walker/n02089867_2950.jpg,https://images.dog.ceo/breeds/terrier-american/n02093428_17332.jpg,https://images.dog.ceo/breeds/shiba/shiba-9.jpg,https://images.dog.ceo/breeds/borzoi/n02090622_7677.jpg,https://images.dog.ceo/breeds/komondor/n02105505_3380.jpg,https://images.dog.ceo/breeds/germanshepherd/n02106662_22854.jpg,https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_338.jpg,https://images.dog.ceo/breeds/terrier-fox/n02095314_591.jpg,https://images.dog.ceo/breeds/hound-english/n02089973_1516.jpg,https://images.dog.ceo/breeds/eskimo/n02109961_12118.jpg,https://images.dog.ceo/breeds/labrador/n02099712_6619.jpg,https://images.dog.ceo/breeds/vizsla/n02100583_13353.jpg,https://images.dog.ceo/breeds/terrier-norfolk/n02094114_3477.jpg,https://images.dog.ceo/breeds/poodle-miniature/n02113712_3207.jpg,https://images.dog.ceo/breeds/pug/n02110958_12224.jpg,https://images.dog.ceo/breeds/husky/n02110185_3589.jpg,https://images.dog.ceo/breeds/malamute/n02110063_14591.jpg,https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_7702.jpg,https://images.dog.ceo/breeds/hound-english/n02089973_2810.jpg,https://images.dog.ceo/breeds/retriever-flatcoated/n02099267_921.jpg,https://images.dog.ceo/breeds/pinscher-miniature/n02107312_1716.jpg	,https://images.dog.ceo/breeds/doberman/n02107142_5663.jpg,https://images.dog.ceo/breeds/bulldog-french/n02108915_4160.jpg,https://images.dog.ceo/breeds/poodle-toy/n02113624_9828.jpg,https://images.dog.ceo/breeds/schnauzer-giant/n02097130_2821.jpg,https://images.dog.ceo/breeds/bulldog-french/n02108915_11220.jpg,https://images.dog.ceo/breeds/terrier-tibetan/n02097474_5523.jpg,https://images.dog.ceo/breeds/spaniel-sussex/n02102480_4415.jpg,https://images.dog.ceo/breeds/poodle-miniature/n02113712_3049.jpg,https://images.dog.ceo/breeds/lhasa/n02098413_932.jpg,https://images.dog.ceo/breeds/poodle-standard/n02113799_7092.jpg,https://images.dog.ceo/breeds/affenpinscher/n02110627_11783.jpg,https://images.dog.ceo/breeds/vizsla/n02100583_854.jpg,https://images.dog.ceo/breeds/briard/n02105251_8210.jpg,https://images.dog.ceo/breeds/dhole/n02115913_3740.jpg,https://images.dog.ceo/breeds/tervuren/maverick.jpg,https://images.dog.ceo/breeds/dingo/n02115641_2041.jpg,https://images.dog.ceo/breeds/clumber/n02101556_5831.jpg,https://images.dog.ceo/breeds/terrier-american/n02093428_13615.jpg,https://images.dog.ceo/breeds/hound-walker/n02089867_1412.jpg,https://images.dog.ceo/breeds/lhasa/n02098413_4033.jpg,https://images.dog.ceo/breeds/hound-ibizan/n02091244_2323.jpg,https://images.dog.ceo/breeds/bluetick/n02088632_109.jpg,https://images.dog.ceo/breeds/basenji/n02110806_839.jpg,https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191126134713895_COVER.jpg,https://images.dog.ceo/breeds/hound-afghan/n02088094_272.jpg,https://images.dog.ceo/breeds/saluki/n02091831_725.jpg,https://images.dog.ceo/breeds/pointer-germanlonghair/hans4.jpg,https://images.dog.ceo/breeds/spaniel-irish/n02102973_377.jpg,https://images.dog.ceo/breeds/setter-gordon/n02101006_4203.jpg,https://images.dog.ceo/breeds/poodle-toy/n02113624_6683.jpg,https://images.dog.ceo/breeds/mix/puma01.jpg,https://images.dog.ceo/breeds/lhasa/n02098413_1522.jpg,https://images.dog.ceo/breeds/pointer-german/n02100236_911.jpg,https://images.dog.ceo/breeds/husky/n02110185_14289.jpg,https://images.dog.ceo/breeds/dhole/n02115913_1631.jpg,https://images.dog.ceo/breeds/airedale/n02096051_5067.jpg,https://images.dog.ceo/breeds/newfoundland/n02111277_11934.jpg,https://images.dog.ceo/breeds/germanshepherd/n02106662_20546.jpg,https://images.dog.ceo/breeds/labradoodle/lola.jpg,https://images.dog.ceo/breeds/setter-gordon/n02101006_3748.jpg,https://images.dog.ceo/breeds/hound-afghan/n02088094_1222.jpg,https://images.dog.ceo/breeds/saluki/n02091831_3254.jpg,https://images.dog.ceo/breeds/bluetick/n02088632_562.jpg,https://images.dog.ceo/breeds/entlebucher/n02108000_364.jpg,https://images.dog.ceo/breeds/terrier-tibetan/n02097474_8609.jpg,https://images.dog.ceo/breeds/rottweiler/n02106550_4138.jpg,https://images.dog.ceo/breeds/terrier-norfolk/n02094114_3928.jpg,https://images.dog.ceo/breeds/terrier-norwich/n02094258_3287.jpg,https://images.dog.ceo/breeds/buhund-norwegian/hakon2.jpg,https://images.dog.ceo/breeds/bulldog-english/jager-2.jpg,https://images.dog.ceo/breeds/keeshond/n02112350_8341.jpg,https://images.dog.ceo/breeds/pekinese/n02086079_22412.jpg,https://images.dog.ceo/breeds/spaniel-sussex/n02102480_5440.jpg,https://images.dog.ceo/breeds/borzoi/n02090622_7409.jpg,https://images.dog.ceo/breeds/newfoundland/n02111277_4710.jpg,https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_949.jpg,https://images.dog.ceo/breeds/setter-gordon/n02101006_2918.jpg,https://images.dog.ceo/breeds/setter-gordon/n02101006_3667.jpg,https://images.dog.ceo/breeds/terrier-lakeland/n02095570_563.jpg,https://images.dog.ceo/breeds/retriever-golden/n02099601_5453.jpg,https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_3188.jpg,https://images.dog.ceo/breeds/terrier-irish/n02093991_50.jpg,https://images.dog.ceo/breeds/terrier-tibetan/n02097474_8666.jpg,https://images.dog.ceo/breeds/terrier-norfolk/n02094114_346.jpg,https://images.dog.ceo/breeds/stbernard/n02109525_11465.jpg,https://images.dog.ceo/breeds/newfoundland/n02111277_3065.jpg,https://images.dog.ceo/breeds/spaniel-sussex/n02102480_2198.jpg,https://images.dog.ceo/breeds/terrier-westhighland/n02098286_2413.jpg,https://images.dog.ceo/breeds/terrier-norwich/n02094258_1947.jpg,https://images.dog.ceo/breeds/lhasa/n02098413_17895.jpg,https://images.dog.ceo/breeds/poodle-miniature/n02113712_2726.jpg,https://images.dog.ceo/breeds/hound-english/n02089973_2300.jpg,https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_7702.jpg,https://images.dog.ceo/breeds/bullterrier-staffordshire/n02093256_264.jpg',
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
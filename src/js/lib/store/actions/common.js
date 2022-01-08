export default {
    initSystem({ commit }, params){
        commit('initSystem', params);
    },

    setConfig({ commit }, params){
        commit('setConfig', params);
    },

    clearAllData({ commit }, params){
        commit('clearAllData', params);
    },

    clearAwardData({ commit }, params){
        commit('clearAwardData', params);
    },

    saveToLocalStorage({ commit }, params){
        commit('saveToLocalStorage', params);
    },

    triggerOpenCardListModal({ commit }, params){
        commit('triggerOpenCardListModal', params);
    },

    triggerOpenPrizeListModal({ commit }, params){
        commit('triggerOpenPrizeListModal', params);
    },

    triggerOpenResultModal({ commit }, params){
        commit('triggerOpenResultModal', params);
    },

    triggerOpenSettingModal({ commit }, params){
        commit('triggerOpenSettingModal', params);
    },

    saveAddCard({ commit }, params){
        commit('saveAddCard', params);
    },

    saveEditCard({ commit }, params){
        commit('saveEditCard', params);
    },

    delCardBySN({ commit }, params){
        commit('delCardBySN', params);
    },

    saveAddPrize({ commit }, params){
        commit('saveAddPrize', params);
    },

    saveEditPrize({ commit }, params){
        commit('saveEditPrize', params);
    },

    delEditPrize({ commit }, params){
        commit('delEditPrize', params);
    },


    lockDrawIt({ commit }, params){
        commit('lockDrawIt', params);
    },

    setCardIdsByPrizeSN({ commit }, params){
        commit('setCardIdsByPrizeSN', params);
    },
};
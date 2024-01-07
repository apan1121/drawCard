const main = {
    storeL10n(state, params){
        const L10nStorage = JSON.parse(JSON.stringify(state.L10nStorage));
        for (const locale in params) {
            const message = params[locale];
            L10nStorage[locale] = {
                ...L10nStorage[locale],
                ...message,
            };
        }
        state.L10nStorage = L10nStorage;
    },
};

export default main;
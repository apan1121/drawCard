import Fingerprint2 from 'fingerprintjs2';
import { getRandomString } from './string';

let mixpanel_module = null;
if (!!window.mixpanel && 1) {
    const fingerprintComponentBlacklist = [
        // 'screenResolution', 'availableScreenResolution',
    ];

    Fingerprint2.get({ detectScreenOrientation: true }, (org_components) => {
        const components = org_components.filter((pair) => !fingerprintComponentBlacklist.includes(pair.key));
        let fingerprint_data = components.map((pair) => pair.value);
        fingerprint_data.push(window.location.hostname + window.location.pathname);
        fingerprint_data = fingerprint_data.join('|');
        const identify = Fingerprint2.x64hash128(fingerprint_data, 31);
        window.mixpanel.identify(identify);
        mixpanel_module.data.identify = identify;
        mixpanel_module.actWaitFunc();
    });

    mixpanel_module = {
        data: {
            identify: '',
            tabId: getRandomString(10),
            data: null,
        },
        waitFunc: [],
        actWaitFunc(){
            if (mixpanel_module.waitFunc.length >= 0) {
                // console.log('actWaitFunc', mixpanel_modul.waitFunc);
                mixpanel_module.waitFunc.forEach((actFunc) => {
                    actFunc();
                });
            }
        },
        track(action, inputData){
            const actionFunc = function(){
                const data = { ...mixpanel_module.data, data: inputData };
                window.mixpanel.track(action, data);
            };

            if (mixpanel_module.data.identify) {
                actionFunc();
            } else {
                mixpanel_module.waitFunc.push(actionFunc);
            }
        },
    };
}
export default mixpanel_module;
// ~/plugins/localStorage.js

import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            storage: window.localStorage,
            reducer(val) {
                return {
                    // 只储存state中的assessmentData
                    // user: val.user
                };
            }
        })(store);
    });
};

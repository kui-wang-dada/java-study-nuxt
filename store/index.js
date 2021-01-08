/** @format */

import createLogger from 'vuex/dist/logger';
const debug = process.env.NODE_ENV !== 'production';
export default {
    state: () => ({
        dialoLoginVisible: false,
        dialoAuthVisible: false
    }),
    getters: {
        token: state => state.user.token,
        userInfo: state => state.user.userInfo
    },
    plugins: debug ? [createLogger()] : [], // 开发环境下显示vuex的状态修改
    mutations: {
        SET_DIALO_LOGIN_VISIBLE(state, data) {
            state.dialoLoginVisible = data;
        },
        SET_DIALO_AUTH_VISIBLE(state, data) {
            state.dialoAuthVisible = data;
        }
    },
    actions: {
        async nuxtServerInit({ commit, dispatch }, { req, store, app }) {
            let token = app.$cookies.get('java_study');
            let res = await dispatch('user/getUserInfo', { token });
            if (res.code !== 0) {
                app.$cookies.remove('java_study');
                await dispatch('user/resetToken');
                console.log(res, '验证失败');
            }
        }
    }
};

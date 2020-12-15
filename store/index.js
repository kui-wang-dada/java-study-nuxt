/** @format */

import createLogger from 'vuex/dist/logger';
const debug = process.env.NODE_ENV !== 'production';
export default {
    state: () => ({}),
    getters: {
        token: state => state.user.token,
        userInfo: state => state.user.userInfo
    },
    plugins: debug ? [createLogger()] : [], // 开发环境下显示vuex的状态修改
    mutations: {},
    actions: {}
};

import { getToken, setToken, removeToken } from '@/utils/auth';

const state = {
    token: getToken(),
    userInfo: {}
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_USERINFO: (state, data) => {
        state.userInfo = data;
    }
};

const actions = {
    // 登录
    async login({ commit }, data) {
        let { params, _this } = data;
        let res = await _this.$api['user/login'](params);
        if (res.code === 0) {
            commit('SET_TOKEN', res.data.token);
            setToken(res.data.token);
        }
        return res;
    },

    // 注册
    async register({ commit }, data) {
        let { params, _this } = data;
        let res = await _this.$api['user/register'](params);
        return res;
    },

    // 用户激活
    async registerActive({ commit }, data) {
        let { params, _this } = data;
        let res = await _this.$api['user/registerActive'](params);
        if (res.code === 0) {
            commit('SET_TOKEN', res.data.token);
            setToken(res.data.token);
        }
        return res;
    },

    // 发送激活邮件
    async sendEmail({ commit }, data) {
        let { params, _this } = data;
        let res = await _this.$api['user/sendEmail'](params);
        return res;
    },

    // 获取用户信息
    async getUserInfo({ commit }, data) {
        let { params, _this } = data;
        let res = await _this.$api['user/findUserByToken'](params);
        if (res.code === 0) {
            commit('SET_USERINFO', res.data);
        }
        return res;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

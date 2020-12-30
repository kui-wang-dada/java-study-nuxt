import { getToken, setToken, removeToken } from '@/utils/auth';
import $api from '@/config/axios/api';

const state = () => ({
    token: '',
    userInfo: {}
});

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
    async login({ commit }, params) {
        let res = await $api['user/login'](params);
        if (res.code === 0) {
            commit('SET_TOKEN', res.data);
            setToken(res.data);
        }
        return res;
    },

    // 注册
    async register({ commit }, params) {
        let res = await $api['user/register'](params);
        return res;
    },

    // 用户激活
    async registerActive({ commit }, params) {
        let res = await $api['user/registerActive'](params);
        if (res.code === 0) {
            commit('SET_TOKEN', res.data);
            setToken(res.data);
        }
        return res;
    },

    // 发送激活邮件
    async sendEmail({ commit }, params) {
        let res = await $api['user/sendEmail'](params);
        return res;
    },

    // 获取用户信息
    async getUserInfo({ commit, dispatch }, params) {
        let res = await $api['user/findUserByToken'](params);
        if (res.code === 0) {
            commit('SET_USERINFO', res.data);
        } else {
            dispatch('resetToken');
        }
    },

    // 获取用户信息
    async userAuth({ commit }, params) {
        let res = await $api['user/userAuth'](params);
        if (res.code === 0) {
        }
        return res;
    },

    // 退出登录
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '');
            commit('SET_USERINFO', '');
            removeToken();
            resolve();
        });
    }
};

export default {
    state,
    mutations,
    actions
};

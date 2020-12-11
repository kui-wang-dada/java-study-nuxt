// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

const state = {
    // token: getToken(),
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
    // user login
    // login({ commit }, userInfo) {
    //   const { username, password } = userInfo
    //   return new Promise((resolve, reject) => {
    //     login({ userName: username.trim(), password: password }).then(response => {
    //       const { data } = response
    //       commit('SET_TOKEN', data.token)
    //       setToken(data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登录
    async login({ commit }, data) {
        let { params, _this } = data;
        let res = await _this.$api['user/login'](params);
        if (res.code === 0) {
            commit('SET_USERINFO', res.data);
        }
        return res;
    },

    // 注册
    async register({ commit }, data) {
        let { params, _this } = data;
        let res = await _this.$api['user/register'](params);
        // if (res.code === 0) {
        //     commit('SET_USERINFO', res.data);
        // }
        return res;
    },

    // 用户激活
    async registerActive({ commit }, data) {
        let { params, _this } = data;
        let res = await _this.$api['user/registerActive'](params);
        return res;
    },

    // 发送激活邮件
    async sendEmail({ commit }, data) {
        let { params, _this } = data;
        let res = await _this.$api['user/sendEmail'](params);
        return res;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

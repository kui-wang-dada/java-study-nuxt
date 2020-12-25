/** @format */

import $api from '@/config/axios/api';
import * as $utils from '@/utils/index.js';
export default {
    state: () => ({
        homeOne: [],
        homeTwo: [],
        list: []
    }),
    mutations: {
        // 设置用户信息
        SET_HOME_ONE: (state, data) => {
            state.homeOne = data;
        },
        SET_HOME_TWO: (state, data) => {
            state.homeTwo = data;
        },
        SET_LIST: (state, data) => {
            state.list = data;
        }
    },
    actions: {
        //  获取首页文章列表
        async selectHomeList({ commit }, params) {
            let res = await $api['home/selectHomeList'](params);
            if (res.code === 0) {
                commit('SET_LIST', res.data.list);
            }
            return res;
        },

        // 获取首页热门标签
        async selectHotLabel({ commit }) {
            let res = await $api['home/selectHotLabel']();
            if (res.code === 0) {
            }
            return res;
        },

        /**
         * @msg:拿到用户信息
         * @param {type}
         * @return: promise
         */
        async GetHomeServerData(store, { params }) {
            // let params = {
            //     page: 1,
            //     pageSize: 10
            //     // userId:
            // };

            let selectHomeList = $api['home/selectHomeList'](params).catch(() => Promise.resolve({}));
            let [res1] = await Promise.all([selectHomeList]);
            console.log(res1);
            store.commit('SET_LIST', res1.data.list);
        }
    }
};

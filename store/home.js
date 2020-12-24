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
        // 获取首页文章列表
        async selectHomeList({ commit }, params) {
            let res = await $api['home/selectHomeList'](params);
            if (res.code === 0) {
                commit('SET_LIST', res.data.list);
            }
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
        async GetHomeServerData(store, { id }) {
            let dataOne = {
                limit_start: 0,
                limit_page_length: 5
            };

            let dataTwo = {
                limit_start: 0,
                limit_page_length: 5,
                id: id
            };

            let getHomeOne = $api['home/count'](dataOne).catch(() => Promise.resolve({}));
            let getHomeTwo = $api['home/measure'](dataTwo).catch(() => Promise.resolve({}));

            let [res1, res2] = await Promise.all([getHomeOne, getHomeTwo]);

            console.log(res1, res2);

            store.commit('SET_HOME_ONE', res1.message);
            store.commit('SET_HOME_TWO', res2.message);
        }
    }
};

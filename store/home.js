/** @format */

import $api from '@/config/axios/api';
import * as $utils from '@/utils/index.js';
export default {
    state: () => ({
        homeOne: [],
        homeTwo: []
    }),
    mutations: {
        // 设置用户信息
        SET_HOME_ONE: (state, data) => {
            state.homeOne = data;
        },
        SET_HOME_TWO: (state, data) => {
            state.homeTwo = data;
        }
    },
    actions: {
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

            store.commit('SET_HOME_ONE', res1.message);
            store.commit('SET_HOME_TWO', res2.message);
        }
    }
};

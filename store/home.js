/** @format */
import $api from '@/config/axios/api';
export default {
    state: () => ({
        list: [],
        labelList: []
    }),
    mutations: {
        // 文章列表
        SET_LIST: (state, data) => {
            state.list = data;
        },
        // 热门标签
        SET_LABEL_List: (state, data) => {
            state.labelList = data;
        }
    },
    actions: {
        //  获取首页文章列表
        async selectHomeList({ state, commit }, { params }) {
            let res = await $api['home/selectHomeList'](params);
            if (res.code === 0) {
                let list = state.list;
                commit('SET_LIST', list.concat(res.data.list));
            }
        },

        /**
         * @msg:拿到用户信息
         * @param {type}
         * @return: promise
         */
        async GetHomeServerData(store, { params }) {
            let findUserByToken = $api['user/findUserByToken']().catch(() => Promise.resolve({}));
            let selectHomeList = $api['home/selectHomeList'](params).catch(() => Promise.resolve({}));
            let selectHotLabel = $api['home/selectHotLabel']().catch(() => Promise.resolve({}));
            let [res, res1, res2] = await Promise.all([findUserByToken, selectHomeList, selectHotLabel]);

            console.log(res, '=9999');

            // 首页文章
            if (res1.code === 0) {
                store.commit('SET_LIST', res1.data.list);
            }

            // 热门标签
            if (res2.code === 0) {
                store.commit('SET_LABEL_List', res2.data);
            }
        }
    }
};

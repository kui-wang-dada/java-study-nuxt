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

        //  收藏/取消收藏
        async insetCollection({ state, commit }, { params, index }) {
            let res = await $api['home/insetCollection'](params);
            if (res.code === 0) {
                let list = JSON.parse(JSON.stringify(state.list));
                list[index].collection = !list[index].collection;
                commit('SET_LIST', list);
            }
        },

        /**
         * @msg:拿到用户信息
         * @param {type}
         * @return: promise
         */
        async GetHomeServerData(store, { params }) {
            let selectHomeList = $api['home/selectHomeList'](params).catch(() => Promise.resolve({}));
            let selectHotLabel = $api['home/selectHotLabel']().catch(() => Promise.resolve({}));
            let [res1, res2] = await Promise.all([selectHomeList, selectHotLabel]);
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

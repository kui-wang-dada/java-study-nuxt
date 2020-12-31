/** @format */
import $api from '@/config/axios/api';
export default {
    state: () => ({
        list: []
    }),
    mutations: {
        // 资料下载列表
        SET_LIST: (state, data) => {
            state.list = data;
        }
    },
    actions: {
        //  获取资料下载列表
        async selectArticleDownLoad({ state, commit }, { params }) {
            let res = await $api['download/selectArticleDownLoad'](params);
            if (res.code === 0) {
                let list = state.list;
                commit('SET_LIST', list.concat(res.data.list));
            }
        },

        //  点赞/取消取消
        async insetInspire({ state, commit }, { params, index }) {
            let res = await $api['download/insetInspire'](params);
            console.log(res);
            // if (res.code === 0) {
            //     let list = JSON.parse(JSON.stringify(state.list));
            //     list[index].collection = !list[index].collection;
            //     commit('SET_LIST', list);
            // }
        },

        /**
         * @msg:获取列表数据
         * @return: promise
         */
        async GetDownloadServerData(store, { params }) {
            let res = await $api['download/selectArticleDownLoad'](params).catch(() => Promise.resolve({}));
            console.log(res.data, '====-----------+++++=');
            if (res.code === 0) {
                store.commit('SET_LIST', res.data.list);
            }
        }
    }
};

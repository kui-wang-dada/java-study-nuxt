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
                if (params.page > 1) {
                    commit('SET_LIST', list.concat(res.data.list));
                } else {
                    commit('SET_LIST', res.data.list);
                }
            }
        },

        //  点赞/取消点赞
        async insetInspire({ state, commit }, { params, index }) {
            let res = await $api['download/insetInspire'](params);
            if (res.code === 0) {
                let list = JSON.parse(JSON.stringify(state.list));
                list[index].inspireNum = res.data;
                list[index].likeIt = res.msg === '点赞成功' ? true : false;
                commit('SET_LIST', list);
            }
        },

        //  评论点赞/取消点赞
        async commentInspire({ state, commit }, { params, index, c_index }) {
            let res = await $api['download/commentInspire'](params);
            if (res.code === 0) {
                let list = JSON.parse(JSON.stringify(state.list));
                list[index].commentList[c_index].inspireNum = res.data;
                list[index].commentList[c_index].likeIt = res.msg === '点赞成功' ? true : false;
                commit('SET_LIST', list);
            }
        },

        // 评论
        async insetComment({ dispatch }, { params, pageRequest }) {
            let res = await $api['download/insetComment'](params);
            if (res.code === 0) {
                await dispatch('selectArticleDownLoad', { params: pageRequest });
            }
        },

        // 回复评论
        async insetCommentReply({ dispatch }, { params, pageRequest }) {
            let res = await $api['download/insetCommentReply'](params);
            if (res.code === 0) {
                await dispatch('selectArticleDownLoad', { params: pageRequest });
            }
        },

        // 删除评论
        async deleteComment({ dispatch }, { params, pageRequest }) {
            let res = await $api['download/deleteComment'](params);
            if (res.code === 0) {
                await dispatch('selectArticleDownLoad', { params: pageRequest });
            }
        },

        // 删除回复评论
        async deleteCommentReply({ dispatch }, { params, pageRequest }) {
            let res = await $api['download/deleteCommentReply'](params);
            if (res.code === 0) {
                await dispatch('selectArticleDownLoad', { params: pageRequest });
            }
        },

        // 下载资料
        async dataDownLoad({ state, commit, dispatch }, { params, index }) {
            let res = await $api['download/dataDownLoad'](params);
            if (res.code === 0) {
                let list = JSON.parse(JSON.stringify(state.list));
                list[index].downloadNum = res.data.downloadNum;
                commit('SET_LIST', list);
            }
            return res;
        },

        /**
         * @msg:获取列表数据
         * @return: promise
         */
        async GetDownloadServerData(store, { params }) {
            let res = await $api['download/selectArticleDownLoad'](params).catch(() => Promise.resolve({}));
            if (res.code === 0) {
                store.commit('SET_LIST', res.data.list);
            }
        }
    }
};

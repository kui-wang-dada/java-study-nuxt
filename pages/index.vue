<template>
    <div class="mian">
        <list :list="list" :page-request="listQuery" :loading="loading" @loadMore="onLoadMore" @insetCollection="onInsetCollection" />
        <sidebar :labelList="labelList" />
    </div>
</template>

<script>
import list from '@/components/home/list';
import sidebar from '@/components/home/sidebar';
export default {
    components: {
        list,
        sidebar
    },
    data() {
        return {
            // 加载更多loading
            loading: false,

            // 页码及每页条数
            listQuery: {
                page: 1,
                pageSize: 10,
                userId: this.$store.state.user.userInfo.id
            }
        };
    },
    computed: {
        // 文章列表
        list() {
            return this.$store.state.home.list;
        },

        // 热门标签
        labelList() {
            return this.$store.state.home.labelList;
        },

        // token
        getToken() {
            return this.$store.state.user.token;
        },

        // userInfo
        userInfo() {
            return this.$store.state.user.userInfo;
        }
    },
    head() {
        return {
            title: 'java学习网',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'java学习网seo简介'
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: 'java学习网seo关键词'
                }
            ]
        };
    },
    async fetch({ store, params, query }) {
        if (process.client) return;
        let data = {
            page: 1,
            pageSize: 10,
            userId: store.state.user.userInfo.id
        };
        await store.dispatch('home/GetHomeServerData', { params: data });
    },
    mounted() {},
    methods: {
        // 获取首页文章列表
        async getSelectHomeList(query) {
            await this.$store.dispatch('home/selectHomeList', { params: query });
            this.loading = false;
        },

        // 加载更多数据
        onLoadMore(query) {
            this.loading = true;
            this.getSelectHomeList(query);
        },

        // 收藏/取消收藏
        async onInsetCollection(query) {
            if (!this.isLogin()) {
                this.$store.commit('SET_DIALO_LOGIN_VISIBLE', true);
                return;
            }
            let index = query.index; // 当前item 索引
            let params = {
                articleId: query.id,
                articleType: 0,
                userId: this.userInfo.id
            };
            await this.$store.dispatch('home/insetCollection', { params, index });
        },

        // 是否登录
        isLogin() {
            return this.getToken ? true : false;
        }
    }
};
</script>

<style scoped lang="less">
.mian {
    display: flex;
    justify-content: space-between;
}
</style>

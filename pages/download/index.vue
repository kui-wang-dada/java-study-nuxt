<template>
    <div class="mian">
        <list :list="list" @insetInspire="onInsetInspire" />
        <sidebar />
    </div>
</template>

<script>
import list from '@/components/download/list';
import sidebar from '@/components/download/sidebar';
export default {
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
    components: {
        list,
        sidebar
    },
    props: {},
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
            return this.$store.state.download.list;
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
            pageSize: 10
        };
        await store.dispatch('download/GetDownloadServerData', { params: data });
    },
    created() {},
    methods: {
        // 点赞/取消点赞
        async onInsetInspire(query) {
            // if (!this.isLogin()) {
            //     this.$store.commit('SET_DIALO_LOGIN_VISIBLE', true);
            //     return;
            // }
            let index = query.index; // 当前item 索引
            let params = {
                articleId: query.id,
                articleType: 2,
                userId: this.userInfo.id
            };
            await this.$store.dispatch('download/insetInspire', { params, index });
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

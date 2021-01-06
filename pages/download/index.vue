<template>
    <div class="mian">
        <list :list="list" @insetInspire="onInsetInspire" @insetComment="onInsetComment" @showComment="showCommentForm" />
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
            pageSize: 10,
            userId: store.state.user.userInfo.id
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
        },

        // 评论
        async onInsetComment(query) {
            if (!this.isLogin()) {
                this.$store.commit('SET_DIALO_LOGIN_VISIBLE', true);
                return;
            }
            let params = {
                articleId: query.id,
                articleType: 2,
                content: query.content,
                userId: this.userInfo.id
            };
            let pageRequest = this.listQuery;
            await this.$store.dispatch('download/insetComment', { params, pageRequest });
            this.showCommentForm(query.index);
        },

        // 设置评论显示隐藏
        showCommentForm(index) {
            let list = JSON.parse(JSON.stringify(this.list));
            let item = Object.assign({}, list[index]);
            item.isForm = !item.isForm;
            this.$set(list, index, item);
            this.$store.commit('download/SET_LIST', list);
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

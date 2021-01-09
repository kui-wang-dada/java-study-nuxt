<template>
    <div class="mian">
        <list
            :list="list"
            @insetInspire="onInsetInspire"
            @commentInspire="onCommentInspire"
            @showReplyComment="showReplyCommentForm"
            @insetComment="onInsetComment"
            @insetCommentReply="onInsetCommentReply"
            @showComment="showCommentForm"
            @deleteComment="showDeleteConfirm"
            @download="handleConfirm"
            @search="onSearch"
        />
        <sidebar />
    </div>
</template>

<script>
import list from '@/components/download/list';
import sidebar from '@/components/download/sidebar';
import Clipboard from 'clipboard';
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
        // 重置列表数据
        resetList() {
            this.$store.commit('download/SET_LIST', []);
        },

        // 搜索
        async onSearch(e) {
            let params = this.listQuery;
            params.title = e;
            this.resetList();
            await this.$store.dispatch('download/selectArticleDownLoad', { params });
        },

        // 点赞/取消点赞
        async onInsetInspire(query) {
            if (!this.isLogin()) {
                this.$store.commit('SET_DIALO_LOGIN_VISIBLE', true);
                return;
            }
            let index = query.index; // 当前item 索引
            let params = {
                articleId: query.id,
                articleType: 2,
                userId: this.userInfo.id
            };
            await this.$store.dispatch('download/insetInspire', { params, index });
        },

        // 评论点赞/取消点赞
        async onCommentInspire(query) {
            if (!this.isLogin()) {
                this.$store.commit('SET_DIALO_LOGIN_VISIBLE', true);
                return;
            }
            let index = query.index; // 当前item 索引
            let c_index = query.c_index; // 评论item
            let params = {
                commentId: query.id,
                commentType: 2,
                userId: this.userInfo.id
            };
            await this.$store.dispatch('download/commentInspire', { params, index, c_index });
        },

        // 评论
        async onInsetComment(query) {
            if (!this.isLogin()) {
                this.$store.commit('SET_DIALO_LOGIN_VISIBLE', true);
                return;
            }
            let pageRequest = this.listQuery;
            let params = {
                articleId: query.id,
                articleType: 2,
                content: query.content,
                userId: this.userInfo.id
            };
            await this.$store.dispatch('download/insetComment', { params, pageRequest });
            this.showCommentForm(query.index);
        },

        // 回复评论
        async onInsetCommentReply(query) {
            console.log(query);
            if (!this.isLogin()) {
                this.$store.commit('SET_DIALO_LOGIN_VISIBLE', true);
                return;
            }
            let pageRequest = this.listQuery;
            let params = {
                commentId: query.id,
                content: query.content,
                creator: this.userInfo.id,
                userId: query.userId
            };
            await this.$store.dispatch('download/insetCommentReply', { params, pageRequest });
            this.showCommentForm(query.index);
        },

        // 删除评论对话框
        showDeleteConfirm(query) {
            const that = this;
            let pageRequest = this.listQuery;
            let params = {
                id: query.id
            };
            this.$confirm({
                title: '提示',
                content: '确定删除这条评论吗？',
                centered: true,
                okText: '确认',
                cancelText: '取消',
                async onOk() {
                    await that.$store.dispatch(`download/${query.type}`, { params, pageRequest });
                    that.showCommentForm(query.index);
                    that.$message.success('删除成功');
                    return;
                },
                onCancel() {}
            });
        },

        // 设置评论显示隐藏
        showCommentForm(index) {
            let list = JSON.parse(JSON.stringify(this.list));
            let item = list[index];
            item.isForm = !item.isForm;
            this.$set(list, index, item);
            this.$store.commit('download/SET_LIST', list);
        },

        // 设置回复评论显示隐藏
        showReplyCommentForm(query) {
            let list = JSON.parse(JSON.stringify(this.list)); // 资料列表
            let item = list[query.index]; // 资料item
            let commentList = item.commentList; // 评论列表
            let commentItem = commentList[query.c_index]; // 评论item
            let replyItem = commentList[query.c_index].commentList[query.R_index]; // 回复评论item
            // 评论
            if (!replyItem) {
                commentItem.isReplyForm = !commentItem.isReplyForm;
                commentItem.placeholderText = `回复${commentItem.userName}`;
            }
            // 回复评论
            if (replyItem) {
                console.log(replyItem);
                replyItem.isReplyForm = !replyItem.isReplyForm;
                replyItem.placeholderText = `回复${replyItem.userName}`;
            }
            this.$set(item, 'commentList', commentList);
            this.$set(list, query.index, item);
            this.$store.commit('download/SET_LIST', list);
        },

        // 下载
        async handleConfirm(query) {
            let pageRequest = this.listQuery;
            let index = query.index;
            let params = {
                id: query.id
            };
            let res = await this.$store.dispatch('download/dataDownLoad', { params, index, pageRequest });
            if (res.code === 0) {
                let articleUrl = res.data.articleUrl;
                let urlReg = /((?:https?:\/\/)?(?:yun|pan|eyun)\.baidu\.com\/(?:s\/\w*(((-)?\w*)*)?|share\/\S*\d\w*))/;
                let codeReg = /(?<=\s*(密|提取)码[：:]?\s*)[A-Za-z0-9]+/;
                let url = this.regValue(urlReg, articleUrl);
                let code = this.regValue(codeReg, articleUrl);
                this.copyCode(code, url);
            }
        },

        // 返回正则内容
        regValue(reg, val) {
            return val.match(reg)[0];
        },

        // 复制提取码
        copyCode(code, url) {
            var input = document.createElement('input'); // 直接构建input
            input.value = code; // 设置内容
            document.body.appendChild(input); // 添加临时实例
            input.select(); // 选择实例内容
            document.execCommand('Copy'); // 执行复制
            document.body.removeChild(input); // 删除临时实例
            window.open(url, '_blank');
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

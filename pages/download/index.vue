<template>
    <div class="mian">
        <list :list="list" @insetInspire="onInsetInspire" @insetComment="onInsetComment" @showComment="showCommentForm" @deleteComment="showDeleteConfirm" @download="handleConfirm" />
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
                    await that.$store.dispatch('download/deleteComment', { params, pageRequest });
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
            let item = Object.assign({}, list[index]);
            item.isForm = !item.isForm;
            this.$set(list, index, item);
            this.$store.commit('download/SET_LIST', list);
        },

        // 下载
        handleConfirm(query) {
            console.log(query);
            const that = this;
            let pageRequest = this.listQuery;
            let params = {
                id: query.id
            };
            let urlReg = /((?:https?:\/\/)?(?:yun|pan|eyun)\.baidu\.com\/(?:s\/\w*(((-)?\w*)*)?|share\/\S*\d\w*))/;
            let codeReg = /(?<=\s*(密|提取)码[：:]?\s*)[A-Za-z0-9]+/;
            let articleUrl = '链接：https://pan.baidu.com/s/1TeiV04iEZHldqts-Kl3Zwg 提取码：zp0p 复制这段内容后打开百度网盘手机App，操作更方便哦';
            let url = this.regValue(urlReg, articleUrl);
            let code = this.regValue(codeReg, articleUrl);
            this.copyCode(code, url);

            // await that.$store.dispatch('download/dataDownLoad', { params, pageRequest });
            // that.showCommentForm(query.index);
            // that.$message.success('删除成功');
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
            setTimeout(() => {
                window.open(url, '_blank');
            }, 1000);
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

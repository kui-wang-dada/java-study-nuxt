<template>
    <div class="mian">
        <list :list="list" :page-request="listQuery" :loading="loading" @loadMore="onLoadMore" />
        <sidebar :labelList="labelList" />
    </div>
</template>

<script>
import list from '@/components/home/list';
import sidebar from '@/components/home/sidebar';
import $api from '@/config/axios/api';

export default {
    components: {
        list,
        sidebar
    },
    data() {
        return {
            // 文章列表
            // list: [],

            // 热门标签
            labelList: [],

            // 加载更多loading
            loading: false,

            // 页码及每页条数
            listQuery: {
                page: 1,
                pageSize: 10
                // userId:
            }
        };
    },
    computed: {
        // list
        list() {
            return this.$store.state.home.list;
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
        await store.dispatch('home/GetHomeServerData', { params: data });
    },
    mounted() {},
    methods: {
        // 获取首页文章列表
        async getSelectHomeList(query) {
            // const _this = this;
            // let list = this.list;
            // let params = query;
            // _this.dispatch('home/selectHomeList', params).then(res => {
            //     if (res.code === 0) {
            //         _this.list = list.concat(res.data.list);
            //         _this.loading = false;
            //     }
            // });
            await this.dispatch('home/GetHomeServerData', { params: query });
            this.loading = false;
        },

        // 获取首页热门标签
        getSelectHotLabel() {
            const _this = this;
            _this.dispatch('home/selectHotLabel').then(res => {
                if (res.code === 0) {
                    _this.labelList = res.data;
                }
            });
        },

        // 加载更多数据
        onLoadMore(query) {
            this.loading = true;
            // this.getSelectHomeList(query);
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

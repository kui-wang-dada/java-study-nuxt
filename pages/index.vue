<template>
    <div class="mian">
        <list />
        <sidebar />
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
        return {};
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
        console.log(store, 'this.$router');
        if (process.client) return;

        await store.dispatch('home/GetHomeServerData');
    },
    methods: {}
};
</script>

<style scoped lang="less">
.mian {
    display: flex;
    justify-content: space-between;
}
</style>

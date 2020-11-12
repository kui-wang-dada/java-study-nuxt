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
    }
};
</script>

<style scoped lang="less">
.mian {
    display: flex;
    justify-content: space-between;
}
</style>

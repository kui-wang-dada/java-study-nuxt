<template>
    <div class="home-wrap">
        <sidebar />
        <div class="home-main">
            <entry />
        </div>
    </div>
</template>

<script>
import entry from '@/components/study/entry';
import sidebar from '@/components/study/sidebar/SidebarMenu';
export default {
    components: {
        entry,
        sidebar
    },
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {}
};
</script>

<style scoped lang="less">
.home-wrap {
    height: 100vh;
    background-color: #fff;
    .home-main {
        background-color: #fff;
        // padding-left: 320px;
    }
}
</style>

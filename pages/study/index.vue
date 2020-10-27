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

<style scoped lang="scss">
.home-wrap {
    display: flex;
    flex-direction: row;
    .home-main {
        flex: 1;
        margin-left: 20px;
    }
}
</style>

<template>
    <div class="search-wrap">
        <a-input-search placeholder="请输入资料标题关键字搜索" class="comment-textarea" :allowClear="true" @search="onSearch" />
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
    created() {},
    methods: {
        onSearch(value) {
            this.$emit('search', value);
        }
    }
};
</script>

<style scoped lang="less">
.search-wrap {
    min-width: 620px;
    margin: 0 auto;

    /deep/ .ant-input {
        border-color: #f2f2f2;
    }

    /deep/ .ant-input-search.ant-input-affix-wrapper .ant-input:focus {
        border-color: @main-col !important;
        border-right-width: 1px !important;
        box-shadow: 0 0 0 2px rgba(65, 105, 226, 0.2);
    }

    /deep/ .ant-input-search.ant-input-affix-wrapper .ant-input:hover {
        border-color: @main-col !important;
        box-shadow: 0 0 0 2px rgba(65, 105, 226, 0.2);
    }
}
</style>

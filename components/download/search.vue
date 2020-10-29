<template>
    <div class="search-wrap">
        <div class="search-form">
            <input class="search control" type="text" placeholder="请输入关键字搜索" />
            <span class="search-icon flex-align-center">
                <i class="iconfont icon-sousuo"></i>
            </span>
        </div>
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
    mounted() {},
    watch: {},
    methods: {}
};
</script>

<style scoped lang="less">
.search-wrap {
    min-width: 620px;
    margin: 0 auto;

    .search-form {
        position: relative;

        .search {
            box-shadow: none;
            font-size: 16px;
            padding: 8px 50px 8px 20px;
            height: auto;
            text-align: left;
            color: #333;

            &:focus {
                border-color: @main-col;
            }

            &:focus + .search-icon .icon-sousuo {
                color: @main-col;
            }
        }

        .control {
            display: block;
            width: 100%;
            line-height: 1;
            color: #555;
            background-color: #fff;
            background-image: none;
            border: 1px solid #eee;
            border-radius: 4px;
            transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
        }

        .search-icon {
            position: absolute;
            right: 0;
            top: 0;
            width: 50px;
            height: 100%;
            line-height: 40px;
            cursor: pointer;

            .icon-sousuo {
                color: #999;
                font-size: 18px;
            }
        }
    }
}
</style>

<template>
    <div class="search-wrap">
        <div class="search-form">
            <input class="search control" type="text" placeholder="请输入关键字搜索" />
            <span class=" search-icon">
                <i class="iconfont icon-sousuo1"></i>
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

<style scoped lang="scss">
.search-wrap {
    min-width: 620px;
    margin: 0 auto;

    .search-form {
        position: relative;

        .search {
            box-shadow: none;
            font-size: 16px;
            padding: 10px 30px;
            height: auto;
            text-align: left;
            color: #333;

            &:focus {
                border-color: #2c74e6;
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
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-radius: 2px;
            cursor: pointer;

            .icon-sousuo1 {
                color: #2c74e6;
                font-size: 20px;
                line-height: 40px;
            }
        }
    }
}
</style>

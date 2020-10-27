<template>
    <div>
        <section class="widget-operation-bottom">
            <div class="flex-align">
                <i class="iconfont icon-dianzan1"></i>
                <b>点赞</b>
            </div>
            <div class="flex-align">
                <i class="iconfont icon-shoucang"></i>
                <b>收藏</b>
            </div>
            <div class="flex-align">
                <i class="iconfont icon-weixin"></i>
                <b>微信</b>
            </div>
        </section>
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
.widget-operation-bottom {
    display: flex;
    justify-content: flex-end;

    .icon-dianzan1,
    .icon-shoucang,
    .icon-weixin {
        font-size: 14px;
        color: #b4b9be;
        vertical-align: middle;
    }

    & div {
        padding-left: 20px;
        margin-right: 20px;
        color: #828a92;
        cursor: pointer;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 2px;
            width: 1px;
            height: 14px;
            border-left: 1px solid #eaeeef;
        }

        &:first-child:before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
        }
    }

    & b {
        display: inline-block;
        margin-left: 6px;
        line-height: 1;
        font-size: 14px;
        font-weight: 400;
        color: #828a92;
    }
}
</style>

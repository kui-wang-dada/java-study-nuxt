<template>
    <div class="layout-footer">
        <div class="copyright flex-align-center">
            <!-- ©2020 java学习 -->
            <img src="https://pic3.zhimg.com/80/v2-d0289dc0a46fc5b15b3363ffa78cf6c7.png" alt="" />
            <a href="">粤ICP备xxxxxxxx号-x</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {},
    created() {},
    mounted() {},
    methods: {}
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.layout-footer {
    width: 100%;

    .copyright {
        width: 100%;
        height: 60px;
        background-color: #fff;
        font-size: 12px;
        color: #2d3748;
        justify-content: center;

        p {
            margin: 0;
        }

        .text-copyright {
            // margin-bottom: 2px;
        }

        img {
            width: 18px;
            height: 18px;
            margin: 0 4px;
            flex-shrink: 0;
        }

        // .prepare {
        // }
    }
}
</style>

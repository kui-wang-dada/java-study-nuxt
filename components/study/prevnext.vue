<template>
    <div>
        <section class="prevnext">
            <span class="prev">
                上一篇：【178期】面试官：谈谈在做项目过程中，你是是如何进行SQL优化的
            </span>
            <span class="next">
                上一篇：【178期】面试官：谈谈在做项目过程中，你是是如何进行SQL优化的
            </span>
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

<style scoped lang="scss">
.prevnext {
    padding: 20px 40px;
    border-top: 1px #efefef solid;
    margin: 20px -40px -40px;
    font-size: 0;

    & > span {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        display: inline-block;
        width: 50%;
        font-size: 14px;
        color: #999;
        font-weight: 300;
        cursor: pointer;

        &:hover {
            color: #2c74e6;
        }
    }

    & > span.prev {
        padding-right: 20px;
        border-right: 1px #efefef solid;
    }

    & > span.next {
        text-align: right;
        padding-left: 20px;
    }
}
</style>

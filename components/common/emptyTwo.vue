<template>
    <div class="empty flex-direction">
        <a-empty image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original" :image-style="imageStyle">
            <span slot="description" class="no-more-data">{{ description }}</span>
        </a-empty>
    </div>
</template>

<script>
export default {
    props: {
        description: {
            type: String,
            default: '暂无数据'
        }
    },
    data() {
        return {
            imageStyle: {
                height: '120px'
            }
        };
    },
    computed: {},
    methods: {}
};
</script>

<style scoped lang="less">
.empty {
    height: 300px;
    padding: 20px 0;
    justify-content: center;

    .empty__image {
        width: 160px;
        height: 160px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .empty__description {
        margin-top: 16px;
        padding: 0 60px;
        color: #969799;
        font-size: 14px;
        line-height: 20px;
    }
}
</style>

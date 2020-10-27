<template>
    <div class="empty">
        <div class="empty__image">
            <img src="https://img.yzcdn.cn/vant/empty-image-default.png" alt="" />
        </div>
        <div class="empty__description">{{ description }}</div>
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
        return {};
    },
    computed: {},
    methods: {}
};
</script>

<style scoped lang="scss">
.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0;

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

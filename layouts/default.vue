<template>
    <div>
        <HeaderTop />
        <div class="main">
            <div class="main-body">
                <Nuxt />
            </div>
        </div>
        <!-- <Footer /> -->
    </div>
</template>

<script>
import HeaderTop from '@/components/common/HeaderTop';
import Footer from '@/components/common/footer';
export default {
    name: 'App',
    components: {
        HeaderTop,
        Footer
    },
    created() {},
    methods: {}
};
</script>
<style lang="less" scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-body {
    width: 1000px;
    margin: 81px 0 60px 0;
    // padding-bottom: 30px;
}
</style>
<style>
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}
</style>

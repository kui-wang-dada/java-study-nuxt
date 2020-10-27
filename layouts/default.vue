<template>
    <div class="main">
        <HeaderTop></HeaderTop>
        <div class="main-body">
            <Nuxt />
        </div>
    </div>
</template>

<script>
import HeaderTop from '@/components/common/HeaderTop';
export default {
    name: 'App',
    components: { HeaderTop }
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
    margin-top: 81px;
    padding-bottom: 30px;
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

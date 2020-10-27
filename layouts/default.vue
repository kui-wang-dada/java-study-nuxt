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
<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-body {
    width: 1000px;
    margin-top: 81px;
}
</style>
<style>
/* @import '@/assets/style/index.scss'; */
/* @import '@/assets/icon/iconfont.css'; */

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}
</style>

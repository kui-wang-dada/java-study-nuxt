<template>
    <div>
        <HeaderTop :routeMenu="routeMenu" :routeMenuActive="routeMenuActive" @routeMenu="onRouteMenu" />
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
    data() {
        return {
            routeMenuActive: 0,
            routeMenu: [
                {
                    title: '首页',
                    link: '/'
                },
                // {
                //     title: 'java学习',
                //     link: '/study'
                // },
                {
                    title: '资料下载',
                    link: '/download'
                }
                // {
                //     title: '关于我们',
                //     link: '/about'
                // }
            ]
        };
    },
    created() {
        this.initRoute();
    },
    mounted() {},
    methods: {
        // 路由菜单初始化
        initRoute() {
            this.routeMenu.forEach((item, index) => {
                if (this.$route.path == item.link) {
                    this.routeMenuActive = index;
                }
            });
        },

        // 监听路由切换
        onRouteMenu(index) {
            this.routeMenuActive = index;
        }
    }
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

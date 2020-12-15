const path = require('path');
export default {
    server: {
        host: '0.0.0.0',
        port: 3000 // default: 3000
    },
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'java-study-nuxt',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        // 'ant-design-vue/dist/antd.css',
        // 按需引入
        'ant-design-vue/lib/list/style',
        'ant-design-vue/lib/button/style',
        'ant-design-vue/lib/spin/style',
        'ant-design-vue/lib/select/style',
        'ant-design-vue/lib/form/style',
        'ant-design-vue/lib/input/style',
        'ant-design-vue/lib/avatar/style',
        'ant-design-vue/lib/carousel/style',
        'ant-design-vue/lib/message/style',
        'ant-design-vue/lib/icon/style',
        'ant-design-vue/lib/tooltip/style',

        '@/assets/style/index.less',
        '~assets/icon/iconfont.css'
    ],

    mode: 'spa',

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '@/plugins/antd-ui',
        '@/plugins/main',
        '@/plugins/api',
        {
            src: '@plugins/vue-infinite-scroll', // vue-infinite-scroll名字和js文件名字对应就行
            ssr: false // 只在client被打包引用
        },
        { src: '~/plugins/vue-persist.js', ssr: false },
        {
            src: '@/plugins/vuex-persistedstate',
            ssr: false
        }
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: ['@nuxtjs/style-resources'],

    styleResources: {
        less: '@/assets/style/theme.less'
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extend(config, ctx) {
            config.resolve.alias['@'] = path.resolve(__dirname, './');

            if (ctx.isClient && !ctx.isDev) {
                config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
                config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
                config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
            }
        },
        loaders: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                        'primary-color': '#4169e2',
                        'link-color': '#4169e2'
                    }
                }
            }
        }
    }
};

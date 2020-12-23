<template>
    <header id="header">
        <div class="container flex-align">
            <a class="logo-font">java学习网</a>
            <ul id="nav">
                <li v-for="(item, index) in list" :key="item.title" :class="active == index ? 'active' : ''" @click="changeMenu(index)" class="menu-item">
                    <router-link class="link" :to="item.link">{{ item.title }}</router-link>
                </li>
                <li class="menu-item personal-info" v-if="getToken">
                    <div class="left flex-align">
                        <div class="head-box" v-if="userInfo.userImage">
                            <img class="head" :src="userInfo.userImage" :alt="userInfo.userName" />
                        </div>
                        <div class="head-box no-img" v-else>{{ firstUserName }}</div>
                    </div>
                    <div class="right flex-c-direction">
                        <p class="title">{{ userInfo.userName }}</p>
                        <p class="level">
                            <span>初学者</span>
                            <span>|</span>
                            <span>未认证</span>
                        </p>
                    </div>
                    <ul class="dropdown-menu">
                        <li>
                            <span class="dropdown-link">个人主页</span>
                        </li>
                        <li @click="logout">
                            <span class="dropdown-link">退出登陆</span>
                        </li>
                    </ul>
                </li>
                <li class="menu-item personal-info" v-else>
                    <a-button type="primary" @click="handleShowLogin">登录/注册</a-button>
                </li>
            </ul>
        </div>

        <login v-if="dialoLoginVisible" @success="handleSuccess" @close="handleCloseLogin" />
        <auth @success="handleSuccess" @close="handleCloseLogin" />
    </header>
</template>

<script>
import login from '@/components/common/login';
import auth from '@/components/common/auth';
import { disableScroll, openScroll } from '@/utils';
export default {
    components: {
        login,
        auth
    },
    data() {
        return {
            dialoLoginVisible: false,
            active: 0,
            list: [
                {
                    title: '首页',
                    link: '/'
                },
                {
                    title: 'java学习',
                    link: '/study'
                },
                {
                    title: '资料下载',
                    link: '/download'
                },
                {
                    title: '关于我们',
                    link: '/about'
                }
            ]
        };
    },
    computed: {
        // token
        getToken() {
            return this.$store.state.user.token;
        },

        // userInfo
        userInfo() {
            return this.$store.state.user.userInfo;
        },

        // 用户名首字母
        firstUserName() {
            if (this.$store.state.user.userInfo.userName) {
                return this.$store.state.user.userInfo.userName.substring(0, 1).toUpperCase();
            }
        }
    },
    props: {},
    created() {},
    methods: {
        // 获取用户信息
        getUserInfo() {
            const _this = this;
            _this.$store.dispatch('user/getUserInfo').then(res => {
                if (res.code !== 0) {
                    _this.$store.dispatch('user/resetToken');
                }
            });
        },

        // tab监听
        changeMenu(index) {
            if (index != this.active) {
                this.active = index;
            }
        },

        // 登录弹窗
        handleShowLogin() {
            this.dialoLoginVisible = true;
            disableScroll();
        },

        // 关闭登录弹窗
        handleCloseLogin() {
            this.dialoLoginVisible = false;
            openScroll();
        },

        // 登录成功关闭弹窗
        handleSuccess() {
            this.dialoLoginVisible = false;
            this.getUserInfo();
            openScroll();
        },

        // 退出登录
        logout() {
            this.$store.dispatch('user/resetToken');
            this.$message.success('退出成功!');
        }
    }
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
#header {
    position: fixed;
    width: 100%;
    top: 0;
    background-color: #fff;
    transition: background-color 0.3s ease-in-out;
    padding: 0 60px;
    z-index: 20;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.11);

    .container {
        position: relative;
        width: 1000px;
        height: 70px;
        margin: 0 auto;

        .logo-font {
            font-size: 1.5em;
            line-height: 40px;
            color: #273849;
            font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
            font-weight: bold;
        }

        #nav {
            list-style-type: none;
            margin: 0;
            padding: 0;
            position: absolute;
            right: 0;
            top: 0;
            height: 70px;
            display: flex;
            align-items: center;

            & .menu-item {
                .link {
                    cursor: pointer;
                    padding-bottom: 3px;
                    white-space: nowrap;

                    &:after {
                        content: ' ';
                        display: block;
                        position: absolute;
                        left: 0;
                        bottom: -10px;
                        width: 100%;
                        height: 2px;
                        background: @main-col;
                        opacity: 0;
                        transform: scaleX(0);
                        transition: all 0.3s cubic-bezier(0.18, 0.89, 0.17, 0.88), opacity 0.25s ease;
                    }

                    &:hover {
                        color: rgb(81, 147, 221);

                        &:after {
                            -webkit-transform: scaleX(1);
                            transform: scaleX(1);
                            opacity: 1;
                        }
                    }
                }
            }

            & .active .link {
                color: @main-col;

                &:after {
                    opacity: 1;
                    transition: initial;
                    transform: none;
                }
            }

            & li {
                display: inline-block;
                position: relative;
                margin: 0 18px;
            }
        }

        #nav .personal-info {
            height: 100%;
            display: flex;
            align-items: center;

            .left {
                height: 100%;
                margin-right: 10px;

                .head-box {
                    width: 32px;
                    height: 32px;
                    // box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
                    box-shadow: 0 0 0 2px rgba(65, 105, 226, 0.2);
                    border-radius: 50%;

                    .head {
                        width: 100%;
                        height: 32px;
                        border-radius: 50%;
                        cursor: pointer;
                    }
                }

                .no-img {
                    color: #fff;
                    line-height: 32px;
                    font-size: 14px;
                    border-color: #4669e7;
                    background-color: #4669e7;
                    text-align: center;
                    text-transform: uppercase;
                }
            }

            .right {
                height: 100%;

                .title {
                    font-size: 14px;
                    color: #333;
                    font-weight: bold;
                    margin-bottom: 3px;
                }

                .level {
                    font-size: 12px;
                    color: #666;
                    cursor: pointer;
                    margin: 0;
                }
            }

            & .dropdown-menu {
                background-color: #fff;
                right: 0;
                line-height: 1.8;
                position: absolute;
                top: 69px;
                width: 120px;
                z-index: 11;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
                border-radius: 5px;
                text-align: center;
                padding: 10px 0;
                display: none;

                &:before {
                    background: #fff none repeat scroll 0 0;
                    box-shadow: -1px -1px 3px -1px rgba(0, 0, 0, 0.15);
                    content: '';
                    display: block;
                    height: 10px;
                    left: 82px;
                    position: absolute;
                    top: -12px;
                    transform: rotate(45deg) translate(6px, 6px);
                    width: 10px;
                }

                & li {
                    width: 100%;
                    height: 48px;
                    line-height: 48px;
                    margin: 0;
                    font-size: 14px;
                    padding: 0 10px;

                    &:hover {
                        background-color: #f7f7f7;
                    }

                    .dropdown-link {
                        color: #555;
                        cursor: pointer;
                    }
                }
            }

            &:hover .dropdown-menu {
                display: block;
                animation: dropdown 0.5s;
            }
        }
    }
}

/deep/ .ant-btn {
    background: @main-col;
    border-color: @main-col;
}

/deep/ button.ant-btn-primary:hover {
    background-color: #388ae8;
    box-shadow: 0 0 10px rgba(45, 55, 72, 0.5);
}

@media screen and (max-width: 1000px) {
    #header {
        display: none;
    }
}

@keyframes dropdown {
    0% {
        transform: translate3d(0, 10px, 0);
        opacity: 0.1;
    }

    to {
        transform: translateZ(0);
        opacity: 1;
    }
}
</style>

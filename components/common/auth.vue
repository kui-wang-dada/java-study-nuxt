<template>
    <div class="login-container">
        <div class="com-close-btn" @click.stop="handleClose">
            <a-icon type="close" />
        </div>
        <div class="modal-scroll">
            <div class="mask" @click.stop="handleClose"></div>
            <!-- 登录 -->
            <div class="main ">
                <div class="official-qrcode flex-justify">
                    <div class="qrcode-wrap">
                        <img src="http://139.159.147.237/images/kefu.jpeg" alt="客服" />
                    </div>
                </div>
                <div class="tips-wrap flex-justify">
                    <span>
                        tips：请扫码关注公众号回复关键字
                        <span style="color: red;">"认证"</span>
                        获取认证码!
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        // 登录账号
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入用户名或邮箱'));
            } else {
                callback();
            }
        };
        // 登录密码
        const validatePassword = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };

        return {
            // 登录
            loginForm: {
                userName: '',
                password: ''
            },
            loginRules: {
                userName: [{ validator: validateUsername, trigger: 'blur' }],
                password: [{ validator: validatePassword, trigger: 'blur' }]
            },
            // 用户信息
            userInfo: {}
        };
    },
    computed: {},
    methods: {
        // 登录
        login(formName) {
            const _this = this;
            this.iconLoading = true;
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    let params = _this.loginForm;
                    _this.$store.dispatch('user/login', params).then(res => {
                        if (res.code === 0) {
                            _this.isEmail = false;
                            _this.$emit('success');
                        } else {
                            _this.$message.warning(res.msg);
                        }
                        _this.iconLoading = false;
                    });
                } else {
                    this.iconLoading = false;
                    return false;
                }
            });
        },

        // 回车键事件
        enterKey(type) {
            // 登录
            if (type == 'login') {
                this.login('ruleForm');
            }
            // 注册
            if (type == 'register') {
                this.register('ruleForm');
            }
            // 激活
            if (type == 'registerActive') {
                this.registerActive('ruleForm');
            }
        },

        // 关闭弹窗
        handleClose() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped lang="less">
// 登录
.login-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;

    .com-close-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        line-height: 50px;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.2);
        color: #fff;
        font-size: 16px;
        position: absolute;
        top: 32px;
        right: 32px;
        cursor: pointer;
        transition: background-color 0.3s;
        z-index: 2002;

        &:hover {
            background-color: rgba(0, 0, 0, 0.3);
        }
    }

    .modal-scroll {
        position: relative;
        height: 100%;
        overflow-y: auto;

        .mask {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(8px);
            z-index: 2001;
        }

        .main {
            position: absolute;
            width: 380px;
            height: 580px;
            left: 50%;
            top: 50%;
            margin-left: -170px;
            margin-top: -290px;
            background-color: #fff;
            border-radius: 6px;
            z-index: 2002;
            padding: 30px;

            .official-qrcode {
                width: 100%;

                .qrcode-wrap {
                    width: 240px;

                    img {
                        width: 100%;
                        border: 1px solid #fff;
                        display: block;
                    }
                }
            }

            .tips-wrap {
                width: 240px;
            }
        }
    }
}
</style>

<template>
    <div class="login-container">
        <div class="com-close-btn" @click.stop="handleClose">
            <a-icon type="close" />
        </div>
        <div class="modal-scroll">
            <div class="mask" @click.stop="handleClose"></div>
            <!-- 登录 -->
            <div class="main flex-direction" style="justify-content: center;">
                <div class="official-qrcode flex-justify">
                    <div class="qrcode-wrap">
                        <img src="http://139.159.147.237/images/kefu.jpeg" alt="客服" />
                    </div>
                </div>
                <div class="tips-wrap flex-justify">
                    <div class="tips">
                        tips：请扫码关注公众号回复关键字
                        <span style="color: #f5222d;">“认证”</span>
                        获取认证码!
                    </div>
                </div>
                <div class="form-container flex-direction">
                    <a-form-model ref="ruleForm" :model="authForm" :rules="authRules">
                        <a-form-model-item prop="code" :colon="false">
                            <a-input v-model="authForm.code" @keyup.enter="enterKey('auth')" placeholder="请输入认证码" type="text" autocomplete="off" />
                        </a-form-model-item>
                    </a-form-model>
                    <div class="button-container pt-8">
                        <a-button type="primary" :loading="iconLoading" class="ant-btn-lg" @click="login('ruleForm')">
                            认证
                        </a-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        // 认证码
        const validateAuthCode = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入认证码'));
            } else {
                callback();
            }
        };

        return {
            // 认证
            authForm: {
                code: ''
            },
            authRules: {
                code: [{ validator: validateAuthCode, trigger: 'blur' }]
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
            width: 340px;
            height: 540px;
            left: 50%;
            top: 50%;
            margin-left: -170px;
            margin-top: -270px;
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
                width: 100%;

                .tips {
                    width: 240px;
                    padding: 8px 10px;
                    color: #718096;
                    font-size: 14px;
                }
            }

            .form-container {
                width: 100%;
                padding: 8px 10px;

                /deep/ .ant-input {
                    width: 220px;
                    border-radius: 4px;
                    font-size: 14px;
                    color: #2d3748;
                }

                /deep/ .ant-form-explain {
                    font-size: 12px;
                }

                .button-container {
                    .ant-btn-lg {
                        width: 220px;
                        height: 32px;
                        padding: 0 15px;
                        font-size: 14px;
                        border-radius: 4px;
                        background: @main-col;
                        border-color: @main-col;
                        transition: all 0.3s;
                    }

                    /deep/ button.ant-btn-primary:hover {
                        background-color: #388ae8;
                        box-shadow: 0 0 10px rgba(45, 55, 72, 0.5);
                    }
                }
            }
        }
    }
}
</style>

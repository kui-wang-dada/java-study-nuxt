<template>
    <div class="login-container" :class="!isLogin ? 'register-container' : ''">
        <div class="com-close-btn" @click.stop="handleClose">
            <a-icon type="close" />
        </div>
        <div class="modal-scroll">
            <div class="mask" @click.stop="handleClose"></div>
            <div class="main" v-if="isLogin">
                <div class="logo-container">java学习</div>
                <div class="form-container login-form">
                    <a-form-model ref="ruleForm" :model="loginForm" :rules="loginRules">
                        <a-form-model-item label="账号" prop="username" :colon="false">
                            <a-input v-model="loginForm.username" placeholder="请输入用户名或邮箱" type="text" autocomplete="off" />
                        </a-form-model-item>
                        <a-form-model-item label="密码" prop="password" :colon="false">
                            <a-input v-model="loginForm.password" placeholder="请输入密码" type="password" autocomplete="off" />
                        </a-form-model-item>
                    </a-form-model>
                    <div class="button-container">
                        <a-button type="primary" :loading="iconLoading" class="ant-btn-lg ant-btn-block" @click="submitForm('ruleForm')">
                            登录
                        </a-button>
                    </div>
                    <div class="login-footer flex-s-b">
                        <a>忘记密码</a>
                        <span class="flex">
                            没有账号？去
                            <a @click.prevent="doToggle">注册</a>
                        </span>
                    </div>
                </div>
            </div>

            <div class="main" v-else>
                <div class="logo-container register-logo">java学习</div>
                <div class="form-container login-form">
                    <a-form-model ref="ruleForm" :model="registerForm" :rules="registerRules">
                        <a-form-model-item label="账号" prop="username" :colon="false">
                            <a-input v-model="registerForm.username" placeholder="4-16位字符，可使用_-符号" type="text" autocomplete="off" />
                        </a-form-model-item>
                        <a-form-model-item label="邮箱" prop="email" :colon="false">
                            <a-input v-model="registerForm.email" placeholder="请填写常用邮箱地址" type="text" autocomplete="off" />
                        </a-form-model-item>
                        <a-form-model-item label="密码" prop="password" :colon="false">
                            <a-input-password v-model="registerForm.password" placeholder="6-20位字符，包含数字跟字母" type="password" autocomplete="off" />
                        </a-form-model-item>
                    </a-form-model>
                    <div class="button-container">
                        <a-button type="primary" :loading="iconLoading" class="ant-btn-lg ant-btn-block" @click="submitForm('ruleForm')">
                            注册
                        </a-button>
                    </div>
                    <div class="login-footer flex-align-center">
                        <span class="flex">
                            已有账号？去
                            <a @click.prevent="doToggle">登录</a>
                        </span>
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

        // 注册账号
        const validateRegisterUsername = (rule, value, callback) => {
            const uPattern = this.$pattern.userNameRegex;
            if (!value) {
                callback(new Error('请输入账号'));
            } else if (!uPattern.test(value)) {
                callback(new Error('账号不符合规则'));
            } else {
                callback();
            }
        };
        // 注册邮箱
        const validateRegisterEmail = (rule, value, callback) => {
            const ePattern = this.$pattern.emailRegex;
            if (!value) {
                callback(new Error('请输入邮箱'));
            } else if (!ePattern.test(value)) {
                callback(new Error('邮箱不符合规则'));
            } else {
                callback();
            }
        };
        // 注册密码
        const validateRegisterPassword = (rule, value, callback) => {
            const pPattern = this.$pattern.passWordRegex;
            if (!value) {
                callback(new Error('请输入密码'));
            } else if (!pPattern.test(value)) {
                callback(new Error('密码不符合规则'));
            } else {
                callback();
            }
        };

        return {
            isLogin: true,
            iconLoading: false,
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
                password: [{ required: true, validator: validatePassword, trigger: 'blur' }]
            },
            registerForm: {
                username: '',
                password: ''
            },
            registerRules: {
                username: [{ required: true, validator: validateRegisterUsername, trigger: 'blur' }],
                password: [{ required: true, validator: validateRegisterPassword, trigger: 'blur' }],
                email: [{ required: true, validator: validateRegisterEmail, trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.iconLoading = true;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!');
                    this.iconLoading = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        // 关闭弹窗
        handleClose() {
            this.$emit('close');
        },

        // 登录、注册切换
        doToggle() {
            this.isLogin = !this.isLogin;
        }
    }
};
</script>

<style scoped lang="less">
// 注册
.register-container.login-container {
    .modal-scroll {
        .logo-container.register-logo {
            margin: 68px 0 76px;
            text-align: center;
        }
    }
}

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
            width: 540px;
            height: 680px;
            left: 50%;
            top: 50%;
            margin-left: -270px;
            margin-top: -340px;
            background-color: #fff;
            border-radius: 8px;
            z-index: 2002;

            .logo-container {
                margin: 100px 0 110px;
                text-align: center;
                font-size: 22px;
                font-weight: bold;
            }

            .form-container {
                margin: 0 110px;

                /deep/ .ant-input {
                    width: 320px;
                    height: 40px;
                    border-radius: 4px;
                    background: #edf2f7;
                    border: none;
                    font-weight: 700;
                    font-size: 14px;
                    color: #2d3748;
                    padding: 0 16px;
                    line-height: 40px;
                }

                /deep/ .ant-input-affix-wrapper {
                    color: #9da6b3;
                }

                /deep/ .ant-input::placeholder {
                    color: #9da6b3;
                    font-weight: bold;
                    font-size: 14px;
                }

                /deep/ .ant-input:focus {
                    box-shadow: none;
                }

                /deep/ .ant-form-explain {
                    margin-top: 2px;
                    margin-bottom: -5px;
                }

                /deep/ .ant-form-item-label {
                    display: block;
                    margin: 0;
                    padding: 0 0 8px;
                    line-height: 1.5;
                    white-space: initial;
                    text-align: left;
                }

                /deep/ .ant-row.ant-form-item-with-help {
                    margin-bottom: 12px;
                }

                /deep/ .ant-form-item {
                    margin-bottom: 31px;
                }

                .button-container {
                    padding-top: 25px;

                    .ant-btn-block {
                        width: 100%;
                    }

                    .ant-btn-lg {
                        height: 40px;
                        padding: 0 15px;
                        font-size: 16px;
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

                .login-footer {
                    margin-top: 30px;

                    span {
                        color: #9da6b3;
                    }

                    a {
                        color: #388ae8;
                    }
                }
            }
        }
    }
}
</style>

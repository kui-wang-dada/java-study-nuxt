<template>
    <div class="login-container" :class="classObject">
        <div class="com-close-btn" @click.stop="handleClose">
            <a-icon type="close" />
        </div>
        <div class="modal-scroll">
            <div class="mask" @click.stop="handleClose"></div>
            <div class="main" v-if="isLogin && !isEmail">
                <div class="logo-container">java学习</div>
                <div class="form-container login-form">
                    <a-form-model ref="ruleForm" :model="loginForm" :rules="loginRules">
                        <a-form-model-item label="账号" prop="username" :colon="false">
                            <a-input v-model="loginForm.username" @keyup.enter="enterKey('login')" placeholder="请输入用户名或邮箱" type="text" autocomplete="off" />
                        </a-form-model-item>
                        <a-form-model-item label="密码" prop="password" :colon="false">
                            <a-input v-model="loginForm.password" @keyup.enter="enterKey('login')" placeholder="请输入密码" type="password" autocomplete="off" />
                        </a-form-model-item>
                    </a-form-model>
                    <div class="button-container pt-24">
                        <a-button type="primary" :loading="iconLoading" class="ant-btn-lg ant-btn-block" @click="login('ruleForm')">
                            登录
                        </a-button>
                    </div>
                    <div class="login-footer pt-28 flex-s-b">
                        <a-tooltip placement="top" title="暂未开发，忘记密码请联系管理员" arrow-point-at-center>
                            <a>忘记密码</a>
                        </a-tooltip>
                        <span class="flex">
                            没有账号？去
                            <a @click.prevent="doToggle">注册</a>
                        </span>
                    </div>
                </div>
            </div>

            <div class="main" v-if="!isLogin && !isEmail">
                <div class="logo-container register-logo">java学习</div>
                <div class="form-container login-form">
                    <a-form-model ref="ruleForm" :model="registerForm" :rules="registerRules">
                        <a-form-model-item label="账号" prop="username" :colon="false">
                            <a-input v-model="registerForm.username" @keyup.enter="enterKey('register')" placeholder="4-16位字符，可使用_-符号" type="text" autocomplete="off" />
                        </a-form-model-item>
                        <a-form-model-item label="邮箱" prop="email" :colon="false">
                            <a-input v-model="registerForm.email" @keyup.enter="enterKey('register')" placeholder="请填写常用邮箱地址" type="text" autocomplete="off" />
                        </a-form-model-item>
                        <a-form-model-item label="密码" prop="password" :colon="false">
                            <a-input-password v-model="registerForm.password" @keyup.enter="enterKey('register')" placeholder="6-20位字符，包含数字跟字母" type="password" autocomplete="off" />
                        </a-form-model-item>
                    </a-form-model>
                    <div class="button-container pt-24">
                        <a-button type="primary" :loading="iconLoading" class="ant-btn-lg ant-btn-block" @click="register('ruleForm')">
                            注册
                        </a-button>
                    </div>
                    <div class="login-footer pt-28 flex-align-center">
                        <span class="flex">
                            已有账号？去
                            <a @click.prevent="doToggle">登录</a>
                        </span>
                    </div>
                </div>
            </div>

            <div class="main" v-if="isEmail">
                <div class="logo-container email-logo">java学习</div>
                <div class="form-container email-check-container">
                    <div class="email-check-tips mb-12">
                        <p class="m-0">
                            将会向您的邮箱
                            <span class="text-primary">604595095@qq.com</span>
                            发送一条验证邮件，请注意查收！
                        </p>
                    </div>
                    <a-form-model ref="ruleForm" :model="emailForm" :rules="emailRules">
                        <a-form-model-item label="验证码" prop="code" :colon="false">
                            <a-input v-model="emailForm.code" placeholder="请输入验证码" type="text" autocomplete="off">
                                <a-button type="primary" slot="suffix" class="email-btn ant-btn-lg" @click="getCode" v-show="show">{{ btnMsg }}</a-button>
                                <a-button type="primary" slot="suffix" class="email-btn ant-btn-lg" v-show="!show" disabled>{{ count }}秒后重新发送</a-button>
                            </a-input>
                        </a-form-model-item>
                    </a-form-model>
                    <div class="button-container pt-14">
                        <a-button type="primary" :loading="iconLoading" class="ant-btn-lg ant-btn-block" @click="login('ruleForm')">
                            确认
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
        // 邮箱验证码
        const validateEmailcode = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入邮箱验证码'));
            } else {
                callback();
            }
        };

        return {
            isLogin: true, // 登录注册 true登录 false注册
            isEmail: false, // 邮箱验证 true显示 false隐藏
            iconLoading: false,
            // 登录
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{ validator: validateUsername, trigger: 'blur' }],
                password: [{ validator: validatePassword, trigger: 'blur' }]
            },
            // 注册
            registerForm: {
                username: '',
                password: '',
                email: ''
            },
            registerRules: {
                username: [{ required: true, validator: validateRegisterUsername, trigger: 'blur' }],
                password: [{ required: true, validator: validateRegisterPassword, trigger: 'blur' }],
                email: [{ required: true, validator: validateRegisterEmail, trigger: 'blur' }]
            },
            // 邮箱验证
            emailForm: {
                code: ''
            },
            emailRules: {
                code: [{ required: true, validator: validateEmailcode, trigger: 'blur' }]
            },
            // 发送验证码
            btnMsg: '发送验证码',
            show: true,
            count: '',
            intervalBtn: null
        };
    },
    computed: {
        classObject() {
            return {
                'register-container': !this.isLogin && !this.isEmail,
                'email-container': this.isEmail
            };
        }
    },
    methods: {
        // 注册
        register(formName) {
            this.iconLoading = true;
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    // alert('submit!');
                    let params = {
                        userName: this.registerForm.username,
                        userEmail: this.registerForm.email,
                        password: this.registerForm.password
                    };
                    let res = await this.$api['user/register'](params);
                    console.log(res, 'res');
                    this.iconLoading = false;
                } else {
                    this.iconLoading = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        // 登录
        login(formName) {
            this.iconLoading = true;
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    let params = {
                        userName: this.loginForm.username,
                        password: this.loginForm.password
                    };
                    let res = await this.$api['user/login'](params);
                    console.log(res, 'res');
                    this.iconLoading = false;
                } else {
                    this.iconLoading = false;
                    console.log('error submit!!');
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
        },

        // 发送验证码
        getCode() {
            const TIME_COUNT = 60;
            if (!this.intervalBtn) {
                this.count = TIME_COUNT;
                this.show = false;
                this.intervalBtn = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        this.btnMsg = '重新发送';
                        clearInterval(this.intervalBtn);
                        this.intervalBtn = null;
                    }
                }, 1000);
            }
        },

        // 关闭弹窗
        handleClose() {
            this.$emit('close');
        },

        // 登录、注册切换
        doToggle() {
            // 清空表单残留信息
            this.$refs['ruleForm'].resetFields();
            this.isLogin = !this.isLogin;
        }
    }
};
</script>

<style scoped lang="less">
// 邮箱验证
.email-container.login-container {
    .modal-scroll {
        .main {
            height: 500px;
            margin-top: -250px;
        }

        .logo-container.email-logo {
            margin: 68px 0 76px;
            text-align: center;
        }
    }
}

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

            .email-check-container {
                /deep/ .ant-input-suffix {
                    right: 0;
                }

                .email-btn {
                    background: #fff;
                    border-color: #edf2f7;
                    border-width: 4px;
                    color: #718096;
                    font-size: 14px;
                    line-height: 32px;
                    box-shadow: none;

                    &:hover {
                        box-shadow: none;
                        color: #388ae8;
                    }
                }

                .email-btn[disabled] {
                    background: #f5f5f5;
                }
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

                /deep/ .ant-form-item-label > label {
                    color: #718096;
                    font-size: 14px;
                }

                /deep/ .ant-row.ant-form-item-with-help {
                    margin-bottom: 12px;
                }

                /deep/ .ant-form-item {
                    margin-bottom: 31px;
                }

                .button-container {
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
                    span {
                        color: #718096;
                    }

                    a {
                        color: #388ae8;
                    }
                }

                .email-check-tips {
                    color: #718096;

                    .text-primary {
                        color: #388ae8;

                        &:hover {
                            color: #1060a2;
                        }
                    }
                }
            }
        }
    }
}
</style>

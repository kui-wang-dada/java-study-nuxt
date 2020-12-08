//邮箱
const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

// 账号
const userNameRegex = /^[a-zA-Z0-9_-]{4,16}$/;

// 密码
const passWordRegex = /^[a-zA-Z0-9]{6,20}$/;

//手机
const mobileRegex = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

//电话号码
const telephoneRegex = /^((\d{3,4}-)|\d{3.4}-)?\d{7,8}$/;

//模块导出
export default {
    emailRegex,
    userNameRegex,
    passWordRegex,
    mobileRegex,
    telephoneRegex
};

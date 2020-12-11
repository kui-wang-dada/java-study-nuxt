export default [
    {
        name: 'login',
        method: 'POST',
        desc: '登录',
        path: '/user/login'
    },
    {
        name: 'register',
        method: 'POST',
        desc: '注册',
        path: '/user/register'
    },
    {
        name: 'sendEmail',
        method: 'POST',
        desc: '发送激活邮件',
        path: '/user/register/sendEmail'
    },
    {
        name: 'registerActive',
        method: 'POST',
        desc: '激活',
        path: '/user/register/activation'
    }
];

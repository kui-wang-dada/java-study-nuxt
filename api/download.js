export default [
    {
        name: 'selectArticleDownLoad',
        method: 'GET',
        desc: '资料列表查询',
        path: '/article/java/download/selectArticleDownLoad'
    },
    {
        name: 'insetInspire',
        method: 'POST',
        desc: '点赞',
        path: '/article/article/inspire/insetInspire'
    },
    {
        name: 'insetComment',
        method: 'POST',
        desc: '评论',
        path: '/article/article/comment/insetComment'
    },
    {
        name: 'deleteComment',
        method: 'POST',
        desc: '删除评论',
        path: '/article/article/comment/deleteComment'
    },
    {
        name: 'dataDownLoad',
        method: 'POST',
        desc: '资料下载',
        path: '/article/article/download/dataDownLoad'
    }
];

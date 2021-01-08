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
        name: 'insetCommentReply',
        method: 'POST',
        desc: '回复评论',
        path: '/article/article/comment/insetCommentReply'
    },
    {
        name: 'deleteComment',
        method: 'POST',
        desc: '删除评论',
        path: '/article/article/comment/deleteComment'
    },
    {
        name: 'deleteCommentReply',
        method: 'POST',
        desc: '删除回复评论',
        path: '/article/article/comment/deleteCommentReply'
    },
    {
        name: 'dataDownLoad',
        method: 'GET',
        desc: '资料下载',
        path: '/article/article/download/dataDownLoad'
    },
    {
        name: 'commentInspire',
        method: 'POST',
        desc: '评论点赞',
        path: '/article/article/inspire/commentInspire'
    }
];

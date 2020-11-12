<template>
    <aside class="aside-left">
        <div class="swiper">
            <swiper />
        </div>
        <div class="download-list shadow">
            <ul class="list-ul">
                <li v-for="(item, index) in list" :key="item.id">
                    <div class="download-item flex">
                        <div class="left">
                            <div class="avatar-wrap">
                                <img :src="item.head" alt="用户头像" class="avatar" />
                            </div>
                        </div>
                        <div class="right">
                            <div class="info-row flex-s-b">
                                <div class="flex-align">
                                    <div class="user-name">fend.</div>
                                    <div class="public-time">今天11:41</div>
                                </div>
                            </div>
                            <div class="title">
                                <span class="tag" :class="'tag' + (index + 1)" v-if="index + 1 <= 3">
                                    <i class="iconfont icon-redu1"></i>
                                </span>
                                <span>【{{ item.id }}】{{ item.title }}</span>
                            </div>
                            <div class="operations flex-s-b">
                                <div class="btns flex-align">
                                    <div class="btn">
                                        <i class="iconfont icon-xiazailiang"></i>
                                        <span class="btn-text">88</span>
                                    </div>
                                    <div class="btn">
                                        <i class="iconfont icon-dianzan3"></i>
                                        <span class="btn-text">5</span>
                                    </div>
                                    <div class="btn" @click="showCommentForm(item)">
                                        <i class="iconfont icon-pinglun1"></i>
                                        <span class="btn-text">8</span>
                                    </div>
                                </div>
                                <div class="btn-column">
                                    <div class="btn flex-align-center" @click="handleDownload(index)">
                                        <i class="iconfont icon-xiazailiang"></i>
                                        下载
                                    </div>
                                </div>
                            </div>
                            <div class="reply-list" v-if="item.childs && item.childs.length > 0">
                                <div class="reply-item flex" v-for="child in item.childs" :key="child.id">
                                    <div class="left">
                                        <div class="avatar-wrap">
                                            <img :src="child.head" alt="用户头像" class="avatar" />
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="info-row flex-s-b">
                                            <div class="flex-align">
                                                <div class="reply-name">fend.</div>
                                                <div class="public-time">今天11:41</div>
                                            </div>
                                        </div>
                                        <div class="desc_para">
                                            开发者说的是软件版本不是系统版本
                                        </div>
                                        <div class="operations">
                                            <div class="btns flex-align">
                                                <div class="btn">
                                                    <i class="iconfont icon-dianzan3"></i>
                                                    <span class="btn-text">点赞</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
import swiper from '@/components/home/swiper';
export default {
    components: {
        swiper
    },
    props: {},
    data() {
        return {
            list: [
                {
                    id: 'AA001',
                    head: 'https://mirror-gold-cdn.xitu.io/168e09bdb66bcf662a4?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
                    title: 'SpringBoot+ ElasticSearch实现全文搜索功能-源码',
                    date: '1小时前',
                    downloadNum: 89,
                    integral: 4,
                    isForm: false,
                    content: '链接: https://pan.baidu.com/s/1-6EupUOaH6mEKj2kWnL52A  密码: v0ca --来自百度网盘超级会员V5的分享',
                    childs: [
                        {
                            id: 2,
                            head: '//static001.geekbang.org/account/avatar/00/0f/f7/6e/04f9a672.jpg?x-oss-process=image/resize,w_200,h_200',
                            name: '阿牛',
                            content: '网络喷子原型？',
                            date: '一天前',
                            like: 0,
                            at: '谋生',
                            isReply: false,
                            placeholderText: '11'
                        },
                        {
                            id: 3,
                            head: 'https://static.woshipm.com/TTW_USER_202004_20200414140658_1283.jpg?imageView2/2/w/80/size-limit/5k!?imageView2/2/w/80/size-limit/5k!',
                            name: '谋生',
                            content: '这不是有手就行？',
                            date: '一周前',
                            like: 1,
                            isReply: false,
                            placeholderText: '11'
                        }
                    ]
                },
                {
                    id: 'AC783',
                    head: 'https://static.woshipm.com/WX_U_202007_20200716143737_5864.jpg?imageView2/2/w/80/size-limit/5k!?imageView2/2/w/80/size-limit/5k!',
                    title: 'LeetCode刷题实战60道-源码',
                    date: '15小时前',
                    downloadNum: 78,
                    isForm: false,
                    integral: 3,
                    content: '复制这段内容后打开百度网盘手机App，操作更方便哦 链接：https://pan.baidu.com/s/1uaSy5GUUwJfudH63-vVRIA 提取码：15PT --来自百度网盘超级会员V5的分享'
                },
                {
                    id: 'GA045',
                    head: 'https://static.woshipm.com/TTW_USER_202004_20200424094658_6148.jpg?imageView2/2/w/80/size-limit/5k!?imageView2/2/w/80/size-limit/5k!',
                    title: 'SpringBoot+Vue前后端分离实现邮件定时发送功能-全套视频',
                    date: '一天前',
                    downloadNum: 67,
                    isForm: false,
                    integral: 10,
                    content: '链接：https://pan.baidu.com/s/1FUQctOm7_jWPoVituGnxvg 提取码：xj21 复制这段内容后打开百度网盘手机App，操作更方便哦'
                },
                {
                    id: 'HA883',
                    head: 'https://static.woshipm.com/TTW_USER_R201706_20170602174604_6218.jpg?imageView2/2/w/80/size-limit/5k!?imageView2/2/w/80/size-limit/5k!',
                    title: 'Springboot+Vue前后端分离实现Excle文件导入并在前端页面回显功能-源码',
                    date: '一周前',
                    downloadNum: 40,
                    isForm: false,
                    integral: 8,
                    content: '复制这段内容后打开百度网盘手机App，操作更方便哦 链接：https://pan.baidu.com/s/1K_HmdnsUofe_TnYFpFNdgA 提取码：6098 --来自百度网盘超级会员V5的分享'
                },
                {
                    id: 'Y0089',
                    head: 'https://static.woshipm.com/WX_U_202010_20201009070042_2416.jpg?imageView2/2/w/80/size-limit/5k!?imageView2/2/w/80/size-limit/5k!',
                    title: '前端开发核心知识进阶',
                    date: '2020-09-22 22:00',
                    downloadNum: 16,
                    isForm: false,
                    integral: 9,
                    content: '复制这段内容后打开百度网盘手机App，操作更方便哦 链接:https://pan.baidu.com/s/1a9iL8PTDft8qs6iBm3kZZg 提取码:oa64'
                }
            ],
            index: '', // 当前索引
            btnText: '评论'
        };
    },
    computed: {},
    created() {},
    mounted() {
        this.handleData();
    },
    watch: {},
    methods: {
        // 评论按钮
        onSubmit(content) {
            console.log(content);
        },

        // 是否显示评论表单
        showCommentForm(item) {
            console.log(item);
            item.isForm = !item.isForm;
        },

        // 处理列表数据
        handleData() {
            this.list.forEach(item => {
                item.code = this.handleCode(item);
                item.link = this.handleLink(item);
            });
        },

        // 提取链接
        handleLink(item) {
            let reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
            return item.content.match(reg).join('');
        },

        // 提取提取码
        handleCode(item) {
            let pwd = item.content.match(/密码: (\S*) --/);
            let code = item.content.match(/提取码：(\S*) --/);
            let code1 = item.content.match(/提取码：(\S*) 复制/);
            let code2 = item.content.match(/提取码:(\S*)/);
            // 密码
            if (pwd && pwd.length) {
                return pwd[1];
            }
            // 提取码
            if (code && code.length) {
                return code[1];
            }
            // 提取码1
            if (code1 && code1.length) {
                return code1[1];
            }
            // 提取码2
            if (code2 && code2.length) {
                return code2[1];
            }
        },

        // 下载按钮事件
        handleDownload(index) {
            this.dialogInquiryVisible = true;
            this.inquiry = this.list[index];
            console.log(this.inquiry);

            disableScroll();
        }
    }
};
</script>

<style scoped lang="less">
.aside-left {
    width: 680px;
    transition: ease-in-out 0.5s;
    border-radius: 4px;

    .swiper {
        width: 680px;
        margin-bottom: 10px;
    }

    .download-list {
        border-radius: 4px 4px 0 0;
        background-color: #fff;

        .list-ul li {
            border-top: 1px solid #f2f2f2;

            &:first-child {
                border: none;
            }
        }

        .download-item {
            padding: 30px;
            position: relative;

            .left {
                margin-right: 15px;

                .avatar-wrap {
                    .avatar {
                        width: 42px;
                        height: 42px;
                        display: block;
                        background: #d0d4d7;
                        border-radius: 100%;
                    }
                }
            }

            .right {
                flex: 1;

                .info-row {
                    margin: 5px 0 8px 0;

                    .user-name {
                        font-size: 16px;
                        color: #2e3135;
                        font-weight: 600;
                        margin-right: 10px;
                    }

                    .public-time {
                        font-size: 12px;
                        color: #b2b2b2;
                    }
                }

                .title {
                    font-size: 16px;
                    line-height: 24px;
                    color: #303030;

                    .tag {
                        width: 30px;
                        height: 20px;
                        border-radius: 4px;
                        color: #fff;
                        font-size: 12px;
                        line-height: 20px;
                        display: inline-block;
                        text-align: center;

                        .icon-redu1 {
                            font-size: 14px;
                        }
                    }

                    .tag1 {
                        background: linear-gradient(90deg, rgb(255, 0, 0), #ff5750);
                    }

                    .tag2 {
                        background: linear-gradient(90deg, rgb(255, 89, 0), #ff5750);
                    }

                    .tag3 {
                        background: linear-gradient(90deg, rgb(255, 162, 0), #ff5750);
                    }
                }

                .operations {
                    margin-top: 10px;

                    .btns {
                        justify-content: flex-end;

                        .btn {
                            display: inline-block;
                            cursor: pointer;
                            color: #446586;
                            user-select: none;
                            margin-left: 15px;
                            vertical-align: middle;

                            &:hover {
                                color: @main-col;

                                .iconfont {
                                    color: @main-col;
                                }

                                .btn-text {
                                    text-decoration: underline;
                                }
                            }

                            &:first-child {
                                margin: 0;
                            }

                            .iconfont {
                                color: #446586;
                                font-size: 18px;
                                vertical-align: middle;
                            }

                            .btn-text {
                                font-size: 14px;
                                vertical-align: middle;
                            }
                        }
                    }

                    .btn-column {
                        .btn {
                            width: 70px;
                            height: 30px;
                            background-color: @main-col;
                            color: #fff;
                            font-size: 14px;
                            border-radius: 3px;
                            cursor: pointer;

                            &:hover {
                                opacity: 0.9;
                            }

                            .icon-xiazailiang {
                                font-size: 16px;
                                color: #fff;
                                margin: 2px 3px 0 0;
                            }
                        }
                    }
                }

                .reply-list {
                    position: relative;
                    box-sizing: border-box;
                    background-color: rgba(0, 0, 0, 0.02);
                    border-radius: 4px;
                    padding: 0 20px;
                    margin-top: 30px;

                    .reply-item {
                        position: relative;
                        border-bottom: 0.5px solid #f0f1f3;
                        padding: 20px 0;

                        .left {
                            margin-right: 8px;

                            .avatar-wrap {
                                .avatar {
                                    width: 32px;
                                    height: 32px;
                                    display: block;
                                    background: #d0d4d7;
                                    border-radius: 100%;
                                }
                            }
                        }

                        .right {
                            .info-row {
                                margin: 5px 0 6px 0;

                                .reply-name {
                                    font-size: 14px;
                                    color: #2e3135;
                                    margin-right: 10px;
                                }
                            }
                        }

                        .operations {
                            margin: 8px 0 0 0;
                        }

                        &:first-child {
                            border: none;
                        }
                    }
                }
            }
        }
    }
}
</style>

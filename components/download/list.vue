<template>
    <aside class="aside-left">
        <div class="search-block flex-align">
            <search />
        </div>
        <div class="download-list">
            <ul class="list-ul">
                <li class="download-item flex" v-for="(item, index) in list" :key="item.id">
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
                    </div>
                </li>
            </ul>
        </div>
        <inquiry-dialog v-if="dialogInquiryVisible" :inquiry="inquiry" @close="handleClose" @confirm="handleConfirm" />
    </aside>
</template>

<script>
import { disableScroll, openScroll } from '@/utils';
import InquiryDialog from './InquiryDialog';
import search from './search';
export default {
    components: {
        search,
        InquiryDialog
    },
    props: {},
    data() {
        return {
            dialogInquiryVisible: false,
            list: [
                {
                    id: 'AA001',
                    head: 'https://mirror-gold-cdn.xitu.io/168e09bdb66bcf662a4?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
                    title: 'SpringBoot+ ElasticSearch实现全文搜索功能-源码',
                    date: '1小时前',
                    downloadNum: 89,
                    integral: 4,
                    content: '链接: https://pan.baidu.com/s/1-6EupUOaH6mEKj2kWnL52A  密码: v0ca --来自百度网盘超级会员V5的分享'
                },
                {
                    id: 'AC783',
                    head: 'https://static.woshipm.com/WX_U_202007_20200716143737_5864.jpg?imageView2/2/w/80/size-limit/5k!?imageView2/2/w/80/size-limit/5k!',
                    title: 'LeetCode刷题实战60道-源码',
                    date: '15小时前',
                    downloadNum: 78,
                    integral: 3,
                    content: '复制这段内容后打开百度网盘手机App，操作更方便哦 链接：https://pan.baidu.com/s/1uaSy5GUUwJfudH63-vVRIA 提取码：15PT --来自百度网盘超级会员V5的分享'
                },
                {
                    id: 'GA045',
                    head: 'https://static.woshipm.com/TTW_USER_202004_20200424094658_6148.jpg?imageView2/2/w/80/size-limit/5k!?imageView2/2/w/80/size-limit/5k!',
                    title: 'SpringBoot+Vue前后端分离实现邮件定时发送功能-全套视频',
                    date: '一天前',
                    downloadNum: 67,
                    integral: 10,
                    content: '链接：https://pan.baidu.com/s/1FUQctOm7_jWPoVituGnxvg 提取码：xj21 复制这段内容后打开百度网盘手机App，操作更方便哦'
                },
                {
                    id: 'HA883',
                    head: 'https://static.woshipm.com/TTW_USER_R201706_20170602174604_6218.jpg?imageView2/2/w/80/size-limit/5k!?imageView2/2/w/80/size-limit/5k!',
                    title: 'Springboot+Vue前后端分离实现Excle文件导入并在前端页面回显功能-源码',
                    date: '一周前',
                    downloadNum: 40,
                    integral: 8,
                    content: '复制这段内容后打开百度网盘手机App，操作更方便哦 链接：https://pan.baidu.com/s/1K_HmdnsUofe_TnYFpFNdgA 提取码：6098 --来自百度网盘超级会员V5的分享'
                },
                {
                    id: 'Y0089',
                    head: 'https://static.woshipm.com/WX_U_202010_20201009070042_2416.jpg?imageView2/2/w/80/size-limit/5k!?imageView2/2/w/80/size-limit/5k!',
                    title: '前端开发核心知识进阶',
                    date: '2020-09-22 22:00',
                    downloadNum: 16,
                    integral: 9,
                    content: '复制这段内容后打开百度网盘手机App，操作更方便哦 链接:https://pan.baidu.com/s/1a9iL8PTDft8qs6iBm3kZZg 提取码:oa64'
                }
            ],
            index: '' // 当前索引
        };
    },
    computed: {},
    created() {},
    mounted() {
        this.handleData();
    },
    watch: {},
    methods: {
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
        },

        // 确定下载
        handleConfirm(item) {
            console.log(item);
            setTimeout(() => {
                this.dialogInquiryVisible = false;
                window.open(item.link, '_blank');
            }, 1000);
        },

        // 关闭
        handleClose() {
            this.dialogInquiryVisible = false;
            openScroll();
        }
    }
};
</script>

<style scoped lang="less">
.aside-left {
    width: 680px;
    min-height: 400px;
    transition: ease-in-out 0.5s;
    background-color: #fff;
    border-radius: 4px;

    .search-block {
        height: 70px;
    }

    .download-list {
        border-radius: 4px 4px 0px 0px;

        .download-item {
            border-top: 1px solid #f2f2f2;
            padding: 30px;
            position: relative;

            &:hover {
                background-color: #fafbfc;
            }

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
                            border-radius: 4px;
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
            }
        }
    }
}
</style>

<template>
    <aside class="aside-left">
        <div class="search-block flex-align">
            <search />
        </div>
        <div class="download-list">
            <ul class="list-ul">
                <li v-for="(item, index) in list" :key="item.id">
                    <div class="download-item flex">
                        <div class="left">
                            <div class="avatar-box" v-if="item.headImg">
                                <a-avatar :size="42" :src="item.headImg" :alt="item.userName" />
                            </div>
                            <div class="avatar-box no-img" v-else>{{ item.userName | firstUserName }}</div>
                        </div>
                        <div class="right">
                            <div class="info-row flex-s-b">
                                <div class="flex-align">
                                    <div class="user-name">{{ item.userName }}</div>
                                    <div class="public-time">{{ item.createTime | formatTimeStamp }}</div>
                                </div>
                            </div>
                            <div class="title">
                                <span class="tag" :class="'tag' + (index + 1)" v-if="index + 1 <= 3">
                                    <i class="iconfont icon-redu1"></i>
                                </span>
                                <span>【{{ item.number }}】{{ item.title }}</span>
                            </div>
                            <div class="operations flex-s-b">
                                <div class="btns flex-align">
                                    <div class="btn">
                                        <i class="iconfont icon-xiazailiang"></i>
                                        <span class="btn-text" v-if="parseInt(item.downloadNum) > 0">{{ item.downloadNum }}</span>
                                    </div>
                                    <div class="btn" :class="item.likeIt ? 'active' : ''" @click="insetInspire(item.id, index)">
                                        <i class="iconfont icon-dianzan3" title="赞一个"></i>
                                        <span class="btn-text" v-if="parseInt(item.inspireNum) > 0">{{ item.inspireNum }}</span>
                                    </div>
                                    <div class="btn" @click="showCommentForm(index)">
                                        <i class="iconfont icon-pinglun1"></i>
                                        <span class="btn-text" v-if="item.commentList.length > 0">{{ item.commentList.length }}</span>
                                    </div>
                                </div>
                                <div class="btn-column">
                                    <div class="btn flex-align-center" @click="handleDownload(index)">
                                        <i class="iconfont icon-xiazailiang"></i>
                                        下载
                                    </div>
                                </div>
                            </div>
                            <div v-if="item.isForm">
                                <div class="reply-form">
                                    <edit-div @submit="onSubmit($event, item, index)" :maxLength="200" :btnText="btnText" />
                                </div>
                                <div class="reply-list" v-if="item.commentList && item.commentList.length > 0">
                                    <div class="reply-item flex" v-for="child in item.commentList" :key="child.id">
                                        <div class="left">
                                            <div class="avatar-box" v-if="child.headImg">
                                                <a-avatar :size="32" :src="child.headImg" :alt="child.userName" />
                                            </div>
                                            <div class="avatar-box no-img" v-else>{{ child.userName | firstUserName }}</div>
                                        </div>
                                        <div class="right">
                                            <div class="info-row flex-s-b">
                                                <div class="flex-align">
                                                    <div class="reply-name">{{ child.userName }}</div>
                                                    <div class="public-time">{{ child.createTime | formatTimeStamp }}</div>
                                                </div>
                                            </div>
                                            <div class="desc_para">{{ child.commentContent }}</div>
                                            <div class="operations">
                                                <div class="btns flex-align">
                                                    <div class="btn ashbin-btn" v-if="child.creator === userInfo.id" @click="onDeleteComment(child, index)">
                                                        <i class="iconfont icon-ashbin" title="删除"></i>
                                                        <span class="btn-text"></span>
                                                    </div>
                                                    <div class="btn ml-8">
                                                        <i class="iconfont icon-dianzan3" title="赞一个"></i>
                                                        <span class="btn-text"></span>
                                                    </div>
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
        <inquiry-dialog v-if="dialogInquiryVisible" :inquiry="inquiry" @close="handleClose" @confirm="handleConfirm" />
    </aside>
</template>

<script>
import { disableScroll, openScroll, timestampFormat } from '@/utils';
import EditDiv from './EditDiv';
import InquiryDialog from './InquiryDialog';
import search from './search';
export default {
    components: {
        search,
        InquiryDialog,
        EditDiv
    },
    props: {
        list: {
            type: Array,
            default: []
        },
        // 分页查询数据
        pageRequest: {
            type: Object,
            default: () => ({
                page: 1,
                pageSize: 10
            })
        },
        // loading
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dialogInquiryVisible: false,
            index: '', // 当前索引
            btnText: '评论'
        };
    },
    filters: {
        // 时间格式化
        formatTimeStamp(val) {
            return timestampFormat(val / 1000);
        },

        // 用户名首字母
        firstUserName(val) {
            return val.substring(0, 1).toUpperCase();
        }
    },
    computed: {
        // userInfo
        userInfo() {
            return this.$store.state.user.userInfo;
        }
    },
    created() {},
    mounted() {},
    watch: {},
    methods: {
        // 评论按钮
        onSubmit(content, item, index) {
            item.content = content; // 评论内容
            item.index = index; // 索引
            this.$emit('insetComment', item);
        },

        // 是否显示评论模块
        showCommentForm(index) {
            this.$emit('showComment', index);
        },

        // 删除评论
        onDeleteComment(e, index) {
            e.index = index; // 索引
            this.$emit('deleteComment', e);
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
            // this.$emit('download', this.list[index]);

            // disableScroll();
        },

        // 确定下载
        handleConfirm(item) {
            this.$emit('download', item);
            this.dialogInquiryVisible = false;
        },

        // 关闭
        handleClose() {
            this.dialogInquiryVisible = false;
            openScroll();
        },

        // 点赞/取消点赞
        insetInspire(id, index) {
            this.$emit('insetInspire', {
                id,
                index
            });
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
            padding: 20px 30px;
            position: relative;

            // &:hover {
            //     background-color: #fafbfc;
            // }

            .left {
                margin-right: 15px;

                .avatar-box {
                    width: 42px;
                    height: 42px;
                    box-shadow: 0 0 0 2px rgba(65, 105, 226, 0.2);
                    border-radius: 50%;
                }

                .no-img {
                    color: #fff;
                    line-height: 42px;
                    font-size: 14px;
                    border-color: #4669e7;
                    background-color: #4669e7;
                    text-align: center;
                    text-transform: uppercase;
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

                        .btn.active {
                            color: @main-col;

                            .iconfont {
                                color: @main-col;
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

                .reply-form {
                    margin-top: 30px;
                }

                .reply-list {
                    position: relative;
                    box-sizing: border-box;
                    background-color: rgba(0, 0, 0, 0.01);
                    border-radius: 4px;
                    padding: 0 20px;
                    margin-top: 30px;

                    .reply-item {
                        position: relative;
                        border-bottom: 0.5px solid #f0f1f3;
                        padding: 14px 0;

                        &:hover {
                            .operations {
                                .ashbin-btn {
                                    display: block;
                                }
                            }
                        }

                        .left {
                            margin-right: 8px;

                            .avatar-box {
                                width: 32px;
                                height: 32px;
                                box-shadow: 0 0 0 2px rgba(65, 105, 226, 0.2);
                                border-radius: 50%;
                            }

                            .no-img {
                                color: #fff;
                                line-height: 32px;
                                font-size: 14px;
                                border-color: #4669e7;
                                background-color: #4669e7;
                                text-align: center;
                                text-transform: uppercase;
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
                            margin: 4px 0 0 0;

                            .ashbin-btn {
                                display: none;
                            }
                        }

                        &:last-child {
                            border: none;
                        }
                    }
                }
            }
        }
    }
}
</style>

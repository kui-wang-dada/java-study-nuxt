<template>
    <aside class="aside-left">
        <!-- 搜索模块 -->
        <div class="search-block flex-align">
            <search @search="onSearch" />
        </div>

        <!-- 列表模块 -->
        <div class="download-list" v-if="list.length">
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
                                    <div class="public-time" :title="item.createTime | formatTimers">{{ item.createTime | formatTimeStamp }}</div>
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
                                        <i class="iconfont icon-dianzan3" title="点赞"></i>
                                        <span class="btn-text" v-if="parseInt(item.inspireNum) > 0">{{ item.inspireNum }}</span>
                                    </div>
                                    <div class="btn" @click="showCommentForm(index)">
                                        <i class="iconfont icon-pinglun1" title="评论"></i>
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
                                    <div class="reply-item flex" v-for="(child, C) in item.commentList" :key="child.id">
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
                                                </div>
                                            </div>
                                            <div class="desc_para" v-html="child.commentContent"></div>
                                            <div class="operations flex-s-b">
                                                <div class="public-time" :title="child.createTime | formatTimers">{{ child.createTime | formatTimeStamp }}</div>
                                                <div class="btns flex-align">
                                                    <div class="btn ashbin-btn" v-if="child.creator === userInfo.id" @click="onDeleteComment(child, index, 'deleteComment')">
                                                        <i class="iconfont icon-ashbin" title="删除"></i>
                                                    </div>
                                                    <div class="btn" :class="child.likeIt ? 'active' : ''" @click="commentInspire(child.id, index, C)">
                                                        <i class="iconfont icon-dianzan3" title="点赞"></i>
                                                        <span class="btn-text" v-if="parseInt(child.inspireNum) > 0">{{ child.inspireNum }}</span>
                                                    </div>
                                                    <!--  v-if="item.creator === userInfo.id" -->
                                                    <div class="btn" @click="showReplyCommentForm(child.id, index, C)">
                                                        <i class="iconfont icon-changyonghuifu" title="回复"></i>
                                                        <span class="btn-text">回复</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="reply-form" v-if="child.isReplyForm">
                                                    <edit-div
                                                        @submit="onReplySubmit($event, child, C)"
                                                        :placeholderText="child.placeholderText"
                                                        :isReplyForm="true"
                                                        :maxLength="200"
                                                        :btnText="btnText"
                                                    />
                                                </div>
                                                <div class="reply-list" v-if="child.replyList && child.replyList.length > 0" style="background-color: rgba(0, 0, 0, 0.01);">
                                                    <div class="reply-item flex reply-two" v-for="reply in child.replyList" :key="reply.id">
                                                        <div class="left">
                                                            <div class="avatar-box" v-if="reply.headImg">
                                                                <a-avatar :size="32" :src="reply.headImg" :alt="reply.userName" />
                                                            </div>
                                                            <div class="avatar-box no-img" v-else>{{ reply.userName | firstUserName }}</div>
                                                        </div>
                                                        <div class="right">
                                                            <div class="info-row flex-s-b">
                                                                <div class="flex-align">
                                                                    <div class="reply-name">
                                                                        {{ reply.userName }}
                                                                        <span class="author" v-if="isAuthor(item.creator, reply.creator)">{{ isAuthor(item.creator, reply.creator) }}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="desc_para" v-html="reply.commentContent"></div>
                                                            <div class="operations flex-s-b">
                                                                <div class="public-time" :title="reply.createTime | formatTimers">{{ reply.createTime | formatTimeStamp }}</div>
                                                                <div class="btns flex-align">
                                                                    <div class="btn ashbin-btn-two" v-if="reply.creator === userInfo.id" @click="onDeleteComment(reply, index, 'deleteCommentReply')">
                                                                        <i class="iconfont icon-ashbin" title="删除"></i>
                                                                    </div>
                                                                    <!-- <div class="btn" @click="showReplyCommentForm(child.id, index, C)">
                                                                        <i class="iconfont icon-changyonghuifu" title="回复"></i>
                                                                        <span class="btn-text">回复</span>
                                                                    </div> -->
                                                                </div>
                                                            </div>
                                                        </div>
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
        <empty v-if="!list.length" />
        <inquiry-dialog v-if="dialogInquiryVisible" :inquiry="inquiry" @close="handleClose" @confirm="handleConfirm" />
    </aside>
</template>

<script>
import { disableScroll, openScroll, timestampFormat, formatTimer } from '@/utils';
import EditDiv from './EditDiv';
import InquiryDialog from './InquiryDialog';
import search from './search';
import empty from '@/components/common/emptyTwo';
export default {
    components: {
        search,
        InquiryDialog,
        EditDiv,
        empty
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
            btnText: '评论',
            inquiryIndex: ''
        };
    },
    filters: {
        // 时间格式化
        formatTimeStamp(val) {
            return timestampFormat(val / 1000);
        },

        // 格式化时间
        formatTimers(val) {
            return formatTimer(val / 1000, 'YYMMDDHHMM');
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
        },

        // token
        getToken() {
            return this.$store.state.user.token;
        },

        // 判断是否是作者
        isAuthor(id, replyId) {
            return function(id, replyId) {
                return id === replyId ? '(作者)' : '';
            };
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

        // 回复评论按钮
        onReplySubmit(content, item, index) {
            item.content = content; // 评论内容
            item.index = index; // 索引
            this.$emit('insetCommentReply', item);
        },

        // 是否显示评论模块
        showCommentForm(index) {
            this.$emit('showComment', index);
        },

        // 是否显示回复评论模块
        showReplyCommentForm(id, index, c_index) {
            this.$emit('showReplyComment', {
                id: id,
                index,
                c_index
            });
        },

        // 删除评论
        onDeleteComment(e, index, type) {
            e.index = index; // 索引
            e.type = type;
            this.$emit('deleteComment', e);
        },

        // 下载按钮事件
        handleDownload(index) {
            if (!this.isLogin()) {
                this.$store.commit('SET_DIALO_LOGIN_VISIBLE', true);
                return;
            }

            if (!this.isAuth()) {
                this.$message.warning('请先关注公众号进行认证');
                this.$store.commit('SET_DIALO_AUTH_VISIBLE', true);
                return;
            }

            this.dialogInquiryVisible = true;
            this.inquiry = this.list[index];
            this.inquiryIndex = index;
        },

        // 搜索
        onSearch(e) {
            this.$emit('search', e);
        },

        // 确定下载
        handleConfirm(item) {
            this.dialogInquiryVisible = false;
            item.index = this.inquiryIndex;
            this.$emit('download', item);
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
        },

        // 评论点赞/取消点赞
        commentInspire(id, index, c_index) {
            this.$emit('commentInspire', {
                id,
                index,
                c_index
            });
        },

        // 是否登录
        isLogin() {
            return this.getToken ? true : false;
        },

        // 是否认证
        isAuth() {
            return this.userInfo.auth === '1' ? true : false;
        }
    }
};
</script>

<style scoped lang="less">
.aside-left {
    width: 680px;
    transition: ease-in-out 0.5s;
    background-color: #fff;
    border-radius: 4px;

    .search-block {
        height: 55px;
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
                        cursor: pointer;
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
                    // background-color: rgba(0, 0, 0, 0.01);
                    border-radius: 4px;
                    padding: 0 20px;
                    margin-top: 20px;

                    .reply-two {
                        &:hover {
                            .operations {
                                .btn.ashbin-btn-two {
                                    visibility: visible;
                                }
                            }
                        }
                    }

                    .reply-item {
                        position: relative;
                        border-bottom: 0.5px solid #f0f1f3;
                        padding: 14px 0;

                        &:hover {
                            .operations {
                                .btn.ashbin-btn {
                                    visibility: visible;
                                }
                            }
                        }

                        .left {
                            margin-right: 10px;

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
                                margin: 2px 0;

                                .reply-name {
                                    font-size: 14px;
                                    color: #2e3135;
                                    margin-right: 10px;

                                    .author {
                                        font-size: 14px;
                                        color: #2e3135;
                                        margin-left: 2px;
                                    }
                                }
                            }
                        }

                        .operations {
                            margin: 8px 0 0 0;

                            .public-time {
                                font-size: 12px;
                                color: #b2b2b2;
                                cursor: pointer;
                            }

                            .btns {
                                .btn {
                                    display: flex;
                                    align-items: center;

                                    .iconfont {
                                        width: 16px;
                                        height: 16px;
                                        font-size: 16px;
                                    }

                                    .btn-text {
                                        margin-left: 2px;
                                    }
                                }
                            }

                            .btn.ashbin-btn,
                            .btn.ashbin-btn-two {
                                visibility: hidden;
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

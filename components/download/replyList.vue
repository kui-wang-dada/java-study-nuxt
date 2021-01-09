<template>
    <div class="reply-list" v-if="list && list.length > 0">
        <div class="reply-item flex" v-for="(item, index) in list" :key="item.id">
            <div class="left">
                <div class="avatar-box" v-if="item.headImg">
                    <a-avatar :size="32" :src="item.headImg" :alt="item.userName" />
                </div>
                <div class="avatar-box no-img" v-else>{{ item.userName | firstUserName }}</div>
            </div>
            <div class="right">
                <div class="info-row flex-s-b">
                    <div class="flex-align">
                        <div class="reply-name">{{ item.userName }}</div>
                    </div>
                </div>
                <div class="desc_para" v-html="item.commentContent"></div>
                <div class="operations flex-s-b">
                    <div class="public-time" :title="item.createTime | formatTimers">{{ item.createTime | formatTimeStamp }}</div>
                    <div class="btns flex-align">
                        <div class="btn ashbin-btn" v-if="item.creator === userInfo.id" @click="onDeleteComment(item, index)">
                            <i class="iconfont icon-ashbin" title="删除"></i>
                        </div>
                        <div class="btn" @click="commentInspire(item.id, index)">
                            <i class="iconfont icon-dianzan3" title="点赞"></i>
                            <span class="btn-text" v-if="parseInt(item.inspireNum) > 0">{{ item.inspireNum }}</span>
                        </div>
                        <div class="btn" v-if="item.creator === userInfo.id" @click="showReplyCommentForm(item.id, index)">
                            <i class="iconfont icon-changyonghuifu" title="回复"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { disableScroll, openScroll, timestampFormat, formatTimer } from '@/utils';
export default {
    components: {},
    props: {
        item: {
            type: Object,
            default: {}
        },
        list: {
            type: Array,
            default: []
        }
    },
    data() {
        return {};
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
        }
    },
    created() {},
    mounted() {},
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
                id,
                index,
                c_index
            });
        },

        // 删除评论
        onDeleteComment(e, index) {
            e.index = index; // 索引
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
.reply-form {
    margin-top: 30px;
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
                transform: scale(1.5, 1.5);
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
    // background-color: rgba(0, 0, 0, 0.01);
    border-radius: 4px;
    padding: 0 20px;
    margin-top: 30px;

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
            width: 100%;
            .info-row {
                margin: 2px 0;

                .reply-name {
                    font-size: 14px;
                    color: #2e3135;
                    margin-right: 10px;
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

            .btn.ashbin-btn {
                visibility: hidden;
            }
        }

        &:last-child {
            border: none;
        }
    }
}
</style>

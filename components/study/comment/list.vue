<template>
    <div class="list">
        <div class="comment-item" v-for="item in list" :key="item.id">
            <div class="wrap">
                <div class="left">
                    <div class="comment-avatar">
                        <img :src="item.head" alt="用户头像" class="avatar" />
                    </div>
                </div>
                <div class="right">
                    <div class="reply-author">
                        <span class="reply-user font-size-sm">{{ item.name }}</span>
                    </div>
                    <div class="reply-content font-size-sm">
                        <span>{{ item.content }}</span>
                    </div>
                    <div class="reply-operation">
                        <!-- 样式待优化 -->
                        <div class="date">{{ item.date }}</div>
                        <div class="reply-action flex-align">
                            <span class="like-btn font-v-a">
                                <i class="iconfont icon-dianzan1"></i>
                                <em>{{ item.like }}</em>
                            </span>
                            <span class="reply-btn font-v-a">
                                <i class="iconfont icon-huifu1"></i>
                                <em>回复</em>
                            </span>
                        </div>
                    </div>
                    <div class="reply-list">
                        <div class="reply-item" v-for="child in item.childs" :key="child.id">
                            <div class="wrap">
                                <div class="left">
                                    <div class="comment-avatar">
                                        <img :src="child.head" alt="用户头像" class="avatar_reply" />
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="reply-author flex-align">
                                        <span class="reply-user font-size-xs">{{ child.name }}</span>
                                    </div>
                                    <div class="reply-content font-size-xs">
                                        <span class="reply-label font-size-xs" v-if="child.at">
                                            回复
                                            <span class="reply-user" style="font-weight: bold;">@{{ child.at }}</span>
                                            <span style="padding-right: 2px;font-weight: bold;">:</span>
                                        </span>
                                        <span>
                                            {{ child.content }}
                                        </span>
                                    </div>
                                    <div class="reply-operation">
                                        <div class="date">{{ child.date }}</div>
                                        <div class="reply-action flex-align">
                                            <span class="like-btn flex-align">
                                                <i class="iconfont icon-dianzan1"></i>
                                                <em>{{ child.like }}</em>
                                            </span>
                                            <span class="reply-btn flex-align" @click="showReplyForm(child)">
                                                <i class="iconfont icon-huifu1"></i>
                                                <em>回复</em>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="reply-form" v-if="child.isReply">
                                <edit-div @submit="onSubmit" :btnText="btnText" :placeholderText="child.placeholderText" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditDiv from './EditDiv';
export default {
    components: {
        EditDiv
    },
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            btnText: '回复'
        };
    },
    created() {},
    mounted() {},
    methods: {
        // 评论按钮
        onSubmit(content) {
            console.log(content);
        },

        // 显示回复框
        showReplyForm(item) {
            item.isReply = !item.isReply;
            item.placeholderText = `回复 ${item.name}:`;
        }
    }
};
</script>

<style scoped lang="less">
.font-size-xs {
    font-size: 14px;
}

.font-size-sm {
    font-size: 16px;
}

.list {
    margin-top: 20px;

    .reply-item {
        position: relative;
        border-bottom: 0.5px solid #f0f1f3;
        padding: 20px 0;

        & .reply-author {
            margin-top: 7px !important;
        }

        &:last-child {
            border: none;
        }
    }

    .comment-item {
        position: relative;
        padding: 20px 0;

        .wrap {
            display: flex;

            .left {
                margin-right: 15px;

                .comment-avatar {
                    .avatar,
                    .avatar_reply {
                        width: 40px;
                        height: 40px;
                        display: block;
                        background: #d0d4d7;
                        border-radius: 100%;
                    }

                    .avatar_reply {
                        width: 30px;
                        height: 30px;
                    }
                }
            }

            .right {
                flex: 1;
                .reply-author {
                    line-height: 16px;
                    margin-top: 12px;

                    .reply-user {
                        font-weight: bold;
                        color: #303030;
                    }

                    .reply-label {
                        padding: 0 8px;
                        font-weight: 300;
                        color: #303030;
                    }
                }

                .reply-content {
                    margin: 10px 0;
                    line-height: 24px;
                    font-weight: 400;
                    word-break: break-word;
                    color: #303030;
                }

                .reply-operation {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    width: 100%;
                    margin-top: 10px;
                    line-height: 1;
                    font-size: 14px;
                    font-weight: 400;
                    color: #141414;

                    .date {
                        font-size: 14px;
                        font-weight: 400;
                        color: #828a92;
                    }

                    .reply-action {
                        .like-btn,
                        .reply-btn {
                            color: #828a92;
                            cursor: pointer;
                            user-select: none;
                        }

                        .reply-btn {
                            margin-left: 12px;
                        }

                        .iconfont {
                            font-size: 16px;
                            color: #b4b9be;
                            user-select: none;
                            margin-right: 5px;

                            &:hover {
                                color: #686e75;
                            }
                        }
                    }
                }
            }
        }

        .reply-list {
            position: relative;
            box-sizing: border-box;
            margin-top: 20px;
            background-color: rgba(0, 0, 0, 0.02);
            border-radius: 4px;
            padding: 0 20px;

            .reply-form {
                margin-top: 20px;
            }
        }
    }
}
</style>

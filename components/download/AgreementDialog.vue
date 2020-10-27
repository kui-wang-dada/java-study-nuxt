<template>
    <dialog-panel @close="handleClose">
        <template #agreement>
            <div class="agreement-block">
                <div class="agreement-title">上传资料须知</div>
                <div class="agreement-content">
                    <p>
                        1、分享的链接需要设置永久
                        <span class="examples" @click="examples1 = !examples1">【查看示例】</span>
                        <img v-if="examples1" src="http://139.159.147.237/images/yongjiu.png" alt="示例图片1" />
                    </p>
                    <p>
                        2、分享的格式需要统一：直接从百度网盘复制过来粘贴就好
                        <span class="examples" @click="examples2 = !examples2">【查看示例】</span>
                        <img v-if="examples2" src="http://139.159.147.237/images/geshi.png" alt="示例图片2" />
                    </p>
                    <p>
                        3、请不要乱分享，也不要重复分享，每次分享的资料管理员会先在后台审核，如果发现恶意分享，警告三次，然后封号处理
                    </p>
                    <p>
                        4、如果你分享的资料被其他用户下载你会获得相应的学习币奖励。
                    </p>
                    <p>
                        5、有什么疑问请直接微信联系网站客服：xwj521678
                    </p>
                </div>
                <div class="buttons flex-align-center clearfix">
                    <div class="agreement-btn" @click="handleClose">我已阅读并同意</div>
                </div>
            </div>
        </template>
    </dialog-panel>
</template>


<script>
import DialogPanel from '@/components/common/dialog';
export default {
    components: {
        DialogPanel
    },
    props: {},
    data() {
        return {
            examples1: false,
            examples2: false
        };
    },
    computed: {},
    methods: {
        // 关闭弹窗
        handleClose() {
            this.$emit('close');
        },

        // 确认
        handleConfirm() {
            console.log('点击了确认');
        }
    }
};
</script>

export default {
    components: {
        DialogPanel
    },
    props: {},
    data() {
        return {
            examples1: false,
            examples2: false
        };
    },
    computed: {},
    methods: {
        // 关闭弹窗
        handleClose() {
            this.$emit('close');
        },

        // 确认
        handleConfirm() {
            console.log('点击了确认');
        }
    }
};
</script>

<style scoped lang="less">
.agreement-block {
    width: 380px;
    padding: 20px;
    box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.05);

    .agreement-title {
        background-color: #fff;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        font-weight: bold;
        color: #2c2c2c;
        text-align: center;
    }

    .agreement-content {
        height: 250px;
        overflow-y: scroll;
        overflow-x: hidden;
        text-align: left;
        font-size: 14px;
        color: #333;
        margin-top: 10px;
        padding: 0 10px;

        p {
            margin-bottom: 15px;

            .examples {
                color: #446586;
                cursor: pointer;

                &:hover {
                    color: @main-col;
                }
            }

            img {
                width: 100%;
                margin: 10px 0;
            }
        }
    }

    .buttons {
        .agreement-btn {
            display: block;
            margin-top: 20px;
            background-color: @main-col;
            height: 32px;
            line-height: 32px;
            width: 140px;
            border-radius: 4px;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
            text-align: center;

            &:hover {
                opacity: 0.9;
            }
        }
    }
}
</style>

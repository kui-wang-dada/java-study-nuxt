<template>
    <dialog-panel @close="handleClose">
        <template #inquiry>
            <div class="inquiry-block">
                <div class="title">确定要下载资料吗?</div>
                <div class="buttons flex-align-center clearfix">
                    <div class="confirm btn" @click="handleConfirm(inquiry)" :data-clipboard-text="inquiry.code">确定</div>
                    <div class="cancel" @click.stop="handleClose">取消</div>
                </div>
            </div>
        </template>
    </dialog-panel>
</template>

<script>
import Clipboard from 'clipboard';
import DialogPanel from '@/components/common/dialog';
export default {
    components: {
        DialogPanel
    },
    props: {
        inquiry: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {};
    },
    computed: {},
    methods: {
        // 关闭弹窗
        handleClose() {
            this.$emit('close');
        },

        // 确认
        handleConfirm(inquiry) {
            this.copy();
            this.$emit('confirm', inquiry);
        },

        // 复制提取码
        copy() {
            const clipboard = new Clipboard('.btn'); //单页面引用
            clipboard.on('success', e => {
                // 释放内存
                clipboard.destroy();
            });
            clipboard.on('error', e => {
                // 不支持复制
                console.log('该浏览器不支持自动复制');
                // 释放内存
                clipboard.destroy();
            });
        }
    }
};
</script>

<style scoped lang="less">
.inquiry-block {
    width: 300px;
    padding: 15px 0;
    text-align: center;
    color: #333;

    .title {
        font-size: 14px;
        padding: 30px;
    }

    .buttons {
        padding: 10px;

        .confirm,
        .cancel {
            display: inline-block;
            padding: 0 20px;
            height: 32px;
            line-height: 32px;
            color: #fff;
            text-align: center;
            cursor: pointer;
            font-size: 12px;
            border-radius: 40px;
        }

        .confirm {
            border: 1px solid @main-col;
            background-color: @main-col;
            margin-right: 30px;

            &:hover {
                opacity: 0.9;
            }
        }

        .cancel {
            border: 1px solid #dcdfe6;
            color: #606266;

            &:hover {
                color: @main-col;
                border-color: #c6e2ff;
                background-color: #ecf5ff;
            }
        }
    }
}
</style>

<template>
    <div>
        <div class="comment-form">
            <a-textarea class="comment-textarea" v-model="content" @change="onChange" :placeholder="placeholderText" :maxLength="maxLength" :auto-size="{ minRows: 2, maxRows: 4 }" />
        </div>
        <div class="comment-operation">
            <span class="max">还能输入{{ maxNum }}个字符</span>
            <a-button :disabled="!content" type="primary" class="comment-btn" @click="submit">{{ btnText }}</a-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        placeholderText: {
            type: String,
            default: '快来发表评论吧!'
        },
        btnText: {
            type: String,
            default: '评论'
        },
        maxLength: {
            type: Number,
            default: 200
        }
    },
    data() {
        return {
            content: '',
            maxNum: 0
        };
    },
    computed: {},
    created() {
        // 初始化最大输入字符串
        this.maxNum = this.maxLength;
    },
    mounted() {},
    watch: {},
    methods: {
        // 提交评论
        submit() {
            if (this.content) {
                this.$emit('submit', this.content);
            }
        },

        // 监听输入框
        onChange(e) {
            this.maxNum = this.maxLength - this.content.length;
        }
    }
};
</script>

<style scoped lang="less">
.comment-form {
    .comment-textarea {
        resize: none;
        color: #333;
    }

    .comment-textarea:focus {
        border-color: @main-col !important;
        border-right-width: 1px !important;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(65, 105, 226, 0.2);
    }

    .comment-textarea:hover {
        border-color: @main-col;
        border-right-width: 1px !important;
    }
}

.comment-operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    .max {
        font-size: 12px;
        color: #999;
        margin-left: 2px;
    }

    .comment-btn {
        background: @main-col;
        border: none;
    }

    .comment-btn[disabled='disabled'] {
        background: @main-col;
        opacity: 0.9;
        color: #fff;
    }
}
</style>

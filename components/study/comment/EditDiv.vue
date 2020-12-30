<template>
    <div>
        <section class="article-comment-block">
            <div class="comment-form">
                <div class="comment-input no-reference" :focus="isFocus">
                    <div
                        @focus="isFocus = true"
                        @blur="isFocus = false"
                        @input="domInput"
                        v-text="content"
                        ref="comment"
                        contenteditable="plaintext-only"
                        spellcheck="false"
                        :placeholder="placeholderText"
                        class="textarea comment-textarea"
                        :class="{ empty: !content }"
                    ></div>
                </div>
                <div class="comment-operation">
                    <div :disabled="!content" pl-button plbtn-color="blue" class="comment-btn Button_button_3onsJ" @click="submit">
                        {{ btnText }}
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        placeholderText: {
            type: String,
            default: '发表评论'
        },
        btnText: {
            type: String,
            default: '评论'
        }
    },
    data() {
        return {
            content: '',
            isFocus: false
        };
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {
        // 输入框监听事件
        domInput(e) {
            this.content = this.$refs.comment.innerHTML;
            this.$nextTick(() => {
                this.keepLastIndex(e.target);
            });
        },

        // 提交评论
        submit() {
            if (this.content) {
                this.$emit('submit', this.content);
            }
        },

        // 解决光标定位问题
        keepLastIndex(obj) {
            if (window.getSelection) {
                //ie11 10 9 ff safari
                obj.focus(); //解决ff不获取焦点无法定位问题
                var range = window.getSelection(); //创建range
                range.selectAllChildren(obj); //range 选择obj下所有子内容
                range.collapseToEnd(); //光标移至最后
            } else if (document.selection) {
                //ie10 9 8 7 6 5
                var range = document.selection.createRange(); //创建选择对象
                //var range = document.body.createTextRange();
                range.moveToElementText(obj); //range定位到obj
                range.collapse(false); //光标移至最后
                range.select();
            }
        }
    }
};
</script>

<style scoped lang="less">
.comment-form {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    & .comment-input.no-reference {
        padding: 0 0 0 15px;
    }

    & .comment-input {
        position: relative;
        flex-grow: 1;
        border: 1px solid #d8dedf;
        border-radius: 4px;
        transition: all 0.3s ease;
        max-width: 571px;
    }
    & .comment-input[focus] {
        border-color: #409eff;
    }

    & .comment-textarea {
        padding: 6px 15px 0 0;
        border: none;
    }

    & .comment-input:after {
        content: '';
        position: absolute;
        right: 0;
        top: 1px;
        bottom: 1px;
        z-index: 10;
        width: 15px;
        border-radius: 4px;
    }

    .textarea {
        position: relative;
        display: block;
        box-sizing: border-box;
        width: 100%;
        min-height: 36px;
        max-height: 100px;
        border-radius: 4px;
        line-height: 24px;
        font-size: 16px;
        font-weight: 400;
        resize: none;
        overflow-y: auto;
        -webkit-user-modify: read-write-plaintext-only;
        outline: none;
    }

    .textarea.empty:after {
        content: attr(placeholder);
        position: absolute;
        top: 6px;
        font-weight: 500;
        color: #828a92;
        opacity: 0.6;
    }

    .comment-operation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 16px;

        .comment-btn {
            position: relative;
            top: -1px;
            left: 0px;
            width: 83px;
            height: 37px;
            border-radius: 4px;
        }

        .Button_button_3onsJ {
            box-sizing: border-box;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            line-height: 1;
            text-size-adjust: 100%;
            transition: all 0.3s ease;
            user-select: none;
            touch-action: manipulation;
            cursor: pointer;
        }

        [plbtn-color='blue'] {
            background: #409eff;
            border: 1px solid #409eff;
            box-shadow: none;
            color: #fff;
        }

        [plbtn-color='blue'][pl-button][disabled='disabled'] {
            background: #409eff;
            opacity: 0.6;
        }

        [pl-button][disabled],
        [pl-button][disabled]:hover,
        [pl-button][disabled]:active {
            border: none;
            box-shadow: none;
            color: #fff;
            cursor: not-allowed;
        }
    }
}
</style>

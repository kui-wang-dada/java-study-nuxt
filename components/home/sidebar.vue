<template>
    <aside class="aside-right">
        <div class="title-row">关注我们</div>
        <div class="hot-block">
            <div class="hot-m">
                <div class="wechat-subscribe flex-s-b">
                    <div class="right qrcode">
                        <img src="https://static001.geekbang.org/static/img/qrcode.bc44c82.png" />
                    </div>
                    <div class="left flex">
                        <div class="title">扫码关注java项目开发</div>
                        <div class="exhibit-row">「技术干货」 「免费资料」</div>
                        <div class="exhibit-row">「技术社群」 「实操案例」</div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
import { disableScroll, openScroll } from '@/utils';
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {
        // 上传规则
        handleAgreement() {
            this.dialogAgreementVisible = true;
            disableScroll();
        },

        // 关闭
        handleClose() {
            this.dialogAgreementVisible = false;
            openScroll();
        }
    }
};
</script>

<style scoped lang="less">
.aside-right {
    width: 300px;
    margin-left: 20px;

    .title-row {
        height: 50px;
        line-height: 50px;
        color: #303030;
        font-size: 16px;
    }

    .hot-block {
        background-color: #fff;
        margin-bottom: 20px;
        box-shadow: 0px 3px 10px 0px rgba(153, 153, 153, 0.1);
        border-radius: 4px;

        .hot-t {
            height: 50px;
            line-height: 50px;
            padding: 0 25px;
            font-size: 16px;
            color: #333;
            font-weight: bold;
            border-bottom: 1px solid #f2f2f2;

            .icon-shangchuan {
                font-size: 16px;
                color: rgb(74, 144, 226);
                margin-right: 10px;
            }

            .icon-wenhao {
                font-size: 16px;
                color: #999;
                margin-left: 5px;
                cursor: pointer;
            }
        }

        .hot-m {
            padding: 25px;
            border-bottom: 1px solid #f2f2f2;

            .toggle-row {
                h2 {
                    line-height: 1;
                    font-size: 25px;
                    font-weight: 600;
                    color: #303030;
                    margin: 0;
                }
            }

            .subscribe-row {
                line-height: 1;
                font-size: 25px;
                font-weight: 600;
                color: #303030;
                margin: 5px 0 18px;
            }

            .wechat-subscribe {
                .left {
                    flex: 1;
                    flex-direction: column;
                    margin-left: 10px;

                    .title {
                        font-size: 14px;
                        font-weight: 500;
                        color: #303030;
                        padding-left: 5px;
                        margin-bottom: 5px;
                    }

                    .exhibit-row {
                        font-size: 12px;
                        font-weight: 400;
                        color: #888;
                        margin-top: 5px;
                    }
                }

                .right {
                    display: flex;
                    box-sizing: border-box;
                    width: 78px;
                    height: 78px;
                    border-radius: 4px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .wrap {
                &.textarea {
                    align-items: flex-start;
                    margin-top: 20px;
                }

                .label {
                    margin-right: 10px;
                    font-size: 14px;
                    color: #333;
                }

                .data-name,
                .share-address {
                    width: 180px;
                    font-size: 12px;
                    color: #333;
                    border: 1px solid #eee;
                    border-radius: 4px;
                    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

                    &:focus {
                        border: 1px solid rgb(74, 144, 226);
                    }
                }

                .data-name {
                    height: 30px;
                    line-height: 30px;
                    padding: 0 10px 0 10px;
                }

                .share-address {
                    height: 100px;
                    padding: 5px 10px;
                    font-family: '微软雅黑';
                    outline: none;
                    resize: none;
                }
            }

            .customer {
                .img-wrap {
                    width: 100%;
                    margin-bottom: 20px;

                    img {
                        width: 100%;
                        border: 1px solid #fff;
                        display: block;
                    }
                }

                .tips {
                    color: #666;
                    font-size: 12px;
                    text-align: justify;

                    .top {
                        margin-bottom: 15px;
                    }
                }
            }
        }

        .hot-b {
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 16px;
            color: #446586;
            cursor: pointer;
            user-select: none;
        }
    }
}
</style>

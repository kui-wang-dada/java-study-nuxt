<template>
    <aside class="aside-right">
        <div class="hot-block">
            <div class="hot-m">
                <div class="customer">
                    <div class="img-wrap">
                        <img src="http://139.159.147.237/images/kefu.jpeg" alt="客服" />
                    </div>
                    <div class="tips">
                        <p class="top">
                            如果资料失效，可以直接联系资料客服微信索取，微信在线时间为：8:00-23:30。请下载后24小时内删除，若侵权请联系客服删除该资料。
                        </p>
                        <p class="bottom">
                            <b>声明：本站资料整理自互联网，用于Java学习者交流学习使用，对资料版权不负任何法律责任，若有侵权请及时联系客服屏蔽删除</b>
                        </p>
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

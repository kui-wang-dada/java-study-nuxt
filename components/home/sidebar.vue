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

        <div class="hot-block">
            <div class="hot-t">热门标签</div>
            <div class="hot-m" style="padding: 0 20px 20px;">
                <div class="content-block">
                    <div class="label-box flex-align">
                        <a href="" class="label-tag flex-align" v-for="(tag, i) in labelList" :key="i">#{{ tag.labelName }}</a>
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
    props: {
        labelList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {};
    },
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

        .title-row {
            height: 50px;
            line-height: 50px;
            color: #303030;
            font-size: 16px;
        }

        .hot-t {
            padding: 20px;
            font-size: 16px;
            color: #333;
            font-weight: bold;
        }

        .hot-m {
            padding: 20px;
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

            .label-box {
                flex-wrap: wrap;
                .icon-huati {
                    font-size: 14px;
                    color: @main-col;
                }

                .label-tag {
                    color: @main-col;
                    background-color: rgba(67, 112, 245, 0.1);
                    font-size: 12px;
                    margin: 0 8px 10px 0;
                    border-radius: 2px;
                    line-height: 1.4;
                    padding: 2px 6px;
                    transition: background-color 0.5s;
                    will-change: background-color;

                    &:hover {
                        background-color: rgba(67, 112, 245, 0.2);
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

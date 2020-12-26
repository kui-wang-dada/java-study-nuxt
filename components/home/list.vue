<template>
    <aside class="aside-left">
        <div class="swiper">
            <swiper />
        </div>
        <!-- v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" :infinite-scroll-distance="80" -->
        <div class="list" v-if="list.length">
            <div class="top-title flex-s-b">
                <h3 class="section-title">推荐文章</h3>
            </div>
            <div class="item flex" v-for="(item, index) in list" :key="index">
                <div class="info-box">
                    <h6 class="title ellipsis-2">
                        <a :href="item.url" target="_blank">{{ item.title }}</a>
                    </h6>
                    <!-- <div class="operations">
                        <div class="flex-align flex-s-b pb-4 pt-4">
                            <div class="flex-align">
                                <a-tooltip placement="top" :title="item.createTime | createTimeFormat('YYMMDDHHMM')" arrow-point-at-center>
                                    <div class="date">{{ item.createTime | createTimeFormat('MM/DD') }}</div>
                                </a-tooltip>
                            </div>
                            <div class="flex-align collect">
                                <i class="iconfont icon-shoucang" :class="index == 0 ? 'active ' : ''"></i>
                                <span class="text-collect" :class="index == 0 ? 'active ' : ''">收藏</span>
                            </div>
                        </div>
                        <div class="flex-align">
                            <div class="flex-align ellipsis">
                                <div class="label-box flex-align ellipsis">
                                    <i class="iconfont icon-huati"></i>
                                    <a href="" class="label-tag" v-for="(tag, i) in item.labelList" :key="i">{{ tag.labelName }}</a>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div class="operations flex-align flex-s-b">
                        <div class="flex-align">
                            <div class="flex-align">
                                <a-tooltip placement="top" :title="item.createTime | createTimeFormat('YYMMDDHHMM')" arrow-point-at-center>
                                    <div class="date">{{ item.createTime | createTimeFormat('MM/DD') }}</div>
                                </a-tooltip>
                            </div>
                            <div class="flex-align ellipsis">
                                <span class="break">~</span>
                                <div class="label-box flex-align ellipsis">
                                    <i class="iconfont icon-huati"></i>
                                    <a href="" class="label-tag" v-for="(tag, i) in item.labelList" :key="i">{{ tag.labelName }}</a>
                                </div>
                            </div>
                        </div>
                        <div class="flex-align collect" @click="insetCollection(item.id, index)">
                            <i class="iconfont icon-shoucang" :class="item.collection ? 'active ' : ''"></i>
                            <span class="text-collect" :class="item.collection ? 'active ' : ''">收藏</span>
                        </div>
                    </div>
                </div>
                <div class="image-box">
                    <img :src="item.img1" alt="封面" />
                </div>
            </div>
        </div>
        <!-- Loading -->
        <div v-if="loading" class="loading-box flex-align-center shadow">
            <a-spin tip="Loading..." />
        </div>
        <div v-if="!loading && list.length" class="loading-box flex-align-center shadow">
            <a-button v-if="list.length > 10" @click="onLoadMore">加载更多</a-button>
            <span class="no-more-data" v-if="list.length > 1">暂无更多数据！</span>
        </div>

        <div class="empty" v-if="!list.length">
            <a-empty image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original" :image-style="imageStyle">
                <span slot="description" class="no-more-data">暂无数据!</span>
            </a-empty>
        </div>
    </aside>
</template>

<script>
import swiper from '@/components/home/swiper';
import { formatTimer } from '@/utils';
export default {
    components: {
        swiper
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
            imageStyle: {
                height: '60px'
            }
        };
    },
    filters: {
        // 格式化时间
        createTimeFormat(cellvalue, hours) {
            return formatTimer(cellvalue / 1000, hours);
        }
    },
    methods: {
        // 加载更多数据...
        onLoadMore() {
            this.pageRequest.page++;
            this.$emit('loadMore', this.pageRequest);
        },

        // 收藏/取消收藏
        insetCollection(id, index) {
            this.$emit('insetCollection', {
                id,
                index
            });
        }
    }
};
</script>

<style scoped lang="less">
.aside-left {
    width: 680px;
    transition: ease-in-out 0.5s;
    border-radius: 4px;

    .empty {
        background-color: #fff;
        border-radius: 4px;
        padding: 30px;
    }

    .swiper {
        width: 680px;
        margin-bottom: 10px;
    }

    .loading-box {
        width: 680px;
        height: 80px;
        background: #fff;
        border-radius: 4px;

        /deep/ .ant-spin {
            color: @main-col;
        }

        /deep/ .ant-spin .ant-spin-dot-item {
            background-color: @main-col;
        }

        .no-more-data {
            color: #718096;
        }
    }

    .list {
        // padding: 0 0 30px 0;
        background-color: #fff;
        border-radius: 4px;
        position: relative;

        .top-title {
            padding: 30px 30px 10px 30px;

            .section-title {
                margin: 0;
                line-height: 1;
                font-size: 20px;
                font-weight: 600;
                color: #303030;
            }
        }

        .item {
            padding: 25px 30px 24px 30px;
            // transition: all 0.3s ease;
            border-bottom: 1px solid #f2f2f2;

            .info-box {
                position: relative;
                flex: 1;

                .title {
                    margin: 0;

                    a {
                        color: #333;
                        font-size: 16px;
                        font-weight: 500;
                        transition: all 0.3s ease;

                        &:hover {
                            color: @main-col;
                        }
                    }
                }

                .operations {
                    width: 100%;
                    flex: 1;
                    position: absolute;
                    bottom: 5px;

                    .date {
                        font-size: 14px;
                        color: #828a92;
                        cursor: pointer;
                    }

                    .break {
                        padding: 0 8px;
                    }

                    .icon-huati {
                        font-size: 16px;
                        color: @main-col;
                        margin: 2px 8px 0 0;
                    }

                    .label-tag {
                        color: @main-col;
                        background-color: rgba(67, 112, 245, 0.1);
                        font-size: 12px;
                        margin-right: 8px;
                        border-radius: 2px;
                        line-height: 1.4;
                        padding: 2px 6px;
                        transition: background-color 0.5s;
                        will-change: background-color;

                        &:hover {
                            background-color: rgba(67, 112, 245, 0.2);
                        }
                    }

                    .collect {
                        padding-left: 10px;
                        cursor: pointer;

                        .icon-shoucang {
                            font-size: 16px;
                            color: #828a92;
                        }

                        .text-collect {
                            font-size: 12px;
                            color: #828a92;
                            margin-left: 2px;
                        }

                        &:hover {
                            .icon-shoucang,
                            .text-collect {
                                color: #666;
                            }

                            .active {
                                color: @main-col;
                            }
                        }

                        .active {
                            color: @main-col;
                        }
                    }
                }
            }

            .image-box {
                width: 190px;
                height: 100px;
                margin-left: 20px;
                order: 1;
                flex-shrink: 0;
                position: relative;
                overflow: hidden;
                border-radius: 4px;
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: all 0.3s ease;

                    &:hover {
                        transform: scale(1.2);
                    }
                }
            }

            &:hover {
                background-color: #fafbfc;
            }

            &:last-child {
                border: none;
            }
        }
    }
}
</style>

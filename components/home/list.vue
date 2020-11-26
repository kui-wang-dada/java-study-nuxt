<template>
    <aside class="aside-left">
        <div class="swiper">
            <swiper />
        </div>
        <!-- v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" :infinite-scroll-distance="80" -->
        <div class="list">
            <div class="top-title flex-s-b">
                <div>
                    <h3 class="section-title">推荐文章</h3>
                </div>
            </div>
            <div class="item flex" v-for="(item, index) in list" :key="index">
                <div class="info-box">
                    <h6 class="title ellipsis-2">
                        <a :href="item.url">{{ item.title }}</a>
                    </h6>
                    <div class="operations flex-align flex-s-b">
                        <div class="flex-align">
                            <div class="date">{{ item.date }}</div>
                            <div class="break">~</div>
                            <div class="label-box flex-align">
                                <i class="iconfont icon-huati"></i>
                                <a href="" class="label-tag" v-for="(tag, i) in item.tags" :key="i">{{ tag }}</a>
                            </div>
                        </div>
                        <div class="flex-align collect">
                            <i class="iconfont icon-shoucang" :class="index == 0 ? 'active ' : ''"></i>
                            <span class="text-collect" :class="index == 0 ? 'active ' : ''">收藏</span>
                        </div>
                    </div>
                </div>
                <div class="image-box">
                    <img :src="item.image" alt="封面" />
                </div>
            </div>
        </div>
        <!-- Loading -->
        <div v-if="loading && !busy" class="loading-box flex-align-center shadow">
            <a-spin tip="Loading..." />
        </div>
        <div v-else class="loading-box flex-align-center shadow">
            <a-button @click="onLoadMore">加载更多</a-button>
        </div>
    </aside>
</template>

<script>
import swiper from '@/components/home/swiper';
export default {
    components: {
        swiper
    },
    props: {},
    data() {
        return {
            loading: false,
            busy: false,
            list: [
                {
                    title: 'Springboot＋Vue实现富文本发表文章功能',
                    date: '09/01',
                    url: '',
                    image: 'https://static001.geekbang.org/infoq/e5/e5233842e4f6b091b2c2fc1f9fd94fbc.png?x-oss-process=image/resize,w_416,h_234',
                    tags: ['前端', 'React', 'Vue']
                },
                {
                    title: 'Springboot+Vue实现仿百度搜索自动提示框匹配查询功能',
                    date: '10/11',
                    url: '',
                    image: 'https://static001.infoq.cn/resource/image/55/b2/55ce76852d235f03f8304fefc10c1bb2.png?x-oss-process=image/crop,w_1066,h_598/resize,w_416,h_234',
                    tags: ['前端', '后端', 'React', 'Vue', 'Springboot']
                },
                {
                    title: 'Springboot+React实现从数据库中获取数据生成树状图在前端页面展示功能',
                    date: '08/12',
                    url: '',
                    image: 'https://static001.infoq.cn/resource/image/a1/72/a19ec693c1dc102b0ef4f0cc8f53d172.jpg?x-oss-process=image/crop,y_56,w_1280,h_720/resize,w_416,h_234',
                    tags: ['前端', 'React', 'Echarts']
                },
                {
                    title: 'Springboot+Vue实现仿百度搜索自动提示框匹配查询功能',
                    date: '10/11',
                    url: '',
                    image: 'https://static001.infoq.cn/resource/image/55/b2/55ce76852d235f03f8304fefc10c1bb2.png?x-oss-process=image/crop,w_1066,h_598/resize,w_416,h_234',
                    tags: ['前端', '后端', 'React', 'Vue', 'Springboot']
                },
                {
                    title: 'Springboot+React实现从数据库中获取数据生成树状图在前端页面展示功能',
                    date: '08/12',
                    url: '',
                    image: 'https://static001.infoq.cn/resource/image/a1/72/a19ec693c1dc102b0ef4f0cc8f53d172.jpg?x-oss-process=image/crop,y_56,w_1280,h_720/resize,w_416,h_234',
                    tags: ['前端', 'React', 'Echarts']
                },
                {
                    title: 'Springboot＋Vue实现富文本发表文章功能',
                    date: '09/01',
                    url: '',
                    image: 'https://static001.geekbang.org/infoq/e5/e5233842e4f6b091b2c2fc1f9fd94fbc.png?x-oss-process=image/resize,w_416,h_234',
                    tags: ['前端', 'React', 'Vue']
                },
                {
                    title: 'Springboot+Vue实现仿百度搜索自动提示框匹配查询功能',
                    date: '10/11',
                    url: '',
                    image: 'https://static001.infoq.cn/resource/image/55/b2/55ce76852d235f03f8304fefc10c1bb2.png?x-oss-process=image/crop,w_1066,h_598/resize,w_416,h_234',
                    tags: ['前端', '后端', 'React', 'Vue', 'Springboot']
                },
                {
                    title: 'Springboot+React实现从数据库中获取数据生成树状图在前端页面展示功能',
                    date: '08/12',
                    url: '',
                    image: 'https://static001.infoq.cn/resource/image/a1/72/a19ec693c1dc102b0ef4f0cc8f53d172.jpg?x-oss-process=image/crop,y_56,w_1280,h_720/resize,w_416,h_234',
                    tags: ['前端', 'React', 'Echarts']
                },
                {
                    title: 'Springboot+Vue实现仿百度搜索自动提示框匹配查询功能',
                    date: '10/11',
                    url: '',
                    image: 'https://static001.infoq.cn/resource/image/55/b2/55ce76852d235f03f8304fefc10c1bb2.png?x-oss-process=image/crop,w_1066,h_598/resize,w_416,h_234',
                    tags: ['前端', '后端', 'React', 'Vue', 'Springboot']
                },
                {
                    title: 'Springboot+React实现从数据库中获取数据生成树状图在前端页面展示功能',
                    date: '08/12',
                    url: '',
                    image: 'https://static001.infoq.cn/resource/image/a1/72/a19ec693c1dc102b0ef4f0cc8f53d172.jpg?x-oss-process=image/crop,y_56,w_1280,h_720/resize,w_416,h_234',
                    tags: ['前端', 'React', 'Echarts']
                }
            ]
        };
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {
        loadMore() {
            const data = this.list;
            this.loading = true;
            if (data.length > 24) {
                this.$message.warning('暂无更多数据了哦!');
                this.busy = true;
                this.loading = false;
                return;
            }
            setTimeout(() => {
                this.list = data.concat([
                    {
                        title: 'Springboot＋Vue实现富文本发表文章功能',
                        date: '09/01',
                        url: '',
                        image: 'https://static001.geekbang.org/infoq/e5/e5233842e4f6b091b2c2fc1f9fd94fbc.png?x-oss-process=image/resize,w_416,h_234',
                        tags: ['前端', 'React', 'Vue']
                    },
                    {
                        title: 'Springboot+Vue实现仿百度搜索自动提示框匹配查询功能',
                        date: '10/11',
                        url: '',
                        image: 'https://static001.infoq.cn/resource/image/55/b2/55ce76852d235f03f8304fefc10c1bb2.png?x-oss-process=image/crop,w_1066,h_598/resize,w_416,h_234',
                        tags: ['前端', '后端', 'React', 'Vue', 'Springboot']
                    }
                ]);
                this.loading = false;
            }, 1500);
        },

        onLoadMore() {
            const data = this.list;
            this.loading = true;
            setTimeout(() => {
                this.list = data.concat([
                    {
                        title: 'Springboot＋Vue实现富文本发表文章功能',
                        date: '09/01',
                        url: '',
                        image: 'https://static001.geekbang.org/infoq/e5/e5233842e4f6b091b2c2fc1f9fd94fbc.png?x-oss-process=image/resize,w_416,h_234',
                        tags: ['前端', 'React', 'Vue']
                    },
                    {
                        title: 'Springboot+Vue实现仿百度搜索自动提示框匹配查询功能',
                        date: '10/11',
                        url: '',
                        image: 'https://static001.infoq.cn/resource/image/55/b2/55ce76852d235f03f8304fefc10c1bb2.png?x-oss-process=image/crop,w_1066,h_598/resize,w_416,h_234',
                        tags: ['前端', '后端', 'React', 'Vue', 'Springboot']
                    }
                ]);
                this.loading = false;
            }, 1500);
        }
    }
};
</script>

<style scoped lang="less">
.aside-left {
    width: 680px;
    transition: ease-in-out 0.5s;
    border-radius: 4px;

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
                    line-height: 26px;
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

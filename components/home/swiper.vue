<template>
    <a-carousel arrows>
        <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
            <a-icon type="left-circle" />
        </div>
        <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
            <a-icon type="right-circle" />
        </div>
        <div class="image" v-for="item in list" :key="item.url">
            <img :src="item.url" alt />
        </div>
    </a-carousel>
</template>
<script>
export default {
    name: 'Banner',
    data() {
        return {
            list: [
                {
                    url: 'https://static001.infoq.cn/resource/image/d3/68/d34eb4692dcdcfcd80143cd552719768.jpg?x-oss-process=image/crop,y_1,w_1279,h_718/resize,w_613,h_345'
                },
                {
                    url: 'https://static001.infoq.cn/resource/image/94/61/940bb60c8dc8d6b0f41dfeeffdc3f761.jpg?x-oss-process=image/crop,y_62,w_1279,h_718/resize,w_613,h_345'
                },
                {
                    url: 'https://static001.infoq.cn/resource/image/08/5a/08850ba77f075732ae9d80cb9a06375a.jpg?x-oss-process=image/crop,y_145,w_1280,h_720/resize,w_613,h_345'
                }
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style scoped lang="less">
/* For demo */
.ant-carousel /deep/ .slick-slide {
    width: 100%;
    height: 345px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;

    .image {
        width: 100%;
        height: 345px;

        img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            object-fit: cover;
            object-position: center;
            transition: all 0.3s ease;
        }

        &:hover img {
            transform: scale(1.2);
            border-radius: 4px;
        }
    }
}

.ant-carousel /deep/ .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
}
.ant-carousel /deep/ .custom-slick-arrow:before {
    display: none;
}
.ant-carousel /deep/ .custom-slick-arrow:hover {
    opacity: 0.5;
}

.ant-carousel /deep/ .slick-slide h3 {
    color: #fff;
}
</style>

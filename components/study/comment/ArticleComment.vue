<template>
    <div>
        <section class="article-comment-block">
            <div class="huifu-head">
                <div class="flex-align">
                    <h3 class="comment_title">
                        评论 4
                    </h3>
                </div>
            </div>
            <edit-div @submit="onSubmit" :btnText="btnText" :placeholderText="placeholderText" />
            <list v-if="list.length" :list="list" />
            <empty v-if="!list.length" description="暂时还没评论，等你发挥" />
        </section>
    </div>
</template>

<script>
import EditDiv from './EditDiv';
import list from './list';
import empty from '@/components/common/empty';
export default {
    components: {
        EditDiv,
        list,
        empty
    },
    data() {
        return {
            placeholderText: '发表评论',
            btnText: '评论',
            list: [
                {
                    id: 1,
                    head: 'https://mirror-gold-cdn.xitu.io/168e09bdb66bcf662a4?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
                    name: 'fend',
                    content: ' 此女是加州大学伯克利分校的高材生，在湾区可以横着走。所以，从统计学意义上来讲，此人属于无效样本，应予以剔除。',
                    date: '2020 年 05 月 24 日 11:12',
                    like: 2,
                    childs: [
                        {
                            id: 2,
                            head: '//static001.geekbang.org/account/avatar/00/0f/f7/6e/04f9a672.jpg?x-oss-process=image/resize,w_200,h_200',
                            name: '阿牛',
                            content: '网络喷子原型？',
                            date: '一天前',
                            like: 0,
                            at: '谋生',
                            isReply: false
                        },
                        {
                            id: 3,
                            head: 'https://static.woshipm.com/TTW_USER_202004_20200414140658_1283.jpg?imageView2/2/w/80/size-limit/5k!?imageView2/2/w/80/size-limit/5k!',
                            name: '谋生',
                            content: '这不是有手就行？',
                            date: '一周前',
                            like: 1,
                            isReply: false
                        }
                    ]
                }
            ]
        };
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {
        // 评论
        onSubmit(content) {
            console.log(content);
        }
    }
};
</script>

<style scoped lang="scss">
.article-comment-block {
    transition: ease-in-out 0.5s;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 3px 10px 0px rgba(153, 153, 153, 0.1);
    margin-top: 20px;

    .huifu-head {
        padding-bottom: 20px;
        position: relative;

        .comment_title {
            font-size: 16px;
            color: #2d2d2d;
            line-height: 22px;
            font-weight: normal;
        }
    }
}
</style>

<template>
    <div>
        <div class="entry">
            <header class="article_header">
                <h1>带你深入了解 GitLab CI/CD 原理及流程</h1>
                <div class="postinfo">
                    <div class="left">
                        <span>
                            <i class="iconfont icon-riqi"></i>
                            <b>2020-10-05</b>
                        </span>
                    </div>
                    <div class="right flex-align">
                        <span class="flex-align">
                            <i class="iconfont icon-liulanliang"></i>
                            <b>666</b>
                        </span>
                        <span class="flex-align">
                            <i class="iconfont icon-pinglun"></i>
                            <b>5</b>
                        </span>
                        <span class="flex-align">
                            <i class="iconfont icon-dianzan"></i>
                            <b>888</b>
                        </span>
                    </div>
                </div>
            </header>
            <div class="article_content">
                <div>
                    软件开发的持续方法基于自动执行脚本，以最大程度地减少在开发应用程序时引入错误的机会。从开发新代码到部署新代码，他们几乎不需要人工干预，甚至根本不需要干预。
                    它涉及到在每次小的迭代中就不断地构建、测试和部署代码更改，从而减少了基于已经存在bug或失败的先前版本开发新代码的机会。 Continuous Integration（持续集成）
                    假设一个应用程序，其代码存储在GitLab的Git仓库中。开发人员每天都要多次推送代码更改。对于每次向仓库的推送，你都可以创建一组脚本来自动构建和测试你的应用程序，从而减少了向应用程序引入错误的机会。这种做法称为持续集成，对于提交给应用程序（甚至是开发分支）的每项更改，它都会自动连续进行构建和测试，以确保所引入的更改通过你为应用程序建立的所有测试，准则和代码合规性标准。
                    Continuous Delivery（持续交付）
                    持续交付是超越持续集成的更进一步的操作。应用程序不仅会在推送到代码库的每次代码更改时进行构建和测试，而且，尽管部署是手动触发的，但作为一个附加步骤，它也可以连续部署。此方法可确保自动检查代码，但需要人工干预才能从策略上手动触发以必输此次变更。
                </div>
            </div>
            <div class="operation-bottom">
                <operation />
                <prevnext />
            </div>
        </div>
        <article-comment />
    </div>
</template>

<script>
import operation from './operation';
import prevnext from './prevnext';
import ArticleComment from './comment/ArticleComment';
export default {
    components: {
        operation,
        prevnext,
        ArticleComment
    },
    props: {},
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {}
};
</script>

<style scoped lang="less">
.entry {
    transition: ease-in-out 0.5s;
    padding: 40px;
    background-color: #fff;
    min-height: 400px;
    border-radius: 4px;
    box-shadow: 0px 3px 10px 0px rgba(153, 153, 153, 0.1);

    .article_header {
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 1px #eee solid;

        h1 {
            font-size: 26px;
            line-height: 42px;
        }

        .postinfo {
            color: #999;
            margin-top: 12px;
            font-weight: 300;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .icon-riqi,
            .icon-liulanliang,
            .icon-pinglun,
            .icon-dianzan {
                width: 18px;
                height: 18px;
                color: #999;
                margin-right: 4px;
                vertical-align: middle;
            }

            & span {
                position: relative;
                margin-right: 8px;
                font-size: 12px;
            }

            b {
                font-weight: 300;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }

    .article_content {
    }

    .operation-bottom {
        margin-top: 20px;
    }
}
</style>

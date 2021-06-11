<template>
    <div class="sidebar-inner">
        <my-tree :treeMenu="tree" @selectnode="selectnode"></my-tree>
    </div>
</template>
<script>
import MyTree from './SidebarMenuItem';
export default {
    components: {
        MyTree
    },
    data() {
        return {
            tree: [
                {
                    id: 1,
                    label: '1级目录1',
                    children: [
                        {
                            id: '1-1',
                            pid: 1,
                            label: '1.1目录'
                        },
                        {
                            id: '1-2',
                            pid: 1,
                            label: '1.2目录'
                        },
                        {
                            id: '1-3',
                            pid: 1,
                            label: '1.3目录'
                        }
                    ]
                },
                {
                    id: 2,
                    label: '1级目录2',
                    children: [
                        {
                            id: '2-1',
                            label: '2.1目录',
                            pid: 2,
                            children: [
                                {
                                    id: '2-1-1',
                                    pid: '2-1',
                                    label: '2.1.1目录'
                                },
                                {
                                    id: '2-1-2',
                                    pid: '2-1',
                                    label: '2.1.2目录'
                                },
                                {
                                    id: '2-1-3',
                                    pid: '2-1',
                                    label: '2.1.3目录'
                                }
                            ]
                        },
                        {
                            id: '2-2',
                            pid: 2,
                            label: '2.2目录'
                        }
                    ]
                }, //在此继续添加目录
                {
                    id: 3,
                    label: '1级目录3',
                    children: [
                        {
                            id: '3-1',
                            pid: 3,
                            label: '3.1目录',
                            children: [
                                {
                                    id: '3-1-1',
                                    pid: '3-1',
                                    label: '3.1.1目录'
                                }
                            ]
                        }
                    ]
                }
            ],
            plist: [], //此级以上所有父节点列表
            flatTree: [], //tree的平行数据
            node: '' //当前点击的node,
        };
    },
    methods: {
        //将tree树形数据转换为平行数据
        transformData(tree) {
            tree.forEach(item => {
                this.flatTree.push(item);
                item.children && item.children.length > 0 ? this.transformData(item.children) : '';
            });
        },

        //子组件传递过来的点击的node的值
        selectnode(node) {
            this.node = node;
            this.flatTree = [];
            this.transformData(this.tree);
        }
    },
    mounted() {
        this.transformData(this.tree); //数据初始化:将tree树形数据转换为平行数据
        console.log(this.flatTree);
    }
};
</script>
<style scoped lang="less">
.sidebar-inner {
    // width: 250px;
    // overflow-x: hidden;
    // overflow-y: auto;
    // -webkit-overflow-scrolling: touch;
    // -ms-overflow-style: none;
    // box-shadow: 0px 3px 10px 0px rgba(153, 153, 153, 0.1);
    // background-color: #fff;
    // border-radius: 4px 0 0 4px;
    // padding: 10px;
    // border-right: 1px solid #eaecef;

    position: fixed;
    width: 320px;
    height: 100vh;
    top: 0;
    left: 0;
    padding-top: 100px;
    border-right: 1px solid #eaecef;
    // background-color: #fafafa;
    z-index: 15;
}
</style>

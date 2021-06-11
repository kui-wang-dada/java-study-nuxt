<template>
    <div class="tree">
        <ul class="ul">
            <li v-for="(item, index) of treeMenu" :key="index">
                <div class="item">
                    <div class="anticon-caret-down" @click="changeStatus(index)">
                        <SwitcherSvg v-if="!scopesDefault[index] === true && item.children" :isOpen="true" />
                        <SwitcherSvg v-if="scopesDefault[index] === true && item.children" :isOpen="false" />
                    </div>
                    <span @click="changeStatus(index)">{{ item.label }}</span>
                </div>
                <div class="subtree" v-if="scopesDefault[index] && item.children && item.children.length > 0">
                    <tree-menu :treeMenu="item.children" @selectnode="selectnode"></tree-menu>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import SwitcherSvg from './SwitcherSvg';
export default {
    components: {
        SwitcherSvg
    },
    name: 'treeMenu',
    props: {
        treeMenu: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            scopesDefault: [],
            scopes: [],
            node: []
        };
    },
    methods: {
        //展开
        scope() {
            this.treeMenu.forEach((item, index) => {
                this.scopesDefault[index] = false;
                this.scopes[index] = 'children' in item ? true : false;
            });
        },
        changeStatus(index) {
            if (this.scopesDefault[index] == true) {
                this.$set(this.scopesDefault, index, false);
            } else {
                this.$set(this.scopesDefault, index, this.scopes[index]);
            }
        },

        selectnode(node) {
            this.$emit('selectnode', node);
        }
    },
    watch: {
        node: {
            handler(val) {
                this.selectnode(val);
            },
            immediate: true
        }
    },
    mounted() {
        this.scope();
    }
};
</script>
<style scoped lang="less">
.tree {
    .ul {
        padding: 5px 0 5px 0;
        margin: 0;

        > li {
            .item {
                width: 100%;
                height: 28px;
                display: flex;
                align-items: center;
                cursor: pointer;
                color: #595959;
                font-size: 14px;
                padding: 0 15px 0 30px;
            }

            &:last-child {
                padding: 0;
            }

            .anticon-caret-down {
                width: 20px;
                height: 100%;
                line-height: 28px;
                text-align: right;
                display: inline-block;
                padding-right: 4px;
            }
            .subtree {
                margin-left: 18px;
            }
        }
    }
}
</style>

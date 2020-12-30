<template>
    <ul class="menu-sub">
        <li v-for="(child, _index) in item.childs" :key="_index">
            <a @click.prevent="clickEventTwo(_index)" class="sidebar-link" :class="active == _index ? 'active' : ''">{{ child.title }}</a>
            <sidebar-menu-item v-if="active == _index && child.childs && child.childs.length" :active="threeActive" :item="child" @select="onSelectItem" />
        </li>
    </ul>
</template>

<script>
export default {
    name: 'SidebarMenuItem',
    data() {
        return {
            threeActive: -1
        };
    },
    props: {
        // 二层路由索引
        active: {
            type: Number,
            default: -1
        },

        // 二层路由
        item: {
            type: Object
        }
    },
    methods: {},
    created() {},
    mounted() {},
    methods: {
        // 选中第二层
        clickEventTwo(index) {
            if (index != this.active) {
                this.$emit('select', index);
            }
        },

        // 选中第三层
        onSelectItem(index) {
            this.threeActive = index;
        }
    }
};
</script>
<style></style>

<template>
    <div class="tree">
        <span class="ant-tree-switcher" :class="isOpen ? 'ant-tree-switcher_open' : 'ant-tree-switcher_close'">
            <span role="img" aria-label="caret-down" class="anticon anticon-caret-down ant-tree-switcher-icon">
                <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                </svg>
            </span>
        </span>
    </div>
</template>
<script>
export default {
    name: 'svg',
    props: {
        // true展开 false关闭
        isOpen: {
            type: Boolean,
            default: false
        }
    }
};
</script>
<style scoped lang="less">
.ant-tree-switcher {
    color: #8c8c8c;
    text-align: right;
    height: 28px;
    line-height: 30px;
    display: inline-block;
}

.ant-tree-switcher .ant-select-tree-switcher-icon,
.ant-tree-switcher .ant-tree-switcher-icon {
    display: inline-block;
    font-size: 12px;
    vertical-align: baseline;
}

.ant-tree-switcher_open .ant-tree-switcher-icon svg {
    transform: rotate(-90deg);
}
</style>

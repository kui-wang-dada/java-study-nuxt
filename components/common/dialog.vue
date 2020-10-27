<template>
    <div>
        <div class="mask"></div>
        <div class="modal">
            <!-- 询问弹窗 -->
            <div class="modal-content">
                <slot name="inquiry"></slot>
            </div>

            <!-- 规则介绍弹窗 -->
            <div class="modal-content">
                <slot name="agreement"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleClose() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2001;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  z-index: 2005;

  .modal-content {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    background: #fff;
    box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.21);
    border-radius: 4px;
    animation: onShow 0.3s ease-in-out;
  }

  &::after {
    content: '';
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
}
</style>

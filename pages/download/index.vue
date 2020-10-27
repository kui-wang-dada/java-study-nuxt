<template>
    <div class="mian">
        <list />
        <sidebar />
    </div>
</template>

<script>
import list from '@/components/download/list';
import sidebar from '@/components/download/sidebar';
export default {
     head() {
    return {
      title: 'java学习网',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'java学习网seo简介'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'java学习网seo关键词'
        }
      ]
    };
  },
    components: {
        list,
        sidebar
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

<style scoped lang="scss">
    .mian {
        display: flex;
        justify-content: space-between;
    }
</style>

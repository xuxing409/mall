<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ObserveDom from "@better-scroll/observe-dom";
import Pullup from "@better-scroll/pull-up";

BScroll.use(ObserveDom);
BScroll.use(Pullup);
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      typeof: Boolean,
      default: false,
    },
  },
  mounted() {
    // let wrapper = document.querySelector('.wrapper')
    // this.scroll = new BScroll(wrapper)

    this.$nextTick(() => {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM: true,
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      });
      // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", (position) => {
          // console.log(position);
          this.$emit("scroll", position);
        });
      }
      // 3.监听滚动到底部
      if(this.pullUpLoad) {
         this.scroll.on("pullingUp", () => {
        // 上拉加载更多
        this.$emit("pullingUp");
      });
      }
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>

<style scoped>
</style>
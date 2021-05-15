<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ObserveDom from '@better-scroll/observe-dom'
import Pullup from '@better-scroll/pull-up'
BScroll.use(ObserveDom)
BScroll.use(Pullup)
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      typeof: Boolean,
      default: false
    }
  },
  mounted() {
    // let wrapper = document.querySelector('.wrapper')
    // this.scroll = new BScroll(wrapper)

    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM: true,
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      this.scroll.on('scroll',(position)=> {
      // console.log(position);
        this.$emit('scroll', position)
      })

      this.scroll.on('pullingUp', () => {
          // 上拉加载更多
          this.$emit('pullingUp')
                // if (pos.y > 50) {
                //   this.loadData()
                // }
      })

    })
   
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
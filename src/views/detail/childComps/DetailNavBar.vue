<template>
  <div>
    <nav-bar>
      <div class="back" slot="left" @click="backClick">
        <img src="@/assets/img/common/back.svg">
      </div>
      <div class="title" slot="center">
        <div v-for="(item,index) in titles"
        :class="{active: index === currentIndex}"
        @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    titleClick(index){
      this.currentIndex = index;
      this.$emit('titleClick', index);
    },
    backClick() {
      // this.$router.back();
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    font-size: 12px;
  }
  .active {
    color: var(--color-high-text);
  }
  .back {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content:center;
    font-size: 30px;
  }

</style>
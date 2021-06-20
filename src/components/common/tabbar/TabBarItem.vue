<template>
 <div class="tab-bar-item" @click="itemclick">
   <div class="item-icon" v-if="!isActive" name="item-icon"><slot name="item-icon"></slot></div>
   <div class="item-active-icon" v-else><slot name="item-icon-active"></slot></div>
   <div class="item-text" :style="activeStyle"><slot name="item-text"></slot></div>
 </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'pink'
    }
  },
  data(){
    return {
      // isActive: true,
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods: {
    itemclick(){
      // this.$router.replace(this.path)
      // 解决重复点同一个路由，控制台报错的问题
      if( this.path != this.$route.path){
        this.$router.replace(this.path);
      }
    }
  }
}
</script>

<style>
  /* .tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
    } */

  .tab-bar-item {
    flex: 1;
    }
  .item-icon img, .item-active-icon img {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }

  .item-text {
    font-size: 12px;
    margin-top: 3px;
    color: #333;
  }

</style>

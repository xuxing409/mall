<template>
  <div class="back-top">
    <img src="~assets/img/common/back-top.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
  
  }
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 6px;
    bottom: 50px;
  }
  .back-top img {
    width: 43px;
    height:  43px;
    background-color: rgba(255, 255, 255, .5);
    border-radius: 50%;
  }
</style>
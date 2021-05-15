<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommond-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommond-items {
    flex: 1;
    margin: 0 auto;

  }
 .recommend img{
  width:90%;
  margin:0 auto;
  margin-bottom:.5rem;
 }

</style>
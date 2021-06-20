<template>
  <div id="category">
    <!-- 顶栏 -->
    <nav-bar class="top"><template #center>分类</template></nav-bar>

    <!-- 主要内容区域 -->
    <div class="main">
      <!-- 左侧分类栏 -->
      <div class="left">
        <ul class="list">
          <li :class="currentIndex==index ? 'currentItem':''" 
            class="item" 
            @click="categoryItemClick(item, index)" 
            v-for="(item,index) in categoryList" 
            :key="index"
            >
            <div :class="currentIndex==index ? 'currentItem':''">{{item.title}}</div>
          </li>
        </ul>
      </div>

      <!-- 右侧商品栏 -->
      <div class="right">
        <div class="category-detail-list">
          <div class="category-detail-item" v-for="(item,index) in categoryItemList">
            <img class="img" :src="item.image" alt="">
            <span class="category-title">{{item.title}}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getCategory, getCategoryInfo } from "network/category.js";

import NavBar from "components/common/navbar/NavBar.vue";
export default {
    name: "Category",
    components: {
      NavBar,
    },
    data() {
      return {
        categoryList: [],
        categoryItemList: [],
        currentIndex: 0
      }
    },
    async created() {
      const {data:res} = await getCategory();
      this.categoryList = res.category.list;
      
      // 首次加载
      this.categoryItemClick(this.categoryList[0],0)
    },
    methods: {
      async categoryItemClick(item, index) {
        this.currentIndex = index;

        const { data:res } = await getCategoryInfo(item.maitKey);
        this.categoryItemList = res.list;
      }
    }
}
</script>

<style lang="less" scoped>
  #category {
    height: 100vh;
    width: 100%;
    
    .top {
      position:sticky;
      top: 0px;

      height: 44px;
      background-color: rgb(255, 129, 152);

      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
     }
    .main {
      height: calc(100% - 93px);

      display: flex;
      .left {
        height: 100%;
        flex: 1;
        overflow-y:scroll;
        background-color: #f6f6f6;
        &::-webkit-scrollbar {
            display: none;
        }
        .list {
          list-style: none;
          .currentItem {
            background-color: #fff;
          }
          .item {
            width: 100px;
            height: 40px;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            font-size: 10px;
            
            
            &>div {
              width: 100%;
              

              display: flex;
              justify-content: center;
              align-items: center;
            }
            &>.currentItem {
              color:  var(--color-high-text);
              border-left: 0.2rem solid var(--color-high-text);
            }
          }
        }
      }
      .right {
        flex: 3;
        height: 100%;
        overflow-y:scroll;
        padding-top: 8px;
        margin-left: 8px;
        &::-webkit-scrollbar {
            display: none;
        }
        .category-detail-list {
          display: flex;
          justify-content: flex-start; //最后一行左对齐，使用space-between
          flex-wrap: wrap;
            &>.category-detail-item:nth-child(odd) {
              margin: 0px 0px 0 11px;/*给奇数项设置*//*nth-child是从1开始!!!*/
            }
            &>.category-detail-item:nth-child(even) {
              margin: 0px 0px 0 11px;/*给偶数项设置*/
            }
          .category-detail-item {
            width: 80px;
            height: 120px;
            
           
            &>img {
              width: 100%;
              height:70%;
            }
            &>span {
            display: flex;
            justify-content: center;
            align-items: center;
            }
          }
        }
      }
    }
 
  }
  
</style>

<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" 
      class="check-button"
      @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div @click="calcClick" class="calculate">
      去计算:{{checkedLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton' 

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    totalPrice(){

      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.newPrice * item.count
      },0).toFixed(2)
    },
    checkedLength() {
     
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      if(this.$store.state.cartList.length === 0){
        return false
      }
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick(){
      this.$store.commit('check_click', this.isSelectAll)
     
    },
    calcClick(){
      if(!this.$store.state.cartList.find(item => item.checked)){
        this.$toast.show('请选择购买的商品',1500)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex; 

  height: 40px;
  line-height: 40px;
  
  background-color: #eee;
}

.check-content {
  display: flex;
  align-items: center;
  width: 60px;
  margin-left: 10px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  
}
.price {
  margin-left: 15px;
  flex: 1;
}
.calculate {
  width: 80px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
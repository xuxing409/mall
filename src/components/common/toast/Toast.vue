<template>
  <div class="toast" v-show="isShow" :class="isShow ? 'fadein':'fadeout'">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  // props: {
  //   message: {
  //     type: String,
  //     default(){
  //       return ''
  //     }
  //   },
  //   show: {
  //     type: Boolean,
  //     default(){
  //       return false
  //     }
  //   }
  // },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration=2000) {
      this.isShow = true;
      this.message =message
      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      }, duration);
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;

  z-index: 999;

  color: #fff;
  background-color: rgba(0, 0, 0, .75);
}

 .fadein {
    animation: animate_in 0.8s;
  }
  .fadeout {
    animation: animate_out 0.8s;
    opacity: 0;
  }
  @keyframes animate_in {
    0% {
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes animate_out {
    0% {
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
</style>
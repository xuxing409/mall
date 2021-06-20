<template>
  <div id="profile">
    <!-- 顶栏 -->
    <div class="top">我的</div>
    <div class="main">
      <!-- 用户信息 -->
      <div class="user">
        <div class="user-info">
          <img src="../../assets/img/profile/avatar.jpg" alt="" />
          <div class="name">
            <div class="username">是柠新呀</div>
            <div class="right-arrow">
              <img src="../../assets/img/profile/right-arrow.png" alt="" />
            </div>
            <div class="member">普通用户</div>
          </div>
        </div>

        <div class="footprint">
          <div>
            <span>55</span>
            <span>浏览历史</span>
          </div>

          <div>
            <span>23</span>
            <span>收藏</span>
          </div>

          <div>
            <span>3</span>
            <span>优惠券</span>
          </div>
        </div>
      </div>
    <!-- 用户操作区 -->
        <div class="card">
          <div class="list">
            <div class="list_item">
              <div class="left" >
                <img style="color:red" src="../../assets/img/profile/coin.svg"></img>
                <span> 账户余额 </span>
              </div>
              <div class="right">
                <img src="../../assets/img/profile/black-right-arrow.png"></img>
              </div>
            </div>
            <div class="list_item">
              <div class="left">
                <img
                  src="../../assets/img/profile/return.svg"
                 
                ></img>
                <span> 我要退款 </span>
              </div>
              <div class="right">
                <img src="../../assets/img/profile/black-right-arrow.png"></img>
              </div>
            </div>
            <div class="list_item">
              <div class="left">
                <img
                  src="../../assets/img/profile/address.svg"
                 
                ></img>
                <span> 收货地址 </span>
              </div>
              <div class="right">
                <img src="../../assets/img/profile/black-right-arrow.png"></img>
              </div>
            </div>
            <div class="list_item">
              <div class="left">
                <img src="../../assets/img/profile/phone.svg"></img>
                <span> 联系我们 </span>
              </div>
              <div class="right">
                <img src="../../assets/img/profile/black-right-arrow.png"></img>
              </div>
            </div>

            <div class="list_item">
              <div class="left">
                <img src="../../assets/img/profile/feedback.svg"></img>
                <span> 投诉反馈 </span>
              </div>
              <div class="right">
                <img src="../../assets/img/profile/black-right-arrow.png"></img>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
};
</script>

<style lang="less" scoped>
#profile {
  height: 100vh;
  background-color: #f0f0f0;
  .top {
    position: sticky;
    top: 0px;

    background-color: rgb(255, 129, 152);
    height: 44px;

    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .main {
    height: calc(100% - 93px);
    .user {
      background-image: linear-gradient(
        135deg,
        #ff9a8b 0%,
        #ff6a88 55%,
        #ff99ac 100%
      );

      height: 160px;
      .user-info {
        padding-top: 25px;
        margin-left: 20px;
        height: 80px;
        display: flex;

        .name {
          width: 280px;

          .username {
            margin-top: 3px;
            font-size: 16px;
            color: #fff;
          }
          .member {
            font-size: 12px;
            color: #fff;
          }
          .right-arrow {
            height: 12px;
            margin-right: 20px;
            display: flex;
            justify-content: flex-end;
          }
        }
        & > img {
          height: 55px;
          width: 55px;
          border-radius: 50%;
        }
      }
    }

    .footprint {
      margin-top: 30px;
      display: flex;
      align-items: center;
      & > div {
        flex: 1;
        border-right: 2px solid #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        color: #fff;
      }
      & > div:last-child {
        border-right: none;
      }
    }
  }
  .card {
    margin: 0 auto;
    width: 100%;
    margin-top: -8px;
    background-color: #ffffff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    .list {
      display: flex;
      flex-direction: column;

      .list_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 64px;
        color: #000;
        border-bottom:1px solid #f0f0f0;
        .left {
          display: flex;
          align-items: center;

          img {
            width: 37px;
            height: 20px;
          }

          span {
            font-size: 7px;
            font-weight: bold;
            margin-left: 21px;
          }
        }

        .right {
          width: 6px;
          height: 12px;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>

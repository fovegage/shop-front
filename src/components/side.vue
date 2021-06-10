<template>
  <div class="user-side">
    <div class="user-container">
      <div class="order-center">
        <h3>订单中心</h3>
        <ul>
          <li :class="{'active': $route.path === '/orderList'}"><a href="/orderList">我的订单</a></li>
          <li :class="{'active': $route.path === '/service'}"><a href="/service">售后列表</a></li>
          <!--          <li :class="{'active': $route.path === '/rate'}"><a href="/rate">评价管理</a></li>-->
        </ul>
      </div>
      <!--      <div class="user-center">-->
      <!--        <h3>用户中心</h3>-->
      <!--        <ul>-->
      <!--          &lt;!&ndash;          <li :class="{'active': $route.path === '/sign'}"><a href="/sign">签到记录</a></li>&ndash;&gt;-->
      <!--          <li :class="{'active': $route.path === '/collect'}"><a href="/collect">我的搜藏</a></li>-->
      <!--          <li :class="{'active': $route.path === '/history'}"><a href="/history">我的浏览</a></li>-->
      <!--        </ul>-->
      <!--      </div>-->
      <div class="account-center">
        <h3>账户中心</h3>
        <ul>
          <li :class="{'active': $route.path === '/profile'}"><a href="/profile">账户设置</a></li>
          <li :class="{'active': $route.path === '/message'}"><a href="/message">消息中心</a></li>
          <!--          <li :class="{'active': $route.path === '/address'}"><a href="/address">收货地址</a></li>-->
        </ul>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "Side",
  mounted() {
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.user-side {
  margin-bottom: 40px;

  .highlight {
    color: #ff6600;
  }

  .user-container {

    background-color: #FFFFFF;
    width: 240px;
    height: 520px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .order-center, .user-center, .service-center, .account-center {
      margin-left: 50px;


      h3 {
        font-size: 16px;
        font-weight: 400;
        line-height: 52px;
        color: #333;
        margin: 0;
        padding: 0
      }

      ul {
        .active {
          a {
            color: #ff6600;
          }
        }

        li {
          padding: 6px 0;

          a {
            color: #757575;

          }
        }
      }

    }
  }
}
</style>
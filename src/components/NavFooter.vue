<template>
  <div class="footer">
    <div class="container">
      <div class="serice-bar">
        <div class="list">
          <div class="btmIcon">正</div>
          <strong class="tit">正品承诺</strong>
          <span class="desc">正品保障 假一赔十</span>
        </div>
        <div class="list">
          <div class="btmIcon">低</div>
          <strong class="tit">低价保障</strong>
          <span class="desc">缩减中间环节 确保低价</span>
        </div>
        <div class="list">
          <div class="btmIcon">退</div>
          <strong class="tit">30天无忧退货</strong>
          <span class="desc">国内退货 售后无忧</span>
        </div>
        <div class="list">
          <div class="btmIcon">邮</div>
          <strong class="tit">满88包邮</strong>
          <span class="desc">部分特殊商品除外</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="company-intro">
        <div class="list">
          <h3>商城保障</h3>
          <a href="javascript:;">假一赔十</a>
          <a href="javascript:;">用户协议</a>
          <a href="javascript:;">隐私政策</a>
        </div>
        <div class="list">
          <h3>新手指南</h3>
          <a href="javascript:;">购物流程</a>
          <a href="javascript:;">支付方式</a>
          <a href="javascript:;">常见问题</a>
        </div>
        <div class="list">
          <h3>售后服务</h3>
          <a href="javascript:;">售后政策</a>
          <a href="javascript:;">退货流程</a>
          <a href="javascript:;">联系客服</a>
        </div>
        <div class="list">
          <h3>物流配送</h3>
          <a href="javascript:;">配送方式</a>
          <a href="javascript:;">运费标准</a>
          <a href="javascript:;">物流跟踪</a>
        </div>
        <div class="list">
          <h3>关于我们</h3>
          <a href="javascript:;">联系我们</a>
          <a href="javascript:;">官方微信</a>
          <a href="javascript:;">邮件联系</a>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// 注意必须是首字母大写才可以引入
import Footer from "./footer";

export default {
  name: "NavFooter",
  components: {
    Footer
  }
}
</script>

<style lang="scss">
.footer {
  height: 300px;

  .container {
    margin: 0 auto;
    width: 1190px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .serice-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;


      .list {
        width: 250px;
        padding: 0 50px;

        .btmIcon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #d6d6d6;
          text-align: center;
          line-height: 44px;
          font-size: 20px;
          font-weight: 700;
          display: inline-block;
          float: left;
          margin-right: 12px;
        }

        .tit {
          display: block;
          line-height: 22px;
        }
      }

    }

    .line {
      margin-top: 30px;
      margin-bottom: 10px;
      border-bottom: 2px solid #F8F8F8;
    }

    .company-intro {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .list {
        padding: 0 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h3 {
          font-size: 18px;
          font-weight: normal;
        }

        a {
          padding: 10px 0 0;
          color: #757575
        }
      }
    }


  }
}
</style>
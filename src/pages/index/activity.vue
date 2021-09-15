<template>
  <div class="activity">
    <!--    <div style=" background: url('https://kaola-haitao.oss.kaolacdn.com/d68e5036-44f9-4bf9-9bdd-218f89193dbdT19010111617_1920_506.jpg') no-repeat center;-->
    <!--    height: 400px;"></div>-->
    <div :style="'background: url('+productList.pic +') no-repeat center;'+'height: 400px;'"></div>
    <!--    <img src="https://kaola-haitao.oss.kaolacdn.com/d68e5036-44f9-4bf9-9bdd-218f89193dbdT19010111617_1920_506.jpg" alt="">-->
    <!--    <div :style="background: url() no-repeat center; height: 400px;">-->

    <!--    </div>-->

    <div class="container">
      <div class="desc">
        <h2>{{ productList.name }}</h2>
      </div>
      <div class="good-list">
        <div class="new-list">
          <div class="shop-item" v-for="( product, idx) in productList.product" :key="idx">
            <span class="flag" v-if="product.is_new">新品</span>
            <div class="item-img">
              <a :href="'/product/'+product.id" target="_blank"><img v-lazy="product.pic" :alt="product.title"></a>
            </div>
            <div class="item-info">
              <h3 class="title">{{ product.title }}<span v-if="product.title.length > 38">...</span></h3>
              <p class="price">{{ product.min_price }}元</p>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "activity",
  data() {
    return {
      productList: {}
    }
  },
  created() {
    document.title = '活动 - JapanHui'
  },
  methods: {
    getCategoryProduct(id) {
      this.axios.get(`/managements/ad/${id}/`).then((res) => {
        let item = res.data

        // console.log(item)

        this.productList = {
          id: item.id,
          name: item.name,
          product: item.product,
          pic: item.pic,
        }

        // console.log(this.productList)

      })
    },
  },
  mounted() {
    this.getCategoryProduct(this.$route.params.id)
  }
}
</script>

<style lang="scss">
.activity {
  margin-top: 5px;
  //background-color: #f5f5f5;
  .ad {
    background: url('https://kaola-haitao.oss.kaolacdn.com/d68e5036-44f9-4bf9-9bdd-218f89193dbdT19010111617_1920_506.jpg') no-repeat center;
    height: 400px;
  }

  background-color: #f5f5f5;

  .container {
    margin: 0 auto;
    width: 1190px;

    .desc {
      margin-top: 10px;
      background-color: #80c58a;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }

    .good-list {
      text-align: center;
      padding: 5px 0 30px 0;

      .new-list {
        // https://www.jianshu.com/p/e8f236fcf515
        // 换行布局 wrap
        display: flex;
        width: 1190px;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        text-align: center;

        .shop-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          background-color: #FFFFFF;
          width: 233px;
          height: 280px;
          margin-right: 5px;
          margin-top: 5px;

          .flag {
            display: inline-block;
            width: 67px;
            color: #FFFFFF;
            height: 24px;
            font-size: 14px;
            line-height: 24px;
            background-color: #ff6600;

            &.new-pro {
              background-color: #ff6600;
            }

            &.kill-pro {
              background-color: #FF6600;
            }
          }

          .item-img {
            width: 160px;
            height: 160px;
            margin: 0 auto;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .item-info {
            .title {
              font-size: 14px;
              padding: 0 8px;
              line-height: 20px;
              color: #333;
              font-weight: 700;
            }

            .desc {
              color: #999;
              line-height: 13px;
              margin: 6px auto 13px
            }

            .price {
              color: #FF6600;
              font-size: 14px;
              font-weight: 700;
              cursor: pointer;

            }
          }

          //  https://blog.csdn.net/tenggeer0789/article/details/89478859
          // 阴影实现
          &:hover {
            -webkit-box-shadow: #ccc 0 10px 10px;
            -moz-box-shadow: #ccc 0 10px 10px;
            box-shadow: #ccc 0 10px 10px;
            transition: all .2s;
          }
        }
      }
    }

  }
}
</style>
<template>
  <div class="user-collect">
    <div class="container">
      <div class="crumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>我的收藏</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="user-collect-body">
        <Side></Side>
        <div class="user-collect-content">
          <div class="wrap">
            <div class="collect-title">
              <h1>我的收藏</h1>
            </div>
            <div class="line"></div>
            <div class="collect-body">
              <div class="category-list">
                <div class="shop-item" v-for="(product,idx) in collectList" :key="idx">
                  <!--              <span class="flag">新品</span>-->
                  <div class="item-img">
                    <a :href="'/product/'+product.id" target="_blank"> <img v-lazy="product.cover" :alt="product.title"></a>
                  </div>
                  <div class="item-info">
                    <a :href="'/product/'+product.id" target="_blank"><h3 class="title">{{ product.title }}</h3></a>
                    <p class="desc">{{ product.desc }}</p>
                    <p class="price">{{ product.price }}元</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Side from "../../components/side";
import {formatDate} from "../../utils/date";

export default {
  name: "collect",
  components: {
    Side
  },
  mounted() {
    this.collectProduct();
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      collectList: []
    }
  },
  methods: {
    collectProduct() {
      this.axios.get('/collect/').then((res) => {
        this.collectList = res.data.list.map(item => {
          return {
            id: item.product.id,
            title: item.product.title,
            cover: JSON.parse(item.product.images)['images'][0],
            desc: item.product.desc.slice(0, 10),
            price: JSON.stringify(item.product.params) === '[]' ? 0 : item.product.params[0]['shop_price'],
          }
        });
        console.log(this.collectList)
      })
    }
  }
}
</script>

<style lang="scss">

.user-collect {
  background-color: #F5F5F5;

  .crumb {
    padding: 10px 0;
    display: flex;
    align-items: center;
    height: 30px;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .user-collect-body {
      display: flex;
      justify-content: space-between;

      .user-collect-content {
        margin-bottom: 40px;
        background-color: #FFFFFF;
        width: 950px;

        .wrap {
          margin-top: 20px;
          margin-left: 25px;

          .line {
            margin-bottom: 20px;
            border-bottom: 2px solid #F8F8F8;
          }

          .collect-title {
            h1 {
              margin: 0;
              font-size: 30px;
              font-weight: 400;
              line-height: 68px;
              color: #757575;
            }
          }

          .collect-category {
            margin-bottom: 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .checked {
              color: #ff6600;
            }

            h3 {
              margin-left: 30px;
              font-weight: normal;
              cursor: pointer;
              // 注意层级
              &:first-child {
                margin-left: 0;
              }
            }
          }


          .collect-body {

            ul {
              li {
                margin-bottom: 10px;

                .collect-box {
                  height: 30px;
                  font-size: 16px;

                  .collect-content {
                    float: left;
                    cursor: pointer;
                  }

                  .collect-datetime {
                    float: right;
                    margin-right: 40px;
                  }

                }
              }
            }

            .category-list {

              display: flex;
              width: 900px;
              height: 600px;
              justify-content: space-between;
              text-align: center;
              flex-wrap: wrap;

              .shop-item {
                background-color: #FFFFFF;
                width: 200px;
                height: 260px;
                margin-bottom: 10px;

                .flag {
                  display: inline-block;
                  width: 67px;
                  color: #FFFFFF;
                  height: 24px;
                  font-size: 14px;
                  line-height: 24px;
                  background-color: aquamarine;

                  &.new-pro {
                    background-color: aquamarine;
                  }

                  &.kill-pro {
                    background-color: #FF6600;
                  }
                }

                .item-img {
                  //padding-top: 10px;
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
                    margin-top: 10px;
                    font-size: 14px;
                    color: #333;
                    line-height: 14px;
                    font-weight: 700;
                  }

                  .desc {
                    color: #999;
                    line-height: 13px;
                    margin: 10px auto 13px
                  }

                  .price {
                    color: #FF6600;
                    font-size: 14px;
                    font-weight: 700;
                  }
                }
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
    }
  }
}
</style>
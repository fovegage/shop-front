<template>
  <div class="search">
    <div class="container" v-if="errorFlag">
      <div class="crumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ bread }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="brand" v-if="is_brand">
        <div class="left">
          <img :src="brandInfo.image" alt="">
        </div>
        <div class="right">
          <h2>{{ brandInfo.zh_name }}（{{ brandInfo.en_name }}）</h2>
          <p>{{ brandInfo.desc }}</p>
        </div>

      </div>

      <div class="show-brand">

        <div class="left-brand">
          <h3>品牌：</h3>
        </div>
        <div class="right-brand">
          <div v-for="( product, idx) in setBrand(productList)" :key="idx" class="detail-brand">
            <!--            {{ product.brand.zh_name }}-->
            <a :href="'/search?categoryId='+product.brand.id">{{ product.brand.zh_name }}</a>
          </div>
        </div>

      </div>
      <div class="show-brand">

        <div class="left-brand">
          <h3>分类：</h3>
        </div>
        <div class="right-brand">
          <div v-for="( product, idx) in setProduct(productList)" :key="idx" class="detail-brand">
            <a :href="'/search?categoryId='+product.category.id">{{ product.category.name }}</a>
          </div>
        </div>

      </div>

      <div class="sort">
        <div class="left">
          <p :class="{'active':sortActive ==='default'}" @click="sortRes('default')">{{ status1 }}</p>
          <p :class="{'active':sortActive ==='price'}" @click="sortRes('price')">{{ status3 }}</p>
          <p :class="{'active':sortActive ==='num'}" @click="sortRes('num')">{{ status2 }}</p>
        </div>
        <div class="right">
          <el-radio v-model="radio" label="1">仅看推荐</el-radio>
          <el-radio v-model="radio" label="2">仅看新品</el-radio>
          <el-radio v-model="radio" label="3">仅看有货</el-radio>
        </div>
      </div>


      <div class="good-list">
        <div class="new-list">
          <div class="shop-item" v-for="( product, idx) in productList" :key="idx">
            <span class="flag" v-if="product.is_new">新品</span>
            <div class="item-img">
              <a :href="'/product/'+product.id" target="_blank"><img v-lazy="product.cover" :alt="product.title"></a>
            </div>
            <div class="item-info">
              <h3 class="title">{{ product.title.slice(0, 35) }}<span v-if="product.title.length > 38">...</span></h3>
              <p class="price">{{ product.price }}元</p>
            </div>
          </div>


        </div>
      </div>
      <div class="page">
        <el-pagination
            @current-change="handleSizeChange"
            background
            :page-size=20
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
      <div class="shop-guess">
        <h3 class="cate-word">热卖爆品</h3>
        <div class="wrap-shop">
          <div class="new-list">
            <div class="shop-item" v-for="(hot, idx) in sortList.slice(0,5)" :key="idx">
              <span class="flag">热卖</span>
              <div class="item-img">
                <a :href="'/product/'+hot.id" target="_blank"> <img v-lazy="hot.cover" :alt="hot.title"></a>

              </div>
              <div class="item-info">
                <a :href="'/product/'+hot.id" target="_blank">
                  <h3 class="title">{{ hot.title.slice(0, 35) }}<span v-if="hot.title.length > 38">...</span>
                  </h3>
                </a>
                <p class="price">{{ hot.price }}元</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="error" v-else>
      <div class="message">
        <div class="l1">抱歉，没有找到符合条件的商品</div>
        <div class="l2">
          <p>建议您：</p>
          <p> 1、适当减少筛选条件，可以获得更多结果</p>
          <p> 2、尝试其他关键词</p>
        </div>
      </div>


    </div>
  </div>
</template>

<script>


export default {
  name: "search",
  data() {
    return {
      radio: '1',
      errorFlag: true,
      productList: [],
      total: 1,
      cid: 0,
      sortActive: 'default',
      sortList: [],
      is_search: false,
      is_category: false,
      is_brand: false,
      search_key: '',
      price_status: true,
      sold_status: true,
      status1: '默认排序',
      status2: '销量升序',
      status3: '价格升序',
      bread: '',
      bid: 0,
      brandInfo: Object
    };
  },
  created() {
    document.title = '搜索 - JapanHui'
  },
  methods: {

    setBrand(val) {

      return val.filter(function (item, index, self) {
        return self.findIndex(el => el.brand.en_name == item.brand.en_name) === index
      })
    },

    setProduct(val) {
      return val.filter(function (item, index, self) {
        return self.findIndex(el => el.category.name == item.category.name) === index
      })
    },
    requestProduct(val) {
      var params = {
        top_category: this.cid,
        pageNum: 1,
        ordering: val
      }
      // console.log(this.is_search, this.is_category)
      if (this.is_search) {
        delete params['top_category']
        params['search'] = this.search_key
      }
      this.axios.get('/products/', {
        params
      }).then((res) => {
        this.productList = res.data.list.map(item => {
          return {
            id: item.id,
            title: item.title,
            cover: item.pic,
            brand: item.brand,
            category: item.category,
            price: item.min_price,
          }
        });
      })
    },

    // 价格排序
    sortRes(val) {
      if (val === 'default') {
        this.sortActive = 'default'
        if (this.is_search) {
          this.getSearchProduct(this.search_key);
        } else if (this.is_category) {
          this.getCategoryProduct(this.cid)
        }
      } else if (val === 'num') {
        this.sortActive = 'num';
        if (this.sold_status) {
          this.requestProduct('total_sold')
          this.sold_status = !this.sold_status
          this.status2 = '销量升序'
        } else {
          this.requestProduct('-total_sold')
          this.sold_status = !this.sold_status
          this.status2 = '销量降序'
        }
      } else {
        this.sortActive = 'price'
        if (this.price_status) {
          this.requestProduct('min_price')
          this.price_status = !this.price_status
          this.status3 = '价格升序'
        } else {
          this.requestProduct('-min_price')
          this.price_status = !this.price_status
          this.status3 = '价格降序'
        }
      }
    },
    //
    getSortProduct() {
      this.axios.get('/goods/', {
        params: {
          pageSize: 5,
          sold_num: 'sold_num'
        }
      }).then((res) => {
        this.sortList = res.data.list.map(item => {
          return {
            id: item.be_product.id,
            title: item.be_product.title,
            cover: item.cover,
            price: item.sold_price
          }
        });
      })
    },
    //
    handleSizeChange(page) {
      var params = {
        top_category: this.cid,
        pageNum: page
      }
      // console.log(this.is_search, this.is_category)
      if (this.is_search) {
        delete params['top_category']
        params['search'] = this.search_key
      }
      this.axios.get(`/products/`, {
        params
      }).then((res) => {
        this.total = res.data.total;
        this.productList = res.data.list.map(item => {
          return {
            id: item.id,
            title: item.title,
            brand: item.brand,
            category: item.category,
            cover: item.pic,
            price: item.min_price,
          }
        });
      })
    },
    // 没有取到数据隐藏
    getSearchProduct(key) {
      this.axios.get(`/products/?pageNum=1&search=${key}`).then((res) => {
        this.total = res.data.total;
        if (res.data.total === 0) {
          this.$message.warning("暂未搜到~")
          return;
        }
        this.productList = res.data.list.map(item => {
          return {
            id: item.id,
            title: item.title,
            brand: item.brand,
            category: item.category,
            cover: item.pic,
            price: item.min_price,
          }
        });
      })
    },
    getCategoryProduct(key, flag) {
      this.axios.get(`/products/?${key}`).then((res) => {
        this.total = res.data.total;
        if (flag === 'cate') {
          this.bread = res.data.list[0].category.name;
        } else {
          this.bread = res.data.list[0].brand.en_name;
          this.brandInfo = res.data.list[0].brand;
        }
        this.productList = res.data.list.map(item => {
          return {
            id: item.id,
            title: item.title,
            brand: item.brand,
            category: item.category,
            cover: item.pic,
            price: item.min_price,
          }

        });
      })
    }
  },

  mounted() {
    this.getSortProduct();
    let flag = this.$route.query

    if (Object.prototype.hasOwnProperty.call(flag, 'key') && flag.key !== "") {
      this.getSearchProduct(flag.key)
      this.search_key = flag.key;
      this.is_search = true;
      this.bread = flag.key;
    } else if (Object.prototype.hasOwnProperty.call(flag, 'categoryId') && flag.categoryId !== "") {
      //top_category=${key}
      this.getCategoryProduct(`top_category=${flag.categoryId}`, 'cate')
      this.is_category = true
      this.cid = flag.categoryId;
    } else if (Object.prototype.hasOwnProperty.call(flag, 'brandId') && flag.categoryId !== "") {
      this.getCategoryProduct(`brandId=${flag.brandId}`, 'brand')
      this.is_brand = true
      this.bid = flag.brandId;
    } else {
      // 只要这两个参数 否则隐藏面板
      this.errorFlag = false;
    }

  }
}
</script>

<style lang="scss">
.search {
  margin-top: 3px;
  background-color: #f5f5f5;

  .error {
    margin: 0 auto;
    width: 1190px;
    padding: 20px 0;

    .message {

      height: 300px;
      background-color: #FFFFFF;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .l1 {
        font-size: 18px;
        font-weight: bold;
      }

      .l2 {
        margin-top: 20px;
        margin-left: -25px;
      }
    }

    .shop-guess {
      margin-top: 20px;
      height: 380px;
      display: flex;
      flex-direction: column;

      .cate-word {
        padding: 15px 0;
        font-size: 22px;
        height: 21px;
        line-height: 21px;
        color: #333;
      }

      .wrap-shop {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .new-list {
          // https://www.jianshu.com/p/e8f236fcf515
          // 换行布局 wrap
          display: flex;
          width: 1190px;
          justify-content: space-between;
          text-align: center;
          flex-wrap: wrap;

          .shop-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            background-color: #FFFFFF;
            width: 230px;
            height: 280px;

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
                color: #333;
                line-height: 14px;
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

                //&:after {
                //  // 垂直居中
                //  vertical-align: middle;
                //  margin-left: 3px;
                //  content: ' ';
                //  display: inline-block;
                //  width: 28px;
                //  height: 28px;
                //  background: url("~@/static/imgs/cart (2).png") no-repeat center;
                //  background-size: 25px;
                //}
              }
            }

            //  https://blog.csdn.net/tenggeer0789/article/details/89478859
            // 阴影实现
            &:hover {
              -webkit-box-shadow: #ccc 0px 10px 10px;
              -moz-box-shadow: #ccc 0px 10px 10px;
              box-shadow: #ccc 0px 10px 10px;
              transition: all .2s;
            }
          }

        }
      }
    }
  }

  .container {
    margin: 0 auto;
    width: 1190px;

    .crumb {
      padding: 10px 0;
      display: flex;
      align-items: center;
      height: 30px;
    }

    .category {
      //margin-top: -15px;
      background-color: #FFFFFF;
      width: 1190px;
      height: 100px;

      display: flex;
      flex-direction: column;
      justify-content: center;


      .line {
        margin: 10px 0;
        border-bottom: 2px solid #F8F8F8;
      }

      .list {
        display: flex;
        justify-items: center;

        .second-menu {
          margin-left: 20px;
          color: #b0b0b0;
          font-size: 16px;
          width: 50px;
        }

        ul {
          height: 20px;

          li {
            display: inline-block;

            a {
              margin-right: 20px;
              font-size: 16px;
              color: #424242;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }

    .brand {
      height: 120px;
      margin-bottom: 5px;
      background-color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .left {
        border-radius: 20px;
        height: 80px;
        width: 80px;
        margin: 0 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
      }
    }

    .show-brand {
      display: flex;
      //min-width: 100px;
      color: #333333;

      .left-brand {
        width: 60px;
        min-height: 50px;

      }

      .right-brand {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        .detail-brand {
          margin-right: 10px;
          //margin-top: 5px;
          margin-bottom: 10px;
          min-width: 50px;
          line-height: 30px;
          height: 30px;
          text-align: center;
          background-color: #FFFFFF;
          padding: 0 10px;

          a {
            color: #333333;
          }

          a:hover {
            color: #ff6600;;
          }
        }
      }
    }

    .sort {
      color: #424242;

      .left {
        display: flex;
        align-items: center;

        .active {
          color: #ff6600;
        }

        p {
          cursor: pointer;
          margin-right: 30px;
          font-size: 14px;
          color: #606266;
        }
      }

      height: 30px;
      width: 1190px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .page {
      display: flex;
      justify-content: center;
      margin: 20px 0 30px 0;

    }

    .good-list {
      text-align: center;

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

              //&:after {
              //  // 垂直居中
              //  vertical-align: middle;
              //  margin-left: 3px;
              //  content: ' ';
              //  display: inline-block;
              //  width: 28px;
              //  height: 28px;
              //  background: url("~@/static/imgs/cart (2).png") no-repeat center;
              //  background-size: 25px;
              //}
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

    .shop-guess {
      margin-top: 5px;
      height: 380px;
      display: flex;
      flex-direction: column;

      .cate-word {
        padding: 15px 0;
        font-size: 22px;
        height: 21px;
        line-height: 21px;
        color: #333;
      }

      .wrap-shop {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .new-list {
          // https://www.jianshu.com/p/e8f236fcf515
          // 换行布局 wrap
          display: flex;
          width: 1190px;
          justify-content: space-between;
          text-align: center;
          flex-wrap: wrap;

          .shop-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            background-color: #FFFFFF;
            width: 230px;
            height: 280px;

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

                //&:after {
                //  // 垂直居中
                //  vertical-align: middle;
                //  margin-left: 3px;
                //  content: ' ';
                //  display: inline-block;
                //  width: 28px;
                //  height: 28px;
                //  background: url("~@/static/imgs/cart (2).png") no-repeat center;
                //  background-size: 25px;
                //}
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
}
</style>
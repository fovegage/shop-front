<template>
  <!--  这里后期修改为插槽  会员登录 会员注册 找回密码-->
  <div class="login">
    <div class="login-header">
      <div class="header-logo">
        <a href="/index.html"><img src="~@/static/imgs/logo.png" alt=""></a>
      </div>
      <h2>会员登录</h2>
    </div>
    <div class="login-body">
      <div class="container">
        <div class="login-form">
          <h3>会员登录</h3>
          <div class="username">
            <input type="text" placeholder="请输入手机号" v-model="username">
          </div>
          <div class="password">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box" @click="Login()" style="cursor: pointer">
            <a href="javascript:;" class="btn">登录</a>
          </div>
          <!--          <div class="third-login">-->
          <!--            <a href=""><img src="~@/static/imgs/wx.png" alt="微信登录"></a>-->
          <!--            <a href=""><img src="~@/static/imgs/alipay.png" alt="支付宝登录"></a>-->
          <!--            &lt;!&ndash;            <a href=""><img src="~@/static/imgs/wb.png" style="width: 30px; height: 30px" alt="微博登录"></a>&ndash;&gt;-->
          <!--          </div>-->
          <div class="forget-user">
            <a href="/forget">找回密码</a>
            <a href="/register">马上注册</a>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>

  </div>
</template>

<script>
import Footer from "../components/footer";
// import JWT from "../storage/index"

export default {
  name: "login",
  components: {
    Footer,
  },
  data() {
    return {
      username: "",
      password: ""
    }
  },
  computed: {},
  methods: {
    // 不能直接调用
    getCartNum(token) {
      // 初始没有需要用这个
      this.axios.get('/carts/', {
        headers: {'Authorization': "JWT " + token}
      }).then((res) => {
        console.log(res)
        console.log(res.data.total)
        return res.data.total;
      })
    },
    Login() {
      // 相当于拆包 解构
      let {username, password} = this;
      this.axios.post('/login/', {
        username,
        password
      }).then((res) => {
        // console.log(res)
        // jwt 鉴权登录  有问题  跳转页面没有
        // JWT.setJWT(res.data.token);
        // 存入vuex
        this.$store.dispatch('saveUserName', res.data.username);
        this.$store.dispatch('saveToken', res.data.token);
        this.$store.dispatch('saveUid', res.data.uid);
        // 7天
        // 初始没有需要用这个  不能在这里写死
        // this.axios.get('/carts/', {
        //   headers: {'Authorization': "JWT " + res.data.token}
        // }).then((res) => {
        //   this.$cookie.set('cart', res.data.total, {expires: '7D'});
        //   this.$store.dispatch('saveCartNums', res.data.total);
        // })
        this.$cookie.set('token', res.data.token, {expires: '7D'});
        this.$cookie.set('uid', res.data.user_id, {expires: '7D'});
        this.$cookie.set('username', res.data.username, {expires: '7D'});
        this.$router.push('/index.html')
      })
    }
  }
}
</script>

<style lang="scss">
.login {
  .login-header {
    // 垂直居中
    display: flex;
    align-items: center;
    width: 1200px;
    margin: 0 auto;
    height: 85px;

    .header-logo {
      display: inline-block;

      img {
        width: 150px;
        height: 50px;
      }
    }

    h2 {
      font-size: 20px;
      margin-left: 15px;
    }
  }

  .login-body {
    background: url('~@/static/imgs/login-bg.jpg') no-repeat center;

    .container {
      height: 560px;
      width: 1200px;
      margin: 0 auto;
      //position: relative;

      .login-form {
        float: right;
        margin-top: 25px;
        //position: absolute;
        //top: 150px;
        //left: 1000px;
        //right: 500px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;

        display: flex;
        flex-direction: column;
        align-items: center;

        box-sizing: border-box;


        h3 {
          line-height: 23px;
          font-size: 24px;
          color: #FF6600;
          text-align: center;
          margin: 40px auto 49px;

          .checked {
            color: #FF6600;
          }

          .sep-line {
            margin: 0 32px;
          }
        }

        .username, .password {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #E5E5E5;
          margin-bottom: 20px;

          input {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border: none;
            padding-left: 18px;
          }
        }

        .btn-box {
          width: 348px;
          background-color: #FF6600;
          text-align: center;

          .btn {
            width: 100%;
            color: #FFFFFF;
            font-weight: 700px;
            line-height: 50px;
            margin-top: 10px;
            font-size: 16px;
          }
        }

        .third-login {
          height: 50px;
          margin-top: 20px;

          a {
            margin-right: 20px;
          }

          img {
            width: 30px;
            height: 30px;
          }
        }

        .forget-user {
          margin-top: 20px;
          // flex 必须有高度和宽度
          //height: 20px;
          width: 348px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          a {
            color: #FF6600;
            font-size: 16px;
          }


        }
      }
    }
  }
}

</style>
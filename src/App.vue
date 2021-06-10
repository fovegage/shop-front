<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

// import JWT from "./storage/index"

export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('saveUserName', this.$cookie.get('username'));
    this.$store.dispatch('saveToken', this.$cookie.get('token'));
    this.$store.dispatch('saveUid', this.$cookie.get('uid'));
    // this.getCartNum();
    // 不能从cookie里面获取 这样就写死了
    // this.$store.dispatch('saveCartNums', this.$cookie.get('cart'));
    if (this.$store.state.token) {
      this.axios.get('/carts/',).then((res) => {
        this.$store.dispatch('saveCartNums', res.data.total);
      })
    }
  },
  methods: {
    // getCartNum() {
    //   this.axios.get('/carts/',).then((res) => {
    //     this.$store.dispatch('saveCartNums', res.data.total)
    //   })
    // },
    // getUserInfo(uid) {
    //   this.axios.get('/users/' + uid + '/', {
    //     headers: {'Authorization': this.$cookie.get('token')}
    //   }).then((res) => {
    //     this.$store.dispatch('saveUserName', res.data.username)
    //   })
    // }
  }
}
</script>

<style lang="scss">
@import "assets/scss/reset";
</style>

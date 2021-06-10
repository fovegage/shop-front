<template>
  <div>
    <!--    注意这里使用props进行传值  myheader是动态的  不能在这里固定  应该每个页面加入-->
    <router-view></router-view>
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import NavFooter from "../../components/NavFooter";

export default {
  name: "my",
  components: {
    NavFooter
  }
}
</script>

<style scoped>

</style>
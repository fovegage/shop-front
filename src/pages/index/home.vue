<template>
  <div>
    <NavHeader :category="category"></NavHeader>
    <router-view :category="category"></router-view>
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import NavHeader from "../../components/NavHeader";
import NavFooter from "../../components/NavFooter";

export default {
  name: "home",
  data() {
    return {
      category: []
    }
  },
  components: {
    NavFooter,
    NavHeader
  },
  methods: {
    getCategory() {
      this.axios.get('/categories/').then((res) => {
        this.category = res.data.list;
      })
    },
  },

  mounted() {
    this.getCategory();
  }
}
</script>

<style scoped>

</style>
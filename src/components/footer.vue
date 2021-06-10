<template>

  <div class="copyright-intro">
    <div class="question">
      <a href="javascript:;">常见问题</a> |
      <a href="javascript:;">隐私政策</a> |
      <a href="javascript:;">用户协议</a>
    </div>
    <div class="copy-intro">Copyright ©2021 www.japanhui.com All Rights Reserved.</div>
  </div>

</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss">
.copyright-intro {
  height: 85px;
  background-color: #F8F8F8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .question {
    padding: 7px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666666;

    a {
      margin: 0 10px;
      font-size: 14px;
      color: #666666;

    }
  }

  .copy-intro {
    font-size: 14px;
    color: #666666;
  }
}
</style>
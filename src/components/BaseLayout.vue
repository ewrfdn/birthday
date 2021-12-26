<template>
  <div class="layout-cotainer">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'BaseLayout'
}
</script>
<style lang="less" scoped>
.layout-cotainer{
  width: 100vw;
  height: 100vh;
  background: rgb(8, 40, 43);
  overflow: hidden;
}
</style>

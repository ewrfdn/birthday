<template>
  <div class="bg" ref=bg>

  </div>
</template>

<script>
import Snowflakes from 'magic-snowflakes'
export default {
  name: 'about',
  data () {
    return {

    }
  },
  mounted () {
    this.initCanvas()
  },
  methods: {
    initCanvas () {
      this.snowflakes = new Snowflakes({
        color: '#fff', // Default: "#5ECDEF"
        container: this.$refs.bg, // Default: document.body
        count: 100, // 100 snowflakes. Default: 50
        minOpacity: 0.1, // From 0 to 1. Default: 0.6
        maxOpacity: 0.95, // From 0 to 1. Default: 1
        minSize: 20, // Default: 10
        maxSize: 50, // Default: 25
        rotation: true, // Default: true
        speed: 2, // The property affects the speed of falling. Default: 1
        wind: false, // Without wind. Default: true
        width: 500, // Default: width of container
        height: window.innerHeight, // Default: height of container
        zIndex: 100 // Default: 9999
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bg{
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>

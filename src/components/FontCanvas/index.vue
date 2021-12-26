<template>
  <div class="canvas-wrapper">
      <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import canvas from './module/canvas'
export default {
  props: {
    value: {
      type: [String, Number],
      default: '233'
    }
  },
  watch: {
    value () {
      canvas.Shape.switchShape(canvas.ShapeBuilder.letter(this.value), true)
    }
  },
  mounted () {
    canvas.init(this.$refs.canvas)
    canvas.Shape.switchShape(canvas.ShapeBuilder.letter(this.value), true)
  }
}
</script>

<style lang="less" scoped>
.canvas-wrapper{
    width: 100%;
    height: 100%;
}
</style>

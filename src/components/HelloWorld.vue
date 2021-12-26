<template>
  <div class="body" @click="toNext">
    <FontCanvas :value="value" />
  </div>
</template>

<script>
import FontCanvas from '@/components/FontCanvas'
import dayjs from 'dayjs'
function sleep (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time * 1000)
  })
}
export default {
  name: 'HelloWorld',
  components: {
    FontCanvas
  },
  props: {
    msg: String
  },
  mounted () {
    this.value = dayjs().format('hh:mm:ss')
    this.countdown()
  },
  data () {
    return {
      value: '',
      enableRoute: false
    }
  },
  methods: {
    async nextStep () {
      this.value = '生日快乐'
      await sleep(2)
      this.value = '雷书雨'
      await sleep(3)
      this.value = ''
      await sleep(1)
      this.value = '请点击屏幕后继续'
      this.enableRoute = true
    },
    toNext () {
      this.enableRoute = false
      this.value = ''
    },
    countdown () {
      const now = new Date()
      const target = new Date('2021-12-26 14:40')
      const timeSpan = ~~((target.getTime() - now.getTime()) / 1000)
      if (timeSpan < 0) {
        this.nextStep()
      } else if (timeSpan <= 10) {
        this.value = timeSpan
        setTimeout(() => {
          this.countdown()
        }, 1000)
      } else {
        this.value = timeSpan
        setTimeout(() => {
          this.countdown()
        }, 1000)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.body{
  width: 100%;
  height: 100%;
}
</style>

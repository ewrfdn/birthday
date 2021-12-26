<template>
  <div class="cake-container">
<candle/>
  </div>
</template>

<script>
import Candle from '../components/Candle.vue'
export default {
  components: { Candle }

}
</script>

<style>
.cake-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%};
</style>

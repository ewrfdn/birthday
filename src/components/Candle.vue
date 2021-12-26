<template>
  <div>
  <div class="candle" :class="activate?'candle-activate':'candle-default'" @click="deactivate">
  <span  :class="activate?'glow':'default'"></span>
  <span :class="activate?'flames':'default'"></span>
  <span class="thread"></span>
</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      activate: true
    }
  },
  methods: {
    deactivate () {
      this.activate = false
    }
  }

}
</script>

<style>

.candle-activate{
 background: linear-gradient(
        rgb(248, 245, 64),
        rgb(228, 150, 49),
        rgb(38, 223, 167),
        rgb(133, 189, 88) 50%,
        rgba(35, 39, 19, 0.6)
    );
}
.candle-default{
background: linear-gradient(
        rgb(173, 171, 44),
        rgb(179, 118, 40),
        rgb(38, 223, 167),
        rgb(162, 228, 107) 50%,
        rgba(125, 139, 69, 0.6)
    );
}
.candle {
    transform: scale(0.4);
    width: 10em;
    height: 100em;
    font-size: 7px;

    box-shadow:
        inset 2em -3em 5em rgba(0, 0, 0, 0.4),
        inset -2em 0 5em rgba(0, 0, 0, 0.4);
    border-radius: 10em / 4em;
    position: relative;
    display: flex;
    justify-content: center;
    top: 10em;
}
.candle::before {
    content: '';
    position: absolute;
    width: inherit;
    height: 5em;
    border: 0.2em solid rgb(241, 177, 98);
    border-radius: 50%;
    box-sizing: border-box;
    background: radial-gradient(
        #444,
        rgb(250, 192, 86),
        rgb(170, 117, 78),
        rgb(158, 111, 89),
        darkorange
    );
    filter: opacity(0.7);
}

.thread {
    position: absolute;
    width: 0.6em;
    height: 3.6em;
    top: -1.8em;
    background: linear-gradient(
        #111,
        black,
        rgba(243, 196, 108, 0.904) 90%
    );
    border-radius: 40% 40% 0 0;
}

.flames {
    position: absolute;
    width: 2.4em;
}

.flames::before {
    content: '';
    position: absolute;
    width: inherit;
    height: 6em;
    background-color: royalblue;
    top: -4.8em;
    border-radius: 50% 50% 35% 35%;
    border: 0.2em solid dodgerblue;
    box-sizing: border-box;
    filter: opacity(0.7);
}

.flames::after {
    content: '';
    position: absolute;
    width: inherit;
    height: 12em;
    top: -12em;
    background: linear-gradient(white 80%, transparent);
    border-radius: 50% 50% 20% 20%;
    box-shadow: 0 -0.6em 0.4em darkorange;
    animation:
        enlarge 5s linear infinite,
        move 6s linear infinite;
}

@keyframes move {
    0%, 100% {
        transform: rotate(2deg);
    }

    50% {
        transform: rotate(-2deg);
    }
}

@keyframes enlarge {
    0%, 100% {
        height: 12em;
        top: -12em;
    }

    50% {
        height: 14em;
        top: -13em;
    }
}

.glow {
    position: absolute;
    width: 10em;
    height: 18em;
    background-color: orangered;
    border-radius: 50%;
    top: -17em;
    filter: blur(6em);
    animation: blink 100ms infinite;
}

@keyframes blink {
    to {
        filter: blur(6em) opacity(0.8);
    }
}

</style>

<template>
  <div @click="scrollTop" class="move_above theme-bg-color" v-show="show">
      Scroll To Top
  </div>
</template>

<script>
export default {
    props: {
        show:{
            default: false,
            type: Boolean
        }
    },
  data() {
    return {};
  },
  methods: {
    scrollTop() {
      var scrollToptimer = setInterval(function() {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        var speed = top / 4;
        if (document.body.scrollTop != 0) {
          document.body.scrollTop -= speed;
        } else {
          document.documentElement.scrollTop -= speed;
        }
        if (top <= 0) {
          clearInterval(scrollToptimer);
        }
      }, 30);
    }
  }
};
</script>

<style scoped>
@media (max-width: 1200px) {
  .move_above{
    /* opacity: .8; */
    background: rgba(244, 191, 39, .8)
  }
}
.move_above{
    position: fixed;
    right: 20px;
    bottom: 50px;
    width: 120px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    cursor: pointer;
}
</style>



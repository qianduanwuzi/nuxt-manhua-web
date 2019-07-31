<template>
    <div class="layout_footer_box">
        <!-- <div>
            <span v-for="one in cates" :key="one.name" class="each_nav">
                <nuxt-link :to="one.url"><span class="each_nav_txt">{{one.name}}</span></nuxt-link>
            </span>
        </div>
        <div class="copy_txt">2017 © MangaRiver.com</div> -->
    </div>
</template>

<script>
import cates from './cate' 
export default {
  data() {
    return {
      cates,
    };
  }
};
</script>

<style scoped>
/* .layout_footer_box{
      border-top: 1px solid #d8d8d8;
    width: 1272px;
    margin: 0 auto;
    padding: 26px 0;
}

.each_nav {
  padding: 20px 28px;
  display: inline-block;
}

.each_nav_txt{
    font-size: 13px;
    font-weight: 600;
}

.copy_txt{
    text-align: center
} */

</style>


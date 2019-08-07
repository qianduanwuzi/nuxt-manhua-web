<template>
  <div style="width: 100%">
    <div class="index_container pc">
      <!-- swiper -->
      <div class="index_swiper">
        <!-- testarr{{testArr}} -->
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="HOT UPDATES" key="1"></a-tab-pane>
        </a-tabs>
        <a-carousel autoplay>
          <div v-for="(one, index) in pageNo" :key="index">
            <div
              class="swiper-slide"
              v-for="(banner, sIndex) in banners.slice(0+6*index, 6+6*index)"
              :key="sIndex"
              :title="banner.name"
            >
              <nuxt-link :to="`/${banner.url_name}`">
                <img :src="'/images/'+banner.cover" class="swiper_img">
                <div class="swiper_img_intro">{{banner.name}}</div>
              </nuxt-link>
            </div>
          </div>
        </a-carousel>
      </div>
      <div class="index_bottom_box">
        <!-- LATEST MANGA UPDATES -->
        <!-- <div class="latest_updates"> -->
        <!-- <a-tabs>
            <a-tab-pane tab="LATEST MANGA UPDATES"></a-tab-pane>
          </a-tabs>
        <div>updates</div>-->
        <div class="pc">
          <div class="latest_chapters_box white_bg">
            <a-tabs defaultActiveKey="1">
              <a-tab-pane tab="LATEST MANGA UPDATES" key="1"></a-tab-pane>
            </a-tabs>
            <div>
              <div v-for="one in list" :key="one.id" class="each_latset_chapter">
                <div class="left">
                  <img :src="'/images/'+one.cover" style="width: 30px;height: 47px" alt>
                  <div style="margin-left: 9px">
                    <div class="title_name">{{one.name}}</div>
                    <div v-if="one.chapters.length">
                      <div v-for="sone in one.chapters" :key="sone.chapter" class="chapter">
                        <nuxt-link
                          :to="`/${one.url_name}/${sone.chapter}/1`"
                        >{{one.name}} - {{sone.chapter}}</nuxt-link>
                      </div>
                    </div>
                    <div v-else style="font-size: 12px;">to be updated!</div>
                  </div>
                </div>
                <div class="right">{{one.updated_at}}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- </div> -->
        <login-reg></login-reg>
      </div>
    </div>
    <div class="m_index_container mb">
      <a-tabs defaultActiveKey="1" class="white_bg m_p">
        <a-tab-pane tab="HOT UPDATES" key="1">
          <a-carousel autoplay>
            <a-row v-for="(one, index) in mPageNo" :key="index">
              <a-col
                v-for="(banner, sIndex) in banners.slice(0+3*index, 3+3*index)"
                :key="sIndex"
                :title="banner.name"
                class="swiper-slide"
                span="8"
              >
                <nuxt-link
                  :to="`/${banner.url_name}`"
                  :style="{'background': 'url(/images/'+banner.cover+')'+' no-repeat ', 'background-size': '100% 100%', display: 'block', height: '40vw'}"
                ></nuxt-link>
                <div class="swiper_img_intro" @click="go(banner.name)">{{banner.name}}</div>
              </a-col>
            </a-row>
          </a-carousel>
        </a-tab-pane>
      </a-tabs>
          <div class="latest_chapters_box white_bg" style="padding: 0 4vw;margin-top: 20px" >
            <a-tabs defaultActiveKey="1">
              <a-tab-pane tab="LATEST MANGA UPDATES" key="1"></a-tab-pane>
            </a-tabs>
            <div>
              <div v-for="one in list" :key="one.id" class="each_latset_chapter">
                <div class="left" style="display: flex; margin-bottom: 10px;">
                  <img :src="'/images/' + one.cover" style="width: 30px;height: 47px" alt>
                  <div style="margin-left: 9px">
                    <div class="title_name">{{one.name}}</div>
                    <div v-if="one.chapters.length">
                      <div v-for="sone in one.chapters" :key="sone.chapter" class="chapter">
                        <nuxt-link
                          :to="`/${one.url_name}/${sone.chapter}/1`"
                        >{{one.name}} - {{sone.chapter}}</nuxt-link>
                      </div>
                    </div>
                    <div v-else style="font-size: 12px;">to be updated!</div>
                  </div>
                </div>
                <!-- <div class="right">{{one.updated_at}}</div> -->
              </div>
            </div>
            </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue';
import img1 from "../assets/img/mangariver.png";
import axios from "axios";
import LoginReg from "../components/LoginReg";
export default {
   async asyncData (context) {
     const hot_res = await axios.get("https://mangadrawer.com/api/manga", {params: { page: 1, size: 100, hot: true }})
     const latest_res = await axios.get("https://mangadrawer.com/api/chapters/latest")
    return { banners: hot_res.data.data.docs, list: latest_res.data.data }
  },
  components: { LoginReg },
  data() {
    return {
      showBtn: true,
    };
  },
  computed: {
    pageNo() {
      if (this.banners && this.banners.length) {
        if (this.banners.length <= 6) return 1;
        else
          return (
            parseInt(this.banners.length / 6) +
            (this.banners.length % 6 ? 1 : 0)
          );
      } else return 0;
    },
    mPageNo() {
      if (this.banners && this.banners.length) {
        if (this.banners.length <= 3) return 1;
        else
          return (
            parseInt(this.banners.length / 3) +
            (this.banners.length % 3 ? 1 : 0)
          );
      } else return 0;
    }
  },
  methods: {
    go(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    // console.log(this.$store)
    this.$nextTick(() => {
      this.$store.commit(
        "title/SetTitle",
        "Wuxia manga,Xianxia manga,Xiuxian manga"
      );
    });
  }
};
</script>

<style lang="scss" scoped>
// mb style
.m_index_container {
  padding: 6vw 4vw;
  .swiper-slide {
    .swiper_img {
      width: 100%;
      height: 40vw;
    }
    .swiper_img_intro {
      background: #4e4f4e;
      color: #fff;
      width: 100%;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 20px;
    }
  }
}

// mb end

.index_container {
  width: 1140px;
  margin: 0 auto;
  /* background: #fff; */
}

.login_btn {
  width: 100%;
}

.index_swiper {
  /*border-bottom: 5px solid #f5bb00;*/
  border-bottom: 5px solid #3bb982;
  padding: 15px;
  margin-bottom: 20px;
  position: relative;
  background: #fff;
}

.index_swiper .swiper-slide {
  width: 185px;
  padding: 5px 5px 40px 5px;
  display: inline-block;
}

.index_swiper .swiper_img {
  height: 193px;
  width: 145px;
}

.index_swiper .swiper_img_intro {
  width: 145px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 5px;
  line-height: 30px;
  text-align: center;
  background-color: #4e4f4e;
  color: #fff;
}

.index_bottom_box {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

 .latest_chapters_box {
    width: 750px;
  }
}


.latest_updates {
  padding: 25px;
  width: 750px;
  background: #fff;
}

.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

/* .img-inner-box{
  position: relative
}
.img-box{
}
.read_more{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
}

.img-box:hover .read_more{
  display: flex;
  align-items: center;
}

.read_in_more{
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  width: 180px;
  padding: 18px;
  margin: 0 auto;
  text-align: center;

  animation:largewidth .5s linear;
}

@keyframes largewidth
{
from {width:150px;}
to {width:180px;}
}

.fooer_ope{
  position: absolute;
  top: 100%;
  left: 0;
} */
</style>

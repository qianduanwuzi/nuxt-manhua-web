<template>
  <div>
    <div class="cartoon_detail_box pc">
      <div class="header_box">
        <div class="ope_box">
          <div class="cartoon_info">{{name}}-{{chapter}}</div>
          <div class="ope_right_box flex-align">
            <a-select style="width: 120px" class="each_ope_item" v-model="deVal">
              <a-select-option :value="index+1" v-for="(one, index) in imgs" :key="index">
                <nuxt-link :to="`/${routerInfo.cartoon}/${chapter}/${index+1}`">page - {{index+1}}</nuxt-link>
              </a-select-option>
            </a-select>
            <a-button type="primary" @click="addWish">
              <a-icon type="heart"/>Add to favorites
            </a-button>
          </div>
        </div>
        <div class="switch_box flex-align">
          <div class="switch_left flex-align" @click="prevPage">
            <div class="arrow_box"><</div>
            <div style="margin-left: 10px">
              <div class="theme-color">chapter {{chapter}}</div>
              <div class="prev_next">Prev Page {{Number(curPageNo)-1 >= 1?Number(curPageNo)-1 : ''}}</div>
            </div>
          </div>
          <div class="switch_middle flex-align">
            <a-select style="width: 150px" class="each_ope_item" v-model="chapterDeval">
              <a-select-option :value="index+1" v-for="(one, index) in chapters" :key="index">
                <nuxt-link :to="`/${routerInfo.cartoon}/${one}/1`">Chapter {{one}}</nuxt-link>
              </a-select-option>
            </a-select>
          </div>
          <div class="switch_right flex-align" @click="nextPage">
            <div style="margin-right: 10px">
              <div class="theme-color">chapter {{chapter}}</div>
              <div
                class="prev_next"
              >Next Page {{Number(curPageNo)+1 <= imgs.length? Number(curPageNo)+1 : ''}}</div>
            </div>
            <div class="arrow_box">></div>
          </div>
        </div>
      </div>
      <div style="position: relative" @mouseover="showimgope = true" @mouseout="showimgope = false">
         <div class="left_click" style="position: absolute; left: 0; width: 50%; z-index: 1;height: 100%;cursor:pointer" @click="prevPage" v-show="showimgope">
           <div class="arrow_box" style="position: fixed;top: 50%"><</div>
        </div>
        <div class="right_click" style="position: absolute; right: 0; width: 50%; z-index: 1;height: 100%;cursor:pointer" @click="nextPage" v-show="showimgope">
          <div class="arrow_box"  style="position: fixed;top: 50%;margin-left: 353px">></div>
        </div>
        <img :src="imgUrl" class="see_img"  >
        <div v-show="!imgUrl">Cartoon to be updated.</div>
      </div>
    </div>
    <div class="mb mb_cartoon_detail_box white_bg">
      <div class="m_cartoon_info">
        <div class="theme-color" style="margin-bottom: 1vw">{{name}}-{{chapter}}</div>
        <a-button type="danger" @click="addWish" size="small">
          <a-icon type="heart"/>Add to favorites
        </a-button>
      </div>
      <div class="m_content_box">
           <div class="switch_box flex-align">
          <div class="switch_left flex-align" @click="prevPage">
            <div class="arrow_box"><</div>
            <div style="margin-left: 10px">
              <div class="theme-color">chapter {{chapter}}</div>
              <div class="prev_next">Prev Page {{Number(curPageNo)-1 >= 1?Number(curPageNo)-1 : ''}}</div>
            </div>
          </div>
          <div class="switch_middle flex-align">
            <a-select  class="each_ope_item" v-model="chapterDeval">
              <a-select-option class="mb_page_option" :value="index+1" v-for="(one, index) in chapters" :key="index">
                <nuxt-link :to="`/${routerInfo.cartoon}/${one}/1`">Chapter {{one}}</nuxt-link>
              </a-select-option>
            </a-select>
          </div>
          <div class="switch_right flex-align" @click="nextPage">
            <div style="margin-right: 10px">
              <div class="theme-color">chapter {{chapter}}</div>
              <div
                class="prev_next"
              >Next Page {{Number(curPageNo)+1 <= imgs.length? Number(curPageNo)+1 : ''}}</div>
            </div>
            <div class="arrow_box">></div>
          </div>
        </div>
      </div>
      <div >

        <img :src="imgUrl" class="see_img" alt>
        <div v-show="!imgUrl">Cartoon to be updated.</div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [],
      chapters: [],
      imgUrl: "",
      name: "",
      deVal: 1,
      chapterDeval: 1,
      showimgope: false,
      id: -1,
      metaData: {
        title: 'MangaDrawer Detail',
        content: ''
      }
    };
  },
  head () {
    return {
      title: this.metaData.title,
      meta: [
        { hid: 'manga-desc', name: 'description', content: this.metaData.content }
      ]
    }
  },
  computed: {
    routerInfo() {
      return this.$route.params;
    },
    // id() {
    //   return this.$route.params.cartoon.split("-")[
    //     this.$route.params.cartoon.split("-").length - 1
    //   ];
    // },
    // aliasName() {
    //   return
    // },
    chapter() {
      console.log("83", this.$route.params);
      return this.$route.params.chapter;
    },
    curPageNo() {
      return this.$route.params.page;
    }
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    nextPage() {
      if (Number(this.curPageNo) + 1 <= this.imgs.length) {
        this.$router.push({
          path: `/${this.routerInfo.cartoon}/${this.chapter}/${Number(
            this.curPageNo
          ) + 1}`
        });
      }
    },
    prevPage() {
      if (Number(this.curPageNo) - 1 >= 1) {
        this.$router.push({
          path: `/${this.routerInfo.cartoon}/${this.chapter}/${Number(
            this.curPageNo
          ) - 1}`
        });
      }
    },
    changePage(pageNo = 1) {
      this.imgUrl = "https://mangadrawer.com//images/" + this.imgs[pageNo].pic;
    },
    async getImgs() {
      const res = await this.$api.get(`/manga/${this.id}/${this.chapter}`);
      this.imgs = res.data;
      return res;
    },
    //
    async getDetail() {
      const res = await this.$api.get(`/manga/detail/url-name/${this.$route.params.cartoon}`)
        this.chapters = res.data.chapters;
      this.name = res.data.name;
      this.id = res.data.id
       // this.$store.commit('title/SetTitle', res.data.name+' manga')
      this.metaData.title = res.data.name + ' manga';
      this.metaData.content = res.data.name + ' manga';
      return res

      // const res = await this.$api.get(`/manga/${this.id}`);
      // this.chapters = res.data.chapters;
      // this.name = res.data.name;
      // this.$store.commit('title/SetTitle', res.data.name+' manga')
    },
    addWish() {
      this.$api.post("/favorite", { mangaId: this.id }).then(res => {
        if (res) {
          this.$message.success("Add Success!");
        }
      });
    }
  },
  watch: {
    $route: {
      deep: true,
      handler(v) {
         this.getDetail().then(res => {
          this.chapterDeval = Number(this.$route.params.chapter);
          this.getImgs().then(res => {
            this.deVal = Number(this.$route.params.page);
            this.changePage(this.deVal - 1);
          });
        });
      },
      immediate: true
    }
  }
};
</script>


<style lang="scss" scoped>
.left_click:hover .arrow_box, .right_click:hover .arrow_box{
    width: 40px;
    /*background: rgba(244, 191, 39, 0.7);*/
    background: #3BB982;
}

.left_click:hover .arrow_box{
  margin-left: -15px;
}

.mb_cartoon_detail_box {
  margin: 6vw 4vw;
  .m_cartoon_info{
    margin: 4vw;
    padding: 4vw 0;
    /*border-bottom: 1px solid #f5bb00;*/
    border-bottom: 1px solid #3BB982;
  }
  .m_content_box{
    padding: 0 4vw;
  }
}
.cartoon_detail_box {
  width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 25px;
}

.header_box .ope_box {
  text-transform: Uppercase;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header_box .ope_box .cartoon_info {
  /*color: #f5bb00;*/
  color: #3BB982;
  padding: 12px 16px;
  /*border-bottom: 1px solid #f5bb00;*/
  border-bottom: 1px solid #3BB982;
}

.each_ope_item {
  margin-right: 10px;
}

.switch_box {
  justify-content: space-between;
  margin: 10px 0 15px 0;
}

.arrow_box {
  width: 20px;
  line-height: 58px;
  /*background: #f5bb00;*/
  background: #3BB982;
  text-align: center;
  color: #fff;
  font-size: 22px;
}

.switch_left,
.switch_middle,
.switch_right {
  width: 33.33%;
  cursor: pointer;
}

.prev_next {
  color: #99999a;
  font-size: 12px;
}

.switch_middle {
  justify-content: center;
}

.switch_right {
  justify-content: flex-end;
}

.switch_left:hover .arrow_box,
.switch_right:hover .arrow_box {
  background: #50514f;
}

.see_img {
  max-width: 100%;
  margin: 0 auto;
  display: block;
}

  .mb_page_option {
    width: auto;
  }
</style>


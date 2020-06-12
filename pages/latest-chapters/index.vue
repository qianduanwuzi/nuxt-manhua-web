<template>
  <div>
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
    <div class="mb">
      <div class="latest_chapters_box white_bg">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="LATEST MANGA UPDATES" key="1"></a-tab-pane>
        </a-tabs>
        <div>

        <div v-for="one in list" :key="one.id" class="each_latset_chapter">
          <div class="left">
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
import axios from "axios";
export default {
  async asyncData(context) {
    const res_list = await axios.get(
      "https://mangadrawer.com/api/chapters/latest"
    );
    return { list: res_list.data.data };
  },
  data() {
    return {
      list: []
    };
  },
  mounted() {
    // this.getLatest();
  },
  methods: {
    // getLatest() {
    //   this.$api.get("/chapters/latest").then(res => {
    //     if (!res.data.length) {
    //       this.$message.error("No Data!");
    //     } else this.list = res.data;
    //   });
    // }
  }
};
</script>

<style lang="scss">
.pc {
  .latest_chapters_box {
    width: 750px;
    padding: 25px;
    .each_latset_chapter {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 20px 5px;
      border-bottom: 1px dashed #ccc;
      .left {
        display: flex;
        align-items: flex-start;
        font-family: Lato, sans-serif;
        .title_name {
          color: #4e4f4e;
          font-size: 13px;
          font-weight: bold;
        }
        .chapter {
          color: #45433f;
          font-size: 13px;
          margin-left: 10px;
        }
      }
      .right {
        color: #c2c2c2;
        font-size: 12px;
      }
    }
     .each_latset_chapter:first-child{
        padding-top: 0px;
    }
  }
}
.mb {
  .latest_chapters_box {
    width: 90%;
    margin: 20px auto;
    padding: 20px;
    .each_latset_chapter {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 20px 5px;
      border-bottom: 1px dashed #ccc;
      .left {
        display: flex;
        align-items: flex-start;
        font-family: Lato, sans-serif;
        .title_name {
          color: #4e4f4e;
          font-size: 13px;
        }
        .chapter {
          color: #45433f;
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
    .each_latset_chapter:first-child{
        padding-top: 0px;
    }
  }
}
</style>



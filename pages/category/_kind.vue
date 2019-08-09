<template>
  <div>
    <div class="result_content pc" v-show="list.length">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="POPULAR MANGA" key="1"></a-tab-pane>
      </a-tabs>
      <div v-for="(one, index) in list" :key="one.id">
        <div class="each_res" :style="{'margin-top': index? '20px' : '0'}">
          <a-row style="font-size: 12px;font-family: Lato,sans-serif">
            <a-col :span="8">
              <nuxt-link :to="`/${one.url_name}`">
                <img :src="'/images/'+one.cover" style="width: 190px;height: 250px">
              </nuxt-link>
            </a-col>
            <a-col :span="16">
              <div class="title" style="font-size: 13px">{{one.name}}</div>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Status:</label>
                </a-col>
                <a-col span="18">{{one.status? 'Completed' : 'Ongoing'}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Categories:</label>
                </a-col>
                <a-col span="18">
                  <nuxt-link :to="`/category/${sone}`" v-for="sone in one.categories" :key="sone">
                    {{sone}}
                    <span v-if="sone != one.categories[one.categories.length-1]">,</span>
                  </nuxt-link>
                </a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Type:</label>
                </a-col>
                <a-col span="18">{{one.type || '-'}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Author:</label>
                </a-col>
                <a-col span="18">{{one.author || '-'}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Artist:</label>
                </a-col>
                <a-col span="18">{{one.artist || '-'}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Total Views:</label>
                </a-col>
                <a-col span="18">-</a-col>
              </a-row>
              <a-row style="margin-top: 10px">
                <nuxt-link :to="`/${one.url_name}`">
                  <a-button type="primary" style="width: 100%">Chapter list</a-button>
                </nuxt-link>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <div class="mb m_result_content white_bg" v-show="list.length">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="POPULAR MANGA" key="1"></a-tab-pane>
      </a-tabs>
      <div v-for="(one, index) in list" :key="one.id">
        <div class="each_res" :style="{'margin-top': index? '20px' : '0'}">
          <a-row>
            <a-col :span="10">
              <nuxt-link :to="`/${one.url_name}`">
                <img :src="'/images/'+one.cover" style="width: 100%">
              </nuxt-link>
            </a-col>
            <a-col :span="13" offset="1">
              <div class="title omit theme-color">{{one.name}}</div>
              <a-row class="align_margin">
                <a-col span="8">
                  <label for>Status:</label>
                </a-col>
                <a-col span="16">{{one.status? 'Completed' : 'Ongoing'}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="10">
                  <label for>Categories:</label>
                </a-col>
                <a-col span="14">
                  <div class="omit">
                    <nuxt-link :to="`/category/${sone}`" v-for="sone in one.categories" :key="sone">
                      {{sone}}
                      <span v-if="sone != one.categories[one.categories.length-1]">,</span>
                    </nuxt-link>
                  </div>
                </a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="8">
                  <label for>Type:</label>
                </a-col>
                <a-col span="16">{{one.type}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="8">
                  <label for>Author:</label>
                </a-col>
                <a-col span="16">{{one.author}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="8">
                  <label for>Artist:</label>
                </a-col>
                <a-col span="16">{{one.artist}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="10">
                  <label for>Total Views:</label>
                </a-col>
                <a-col span="14">{{one.views}}</a-col>
              </a-row>
              <a-row style="margin-top: 10px">
                <nuxt-link :to="`/${one.url_name}`">
                  <a-button type="primary" style="width: 100%" size="small">Chapter list</a-button>
                </nuxt-link>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  //  async asyncData(context) {
  //   const res_list = await axios.get(
  //     `https://admin.mangadrawer.com/api//categories/${this.kind}`,
  //     {params: { page: 1, size: 100 }}
  //   );
  //   return { list: res_list.data.data.docs };
  // },
  data() {
    return {
      list: []
    };
  },
  computed: {
    kind() {
      return this.$route.params.kind;
    }
  },
  mounted() {
    this.getList();
    this.$store.commit("title/SetTitle", this.kind + "category");
  },
  methods: {
    getList() {
      this.$api
        .get(`/categories/${this.kind}`, { page: 1, size: 100 })
        .then(res => {
          this.list = res.data.docs;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.m_result_content {
  margin: 6vw 4vw;
  padding: 4vw;
}
.advanced_search_box,
.result_content {
  background: #fff;
  width: 750px;
  padding: 25px;
  /* margin: 0px auto 20px auto; */
  margin-bottom: 20px;
}

.result_content .each_res {
  /* padding: 20px 0; */
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}

.advanced_search_box .search_box label,
.result_content label {
  font-size: 12px;
  color: #99999a;
}

.search_box .row_box {
  margin-top: 10px;
}
</style>

<template>
  <div>
    <div class="result_content pc" v-show="list.length">
        <!-- <div style="width: 100px;height: 100px;overflow-y:auto" @scroll.passive="scrollHandler">111111111111111111偶数默认文字是不会自动换行的</div> -->
      <!-- <nuxt-link @click.prevent="clickTest" to="/">test</nuxt-link> -->
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="POPULAR MANGA" key="1"></a-tab-pane>
      </a-tabs>
      <div v-for="(one, index) in list" :key="one.id">
        <div class="each_res" :style="{'margin-top': index? '20px' : '0'}">
          <a-row style="font-size: 12px;font-family: Lato,sans-serif">
            <a-col :span="8">
              <nuxt-link :to="`/${one.url_name}`">
                <img :src="'/images/'+one.cover" style="width: 190px;height: 250px" />
              </nuxt-link>
            </a-col>
            <a-col :span="16">
              <nuxt-link :to="`/${one.url_name}`">
                <div class="title" style="font-size: 13px;color: #3BB982;">{{one.name}}</div>
              </nuxt-link>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Alternative Name:</label>
                </a-col>
                <a-col span="18">{{one.alternative_name || '-'}}</a-col>
              </a-row>
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
                <a-col span="18">{{one.views || '-'}}</a-col>
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
      <a-pagination
        style="margin-top: 10px; text-align: center"
        showQuickJumper
        :defaultCurrent="1"
        :defaultPageSize="20"
        :total="count"
        @change="pageNum => getList(pageNum)"
      />

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
                <img :src="'/images/'+one.cover" style="width: 100%" />
              </nuxt-link>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="13" offset="1">
              <nuxt-link :to="`/${one.url_name}`">
                <div class="title omit theme-color">{{one.name}}</div>
              </nuxt-link>
              <a-row class="align_margin">
                <a-col span="14">
                  <label for>Alternative Name:</label>
                </a-col>
                <a-col span="10">{{one.alternative_name || '-'}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="14">
                  <label for>Status:</label>
                </a-col>
                <a-col span="10">{{one.status? 'Completed' : 'Ongoing'}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="14">
                  <label for>Categories:</label>
                </a-col>
                <a-col>
                  <div class="omit">
                    <nuxt-link :to="`/category/${sone}`" v-for="sone in one.categories" :key="sone">
                      {{sone}}
                      <span v-if="sone != one.categories[one.categories.length-1]">,</span>
                    </nuxt-link>
                  </div>
                </a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="14">
                  <label for>Type:</label>
                </a-col>
                <a-col span="10">{{one.type}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="14">
                  <label for>Author:</label>
                </a-col>
                <a-col span="10">{{one.author}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="14">
                  <label for>Artist:</label>
                </a-col>
                <a-col span="8">{{one.artist}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="14">
                  <label for>Total Views:</label>
                </a-col>
                <a-col span="10">{{one.views}}</a-col>
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
      <a-pagination
        style="margin-top: 20px;text-align:center"
        showQuickJumper
        :defaultCurrent="1"
        :defaultPageSize="20"
        :total="count"
        @change="pageNum => getList(pageNum)"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async asyncData(context) {
    const res_list = await axios.get(
      "https://admin.mangadrawer.com/api/manga/popular/list",
      { params: { page: 1, size: 20 } }
    );
    return { list: res_list.data.data.docs, count: res_list.data.data.count };
  },
  data() {
    return {

    };
  },
  mounted() {
    this.$store.commit("title/SetTitle", "Popular Manga");
  },
  methods: {
    clickTest() {
      alert(1)
    }
    // scrollHandler(e) {
    //   console.log('196', e.target.scrollTop)
    // }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .ant-pagination-item-active {
  border-color: #3bb982;
  color: #3bb982;
}

/deep/ .ant-pagination-prev:hover a,
/deep/ .ant-pagination-next:hover a {
  border-color: #3bb982;
  color: #3bb982;
}
/deep/ .ant-pagination-item:focus,
/deep/ .ant-pagination-item:hover {
  border-color: #3bb982;
  color: #3bb982;
}

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
.mb .omit {
  display: inline-grid;
}
</style>

<template>
  <div>
    <div class="pc">
      <div class="advanced_search_box">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="ADVANCED SEARCH" key="1"></a-tab-pane>
        </a-tabs>
        <div class="search_box">
          <a-row>
            <a-col span="4">
              <label for>Type</label>
            </a-col>
            <a-col span="20">
              <a-radio-group v-model="form.type">
                <a-radio
                  v-for="one in config.type"
                  :key="one.value"
                  :value="one.value"
                >{{one.label}}</a-radio>
              </a-radio-group>
            </a-col>
          </a-row>
          <a-row class="row_box">
            <a-col span="4">
              <label for>Author Name</label>
            </a-col>
            <a-col span="20">
              <a-input v-model="form.author"/>
            </a-col>
          </a-row>
          <a-row class="row_box">
            <a-col span="4">
              <label for>Artist Name</label>
            </a-col>
            <a-col span="20">
              <a-input v-model="form.artist"/>
            </a-col>
          </a-row>
          <a-row class="row_box">
            <a-col span="4">
              <label for>Categories</label>
            </a-col>
            <a-col span="20">
              <a-checkbox-group v-model="form.categories">
                <a-row>
                  <a-col :span="8" v-for="one in categories" :key="one">
                    <a-checkbox :value="one">{{one}}</a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </a-col>
          </a-row>
          <a-row class="row_box">
            <a-col span="4">
              <label for>Status</label>
            </a-col>
            <a-col span="20">
              <a-radio-group v-model="form.status">
                <a-radio value="0">Ongoing</a-radio>
                <a-radio value="1">Completed</a-radio>
                <a-radio value>Both</a-radio>
              </a-radio-group>
            </a-col>
          </a-row>
          <a-row class="row_box">
            <a-col span="11">
              <a-button
                type="primary"
                style="width: 100%"
                @click="search"
                :loading="searchLoading"
              >Search</a-button>
            </a-col>
            <a-col span="11" :offset="2">
              <a-button type="primary" style="width: 100%" @click="reset">Reset</a-button>
            </a-col>
          </a-row>
        </div>
      </div>
      <!-- 查询出符合条件的结果 -->
      <div class="result_content" v-show="list.length">
        <!-- {{{ "id": 3, "name": "더 게이머", "categories": [ "Action", "School life" ], "type": "Korea", "author": "Sung San Young", "artist": "", "views": "0", "status": 1, "hot": 0, "updated_at": "2019-03-21 20:46:24", "cover": "[object Object]" },}} -->
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="RESULTS" key="1"></a-tab-pane>
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
                  <a-col span="18">{{one.views}}</a-col>
                </a-row>
                <!-- <a-row style="margin-top: 5px">
                   <nuxt-link :to="`/${one.name}-${one.id}/capter/1`">
                        <a-button type="primary" style="width: 100%">Subscribe</a-button>
                    </nuxt-link>
                </a-row>-->
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
    </div>
    <div class="mb m_advanced_search_box">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="ADVANCED SEARCH" key="1"></a-tab-pane>
      </a-tabs>
      <div class="search_box">
        <a-row>
          <a-col span="8">
            <label for>Type</label>
          </a-col>
          <a-col span="16">
            <a-radio-group v-model="form.type">
              <a-radio v-for="one in config.type" :key="one.value" :value="one.value">{{one.label}}</a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
        <a-row class="row_box">
          <a-col span="8">
            <label for>Author Name</label>
          </a-col>
          <a-col span="16">
            <a-input v-model="form.author"/>
          </a-col>
        </a-row>
        <a-row class="row_box">
          <a-col span="8">
            <label for>Artist Name</label>
          </a-col>
          <a-col span="16">
            <a-input v-model="form.artist"/>
          </a-col>
        </a-row>
        <a-row class="row_box">
          <a-col span="8">
            <label for>Categories</label>
          </a-col>
          <a-col span="16">
            <a-checkbox-group v-model="form.categories">
              <a-row>
                <a-col :span="24" v-for="one in categories" :key="one">
                  <a-checkbox :value="one">{{one}}</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-col>
        </a-row>
        <a-row class="row_box">
          <a-col span="8">
            <label for>Status</label>
          </a-col>
          <a-col span="16">
            <a-radio-group v-model="form.status">
              <a-radio value="0">Ongoing</a-radio>
              <a-radio value="1">Completed</a-radio>
              <a-radio value>Both</a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
        <a-row class="row_box">
          <a-col span="11">
            <a-button
              type="primary"
              style="width: 100%"
              @click="search"
              :loading="searchLoading"
            >Search</a-button>
          </a-col>
          <a-col span="11" :offset="2">
            <a-button type="primary" style="width: 100%" @click="reset">Reset</a-button>
          </a-col>
        </a-row>
      </div>
      <div class="result_content" style="width: 100%;padding: 0" v-show="list.length">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="RESULTS" key="1"></a-tab-pane>
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
                    <div class="omit">{{one.categories}}</div>
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
  </div>
</template>

<script>
import config from "./config";
export default {
  data() {
    return {
      config,
      value: [],
      form: {
        page: 1,
        size: 10,
        type: "",
        status: "",
        author: "",
        artist: "",
        categories: []
      },
      searchLoading: false,
      list: []
    };
  },
  computed: {
    categories() {
      return this.config.Categories.split(",");
    }
  },
  mounted() {
    this.$store.commit("title/SetTitle", "advanced search");
  },
  methods: {
    reset() {
      this.form = {
        page: 1,
        size: 10,
        type: "",
        status: "",
        author: "",
        artist: "",
        categories: []
      };
    },
    search() {
      this.searchLoading = true;
      let param = { ...this.form };
      if (!param.type) delete param.type;
      if (!param.status) delete param.status;
      param.categories = param.categories.join(",");
      this.$api.get("/manga", param).then(res => {
        this.searchLoading = false;
        if (!res.data.count) {
          this.$message.error("No Data!");
        } else this.list = res.data.docs;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.m_advanced_search_box {
  margin: 6vw 4vw;
  padding: 4vw;
  background: #fff;
}
.advanced_search_box,
.result_content {
  background: #fff;
  width: 750px;
  padding: 25px;
  margin: 0px auto 20px auto;
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



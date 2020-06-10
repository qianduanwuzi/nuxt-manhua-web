<template>
  <div>
    <div class="cartoon_detail pc">
      <a-tabs defaultActiveKey="2">
        <a-tab-pane :tab="form.name" key="2"></a-tab-pane>
      </a-tabs>
      <a-row style="font-size: 14px">
        <a-col :span="8">
          <img :src="'/images/'+form.cover" style="width: 190px;height: 250px">
        </a-col>
        <a-col :span="16" style="font-size: 12px; font-family: Lato,sans-serif">
<!--          <div class="title" style="font-size: 13px">{{form.name}}</div>-->
          <a-row class="align_margin">
            <a-col span="6">
              <label for>Alternative Name:</label>
            </a-col>
            <a-col span="18">{{form.alternative_name || '-'}}</a-col>
          </a-row>
          <a-row class="align_margin">
            <a-col span="6">
              <label for>Status:</label>
            </a-col>
            <a-col span="18">{{form.status? 'Completed' : 'Ongoing'}}</a-col>
          </a-row>
          <a-row class="align_margin">
            <a-col span="6">
              <label for>Categories:</label>
            </a-col>
            <a-col span="18">
              <nuxt-link :to="`/category/${sone}`" v-for="sone in form.categories" :key="sone">
                {{sone}}
                <span v-if="sone != form.categories[form.categories.length-1]">,</span>
              </nuxt-link>
            </a-col>
          </a-row>
          <a-row class="align_margin">
            <a-col span="6">
              <label for>Type:</label>
            </a-col>
            <a-col span="18">{{form.type || '-'}}</a-col>
          </a-row>
          <a-row class="align_margin">
            <a-col span="6">
              <label for>Author:</label>
            </a-col>
            <a-col span="18">{{form.author || '-'}}</a-col>
          </a-row>
          <a-row class="align_margin">
            <a-col span="6">
              <label for>Artist:</label>
            </a-col>
            <a-col span="18">{{form.artist || '-'}}</a-col>
          </a-row>
          <a-row class="align_margin">
            <a-col span="6">
              <label for>Total Views:</label>
            </a-col>
            <a-col span="18">{{form.views}}</a-col>
          </a-row>
          <a-row class="align_margin">
            <a-button type="primary" @click="addToFavo(form.id)">
              <a-icon type="heart"/>Add to favorites
            </a-button>
          </a-row>
        </a-col>
      </a-row>
      <a-row>
        <div class="brief">{{form.brief}}</div>
      </a-row>
      <a-row>
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="CHAPTER LIST" key="1">
            <div v-if="form.chapters && form.chapters.length">
              <div v-for="one in form.chapters" :key="one">
                <nuxt-link :to="`/${form.url_name}/${one}/1`">{{form.name}}-{{one}}</nuxt-link>
              </div>
            </div>
            <div v-else>Cartoon to be updated</div>
          </a-tab-pane>
        </a-tabs>
      </a-row>
    </div>
    <div class="mb m_cartoon_detail">
      <a-tabs defaultActiveKey="2">
        <a-tab-pane :tab="form.name" key="2">
          <div>
            <img :src="'/images/'+form.cover" style="width: 100%">
          </div>
          <a-row style="font-size: 14px">
            <a-col :span="24">
<!--              <div class="title">{{form.name}}</div>-->
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Alternative Name:</label>
                </a-col>
                <a-col span="18">{{form.alternative_name || '-'}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Status:</label>
                </a-col>
                <a-col span="18">{{form.status? 'Completed' : 'Ongoing'}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Categories:</label>
                </a-col>
                <a-col span="18">
                  <nuxt-link :to="`/category/${sone}`" v-for="sone in form.categories" :key="sone">
                    {{sone}}
                    <span v-if="sone != form.categories[form.categories.length-1]">,</span>
                  </nuxt-link>
                </a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Type:</label>
                </a-col>
                <a-col span="18">{{form.type}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Author:</label>
                </a-col>
                <a-col span="18">{{form.author}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Artist:</label>
                </a-col>
                <a-col span="18">{{form.artist}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-col span="6">
                  <label for>Total Views:</label>
                </a-col>
                <a-col span="18">{{form.views}}</a-col>
              </a-row>
              <a-row class="align_margin">
                <a-button type="primary" @click="addToFavo(form.id)" size="small">
                  <a-icon type="heart"/>Add to favorites
                </a-button>
              </a-row>
            </a-col>
          </a-row>
          <a-row>
            <div class="brief">{{form.brief}}</div>
          </a-row>
          <a-row>
            <a-tabs defaultActiveKey="1">
              <a-tab-pane tab="CHAPTER LIST" key="1">
                <div v-if="form.chapters && form.chapters.length">
                  <div v-for="one in form.chapters" :key="one">
                    <nuxt-link :to="`/${form.url_name}/${one}/1`">{{form.name}}-{{one}}</nuxt-link>
                  </div>
                </div>
                <div v-else>Loading...</div>
              </a-tab-pane>
            </a-tabs>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  async asyncData(context) {
    // const res_list = await axios.get(
    //   "https://admin.mangadrawer.com/api/favorite",
    //   {params: { page: 1, size: 100 }}
    // );
    // return { list: res_list.data.data.docs };
      const res = await axios
        .get(`https://admin.mangadrawer.com/api/manga/detail/url-name/${context.params.cartoon}`)
          return { form: res.data.data,  metaData: {title: res.data.data.name + ' manga', content: res.data.data.name + ' manga'}};
          // this.metaData.title = res.data.data.name + ' manga';
          // this.metaData.content = res.data.data.name + ' manga';
          // this.$store.commit("title/SetTitle", res.data.name + " manga");
  },
  data() {
    return {
      
    };
  },
  head () {
    return {
      title: this.metaData.title,
      meta: [
        { hid: 'detail-desc', name: 'description', content: this.metaData.content }
      ]
    }
  },
  mounted() {
  },
  methods: {
    addToFavo(id) {
      axios.post("/api/favorite", { mangaId: id }).then(res => {
        if (res) {
          this.$message.success("Add Success!");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.m_cartoon_detail {
  margin: 6vw 4vw;
  padding: 4vw;
  background: #fff;
}

.cartoon_detail {
  background: #fff;
  width: 750px;
  padding: 25px;
  margin: 0px auto 20px auto;
}

.cartoon_detail .each_res {
  /* padding: 20px 0; */
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}

.advanced_search_box .search_box label,
.cartoon_detail label {
  font-size: 12px;
  color: #99999a;
}

.search_box .row_box {
  /* margin-top: 10px; */
}

.brief {
  font-size: 13px;
  color: #50514f;
  margin-top: 10px;
  padding: 15px 10px;
  border: 1px dashed #e1e1e1;
  font-family: Lato, sans-serif;
}
</style>



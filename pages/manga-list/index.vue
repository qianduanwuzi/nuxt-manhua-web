<template>
  <div>
    <div class="pc manga_list_box">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="MANGA LIST" key="1">
          <a-row>
            <a-col v-for="one in list" :key="one.name" span="12">
              <nuxt-link :to="`/${one.url_name}`">
                <span class="circle"></span>
                {{one.name}}
                <span class="status">{{one.status? '(completed)':''}}</span>
              </nuxt-link>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="mb m_manga_list_box">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="MANGA LIST" key="1">
          <a-row>
            <a-col v-for="one in list" :key="one.name" span="24">
              <nuxt-link :to="`/${one.url_name}`">
                <span class="circle"></span>
                {{one.name}}
                <span class="status">{{one.status? '(completed)':''}}</span>
              </nuxt-link>
            </a-col>
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
    const res_list = await axios.get(
      "https://mangadrawer.com/api/manga",
      { params: { page: 1, size: 100 } }
    );
    return { list: res_list.data.data.docs };
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.commit("title/SetTitle", "Manga List");
  },
  methods: {}
};
</script>

<style scoped>
.m_manga_list_box {
  margin: 6vw 4vw;
  padding: 4vw;
  background: #fff;
}

.manga_list_box {
  width: 800px;
  padding: 25px;
  background: #fff;
  font-size: 12px;
}

.manga_list_box .status,
.m_manga_list_box .status {
  color: #af5050;
}

.manga_list_box .circle,
.m_manga_list_box .circle {
  width: 10px;
  height: 10px;
  border: 1px solid #d7d7d7;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
</style>



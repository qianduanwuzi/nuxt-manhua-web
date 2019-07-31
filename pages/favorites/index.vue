<template>
  <div>
    <div class="favorite_box pc">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="FAVORITES" key="1">
          <div v-if="list.length">
            <a-row v-for="one in list" :key="one.name">
              <a-col span="4">
                <nuxt-link :to="`/${one.name}`">
                  <img :src="`/images/${one.cover}`" alt class="img">
                </nuxt-link>
              </a-col>
              <a-col span="20">
                <div>
                  <nuxt-link :to="`/${one.name}`">{{one.name}}</nuxt-link>
                </div>
                <div class="brief" :title="one.brief">{{one.brief}}</div>
                <a-button
                  type="primary"
                  size="small"
                  style="width: 100%; margin-top: 3px"
                  @click="deleteFav(one.favorite_id)"
                  :loading="loading"
                >
                  <a-icon type="delete" v-show="!loading"/>Delete
                </a-button>
              </a-col>
            </a-row>
          </div>
          <div v-else>There is no manga here.</div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="mb m_favorite_box">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="FAVORITES" key="1">
          <div v-if="list.length">
            <a-row v-for="one in list" :key="one.name">
              <a-col span="4">
                <nuxt-link :to="`/${one.name}`">
                  <img :src="`/images/${one.cover}`" alt class="img">
                </nuxt-link>
              </a-col>
              <a-col span="20">
                <div>
                  <nuxt-link :to="`/${one.name}`">{{one.name}}</nuxt-link>
                </div>
                <div class="brief" :title="one.brief">{{one.brief || 'no brief'}}</div>
                <a-button
                  type="primary"
                  size="small"
                  style="width: 100%; margin-top: 3px"
                  @click="deleteFav(one.favorite_id)"
                  :loading="loading"
                >
                  <a-icon type="delete" v-show="!loading"/>Delete
                </a-button>
              </a-col>
            </a-row>
          </div>
          <div v-else>There is no manga here.</div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false
    };
  },
  mounted() {
    this.getFa();
  },
  methods: {
    getFa() {
      this.$api.get("/favorite", { page: 1, size: 100 }).then(res => {
        if (res) {
          this.list = res.data.docs;
        }
      });
    },
    deleteFav(id) {
      this.loading = true;
      this.$api.delete(`/favorite/${id}`).then(res => {
        if (res) {
          this.loading = false;
          this.$message.success("Delete Success!");
          this.getFa();
        }
      });
    }
  }
};
</script>

<style scoped>
.m_favorite_box {
  margin: 6vw 4vw;
  padding: 4vw;
  background: #fff;
}

.favorite_box {
  width: 750px;
  padding: 25px;
  background: #fff;
}

.favorite_box img {
  width: 60px;
  height: 70px;
  margin: 0 auto;
  display: block;
}

.m_favorite_box img {
  width: 90%;
  margin: 0 auto;
  display: block;
}

.favorite_box .brief,
.m_favorite_box .brief {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>



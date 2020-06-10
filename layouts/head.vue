<template>
  <div>
    <div class="layout_head_box pc">
      <img src="../assets/img/pc_logo.png" alt="pc_logo" style="height:60px;width: 200px;margin-top: 10px" @click="$router.push('/')">
      <div class="layout_head_nav_box">
        <span
          v-for="one in cates"
          :key="one.name"
          :class="['each_nav', one.url == $route.path ? 'active_nav' : '']"
        >
          <nuxt-link :to="one.url" :class="{active_nav: one.url == $route.path}">{{one.name}}</nuxt-link>
        </span>
      </div>
      <div class="right_search_box">
        <a-select
          mode="multiple"
          labelInValue
          :value="value"
          placeholder="Search Manga"
          style="width: 300px"
          :filterOption="false"
          @search="fetchUser"
          @change="handleChange"
          :notFoundContent="fetching ? undefined : null"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
          <a-select-option v-for="d in data" :key="d.name" :value="d.url_name">
            <nuxt-link :to="`/${d.url_name}`" class="filter_cartoon flex-align">
              <img :src="'/images/'+d.cover" alt class="car_img">
              <span class="name" :title="d.name">{{d.name}}</span>
            </nuxt-link>
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="mb m_header_box">
      <div
        class="flex-align m_ope_head_box"
        style="justify-content: space-between;"
        v-if="!showMSearch"
      >
        <div class="m_nav" @click="showNav = true">
          <a-icon type="menu-unfold"/>
        </div>
        <div class="m_logo">
          <img src="../assets/img/mb_logo.png" alt="" @click="$router.push('/')">
        </div>
        <div class="m_search" @click="showMSearch = true">
          <a-icon type="search"/>
        </div>
      </div>
      <div v-else class="m_select">
        <a-icon type="close-circle" class="close_circle" @click="showMSearch =false"/>
        <a-select
          mode="multiple"
          labelInValue
          :value="value"
          placeholder="Search Manga"
          style="width: 100%"
          :filterOption="false"
          @search="fetchUser"
          @change="handleChange"
          :notFoundContent="fetching ? undefined : null"
          @blur="showMSearch = false"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
          <a-select-option v-for="d in data" :key="d.name" :value="d.url_name">
            <nuxt-link :to="`/${d.url_name}`" class="m_filter_cartoon flex-align">
              <img :src="'/images/'+d.cover" alt class="m_car_img" style="width: 8vw;height: 10vw">
              <span class="name" :title="d.name" style="margin-left: 5px;width: 85%; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{d.name}}</span>
            </nuxt-link>
          </a-select-option>
        </a-select>
      </div>
      <div :class="['m_nav_list', showNav? 'm_nav_animate':'']" v-show="showNav">
        <div @click="showNav = false" class="theme-color close_nav">CLOSE NAV</div>
        <div class="m_nav_box">
          <div v-for="one in cates" :key="one.name" :class="['m_each_nav']">
            <div
              @click="go(one.url)"
              :class="{'m_nav_color': true,'m_nav_active_color': one.url == $route.path}"
            >{{one.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cates from "./cate";
import debounce from "lodash/debounce";
import axios from "axios";
export default {
  props: {
    showsus: {
      default: false,
      type: Boolean
    }
  },
  data() {
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
    return {
      cates,
      showChild: false,
      data: [],
      value: [],
      fetching: false,
      showNav: false,
      showMSearch: false
    };
  },
  mounted() {
    console.log(this.$route)
  },
  methods: {
    go(d) {
      this.showNav = false;
      this.$router.push(d)
    },
    onSearch(v) {},
    fetchUser(value) {
      this.lastFetchId += 1;
      const fetchId = this.lastFetchId;
      this.data = [];
      this.fetching = true;
      axios.get("/api/search", {params: { page: 1, size: 100, keyword: value }}).then(res => {
        this.data = res.data.data.docs;
        this.fetching = false;
      });
      // fetch('https://randomuser.me/api/?results=5')
      //   .then(response => response.json())
      //   .then((body) => {
      //     if (fetchId !== this.lastFetchId) { // for fetch callback order
      //       return;
      //     }
      //     const data = body.results.map(user => ({
      //       text: `${user.name.first} ${user.name.last}`,
      //       value: user.login.username,
      //     }));
      //     this.data = data
      //     this.fetching = false
      //   });
    },
    handleChange(value) {
      this.fetching = false
      this.value = []
      this.data = []
      this.$router.push({ name: 'cartoon', params: { cartoon: value[0].key} })
      // Object.assign(this, {
      //   value,
      //   data: [],
      //   fetching: false
      // });
    }
  }
};
</script>

<style  lang="scss" scoped>
.m_header_box {
  background: #fff;
  .m_select {
    position: relative;
    .close_circle{
      position: absolute;
      right: 3vw;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1000;
    }
  }
  .m_ope_head_box {
    padding: 0 4vw;
  }
  .m_nav_list {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(47, 47, 51);
    z-index: 2;
    .close_nav {
      text-align: center;
      line-height: 18vw;
    }
    .m_nav_box {
      background: #2f3034;
    }
    .m_each_nav {
      line-height: 18vw;
      padding-left: 6vw;
      text-transform: Uppercase;
      .m_nav_color {
        color: #fff;
      }
      .m_nav_active_color {
        /*color: #f5bb00;*/
        color: #3BB982;
      }
    }
  }
  .m_nav_animate {
    animation: nav_animate 0.5s linear;
    -webkit-animation: nav_animate 0.5s linear;
  }

  @keyframes nav_animate {
    from {
      left: -100%;
    }
    to {
      left: 0;
    }
  }
}

.layout_head_box {
  display: flex;
  height: 80px;
  background-color: #fff;
  position: relative;
  margin-bottom: 30px;
}

.layout_head_nav_box .each_nav {
  text-transform: uppercase;
  font-size: 14px;
  color: #50514f;
  line-height: 80px;
  padding: 0 20px;
  display: inline-block;
  font-family: 'Roboto Condensed',sans-serif;
  cursor: pointer;
}

.layout_head_nav_box .each_nav:hover a {
  /*color: #f5bb00;*/
  color: #3BB982;
}

.layout_head_nav_box .active_nav:hover a {
  color: #fff;
}

.layout_head_nav_box .active_nav {
  /*background: #f5bb00;*/
  background: #3BB982;
  color: #fff;
  font-family: 'Roboto Condensed',sans-serif;
}

.right_search_box {
  position: absolute;
  right: 20px;
  top: 20px;
}

.filter_cartoon .car_img {
  width: 20px;
  height: 40px;
  display: inline-block;
  margin-right: 10px;
}

.filter_cartoon .name {
  width: 220px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* .layout_head_box {
  width: 1368px;
  position: fixed;
  top: 0;
  z-index: 1;
  background: #fff;
}

.layout_head {
  width: 400px;
  margin: 36px auto;
  text-align: center;
}

.head_title {
  margin-top: 6px;
  margin-bottom: 0;
  color: #919191;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
}
.sus_nav_box{
    position: fixed;
    top: 0;
    height: 88px;
    z-index: 1;
    background: #fff;
}

.sus_nav {
  width: 1368px;
  text-align: center;
  color: #1a1919;
  font-size: 17px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
}

.hover_nav_box {
  width: 1368px;
  padding: 0 96px;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
}

.layout_head_nav_box {
  padding: 0 96px;
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
}

.each_nav {
  padding: 20px 28px;
  display: inline-block;
} */
</style>





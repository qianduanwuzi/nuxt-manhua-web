<template>
  <div class="layout_out_container">
    <div class="layout_in_container">
      <Header></Header>
      <div :class="[isPc? 'layout_justify' : '']">
        <nuxt/>
        <!-- m login regist -->
<!--        <m-login-reg v-if="!isPc"></m-login-reg>-->
        <!--pc login regist -->
        <login-reg v-if="$route.fullPath != '/' && isPc && $route.name != 'cartoon-chapter-page'" style="margin-left: 25px;"></login-reg>
      </div>
      <Footer></Footer>
      <login-modal></login-modal>
      <move-above :show="showSus"></move-above>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./head";
import Footer from "./footer";
import LoginModal from "../components/LoginModal";
import MoveAbove from "../components/MoveAbove";
import LoginReg from "../components/LoginReg";
import MLoginReg from "../components/MLoginReg";
export default {
  components: { Header, Footer, LoginModal, MoveAbove, LoginReg, MLoginReg },
  data() {
    return {
      showSus: false,
      isPc: true,
    };
  },
  computed: {
    title() {
      return this.$store.state.title.title;
    }
  },
  mounted() {
    console.log(this.$route);
    // 监听滚动
    window.addEventListener("scroll", this.handleScroll);
    //
    if (!((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent))) {
        this.isPc = true
    }else this.isPc = false
  },
  methods: {
    handleScroll() {
      let top = document.documentElement.scrollTop;
      if (top >= 287) {
        this.showSus = true;
      } else {
        this.showSus = false;
      }
    }
  },
  watch: {
    title(v) {
      document.title = v
    }
  }
};
</script>


<style>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow-y: auto;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
body {
  font-family: "Bookman Old Style", serif;
  font-size: 16px;
  color: #424242;
  background: url(~assets/img/background.jpg) top center fixed #3c3939;
}

a {
  color: #1a1919;
  text-decoration: none !important;
}

a:hover {
  /*color: #f5bb00;*/
  color: #3BB982;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.layout_out_container {
  /* background-color: #eeeeee */
}

.layout_in_container {
  /* background: #fff; */
  margin: 0 auto;
}

.flex-align {
  display: flex;
  align-items: center;
}

.theme-color {
  /*color: #f5bb00;*/
  color: #3BB982;
}

.theme-bg-color {
  /*background: #f5bb00;*/
  background: #3BB982;
}

.align_margin {
  margin-top: 10px;
}

.layout_justify {
  display: flex;
  justify-content: center;
}

.white_bg{
  background: #fff;
}

.m_p{
  padding: 0 4vw;
}

.omit{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}

/* .pc{
  display: block !important;
} */

.mb{
    display: none !important;
  }



@media (max-width: 1200px) {
  .pc{
    display: none !important;
  }

  .mb{
    display: block !important;
  }

  body{
    font-size: 12px;
  }
}
</style>

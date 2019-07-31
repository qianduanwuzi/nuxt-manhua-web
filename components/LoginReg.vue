<template>
  <!-- login -->
  <div class="login_box">
    <a-tabs v-model="activeKey" @change="v => v == 1? showLogin = true :  showLogin = false">
      <a-tab-pane tab="LOGIN" key="1"></a-tab-pane>
      <a-tab-pane tab="SIGN UP" key="2"></a-tab-pane>
    </a-tabs>
    <div v-if="showLogin">
      <div v-show="!name">
        <div class="input">
          <a-input
            placeholder="username"
            v-model.trim="loginForm.username"
            ref="userNameInput"
            size="large"
          >
            <a-icon slot="prefix" type="user"/>
          </a-input>
        </div>
        <div class="input">
          <a-input
            placeholder="password"
            v-model.trim="loginForm.passwd"
            type="password"
            ref="passWordInput"
            size="large"
          >
            <a-icon slot="prefix" type="lock"/>
          </a-input>
        </div>
        <a-button type="primary" class="login_btn" size="large" @click="login">LOGIN</a-button>
      </div>
      <div v-show="name" class="login_success">
        <span class="user_name">{{name}}</span>
        <a-icon type="bars" @click="showBar = !showBar" style="float: right; cursor: pointer"/>
        <div v-show="showBar" class="bar_box">
          <!-- <nuxt-link to="/favorites"> -->
            <div class="bar_each_ope" @click="goFav">
              <a-icon type="heart"/>
              <span>FAVORITES</span>
            </div>
          <!-- </nuxt-link> -->
          <div class="bar_each_ope" style="border-bottom: none" @click="signOut">
            <a-icon type="logout"/>
            <span>SIGN OUT</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="input">
        <a-input placeholder="username" v-model.trim="signForm.username" size="large">
          <a-icon slot="prefix" type="user"/>
        </a-input>
      </div>
      <div class="input">
        <a-input placeholder="password" v-model.trim="signForm.passwd" type="password" size="large">
          <a-icon slot="prefix" type="lock"/>
        </a-input>
      </div>
      <div class="input">
        <a-input placeholder="email" v-model.trim="signForm.email" size="large">
          <a-icon slot="prefix" type="cloud"/>
        </a-input>
      </div>
      <div class="input">
        <a-select
          defaultValue="Male"
          style="width: 320px"
          @change="v => signForm.sex = v"
          size="large"
        >
          <a-select-option value="1">Male</a-select-option>
          <a-select-option value="0">Female</a-select-option>
        </a-select>
      </div>
      <a-button type="primary" class="login_btn" size="large" @click="signUp">SIGN UP</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: true,
      loginForm: { username: "", passwd: "" },
      signForm: { username: "", passwd: "", email: "", sex: 1 },
      activeKey: "1",
      name: "",
      showBar: false
    };
  },
  computed: {},
  mounted() {
    this.name = localStorage.getItem("name");
  },
  methods: {
    signUp() {
      this.$api.post("/register", { ...this.signForm }).then(res => {
        if (res) {
          this.activeKey = "1";
          this.showLogin = true;
          this.$message.success("sign success");
        }
      });
    },
    login() {
      this.$api.post("/login", { ...this.loginForm }).then(res => {
        if (res) {
          this.$message.success("login success");
          localStorage.setItem("token", res.data.data);
          localStorage.setItem("name", this.loginForm.username);
          this.name = this.loginForm.username;
          // this.$store.commit('token/SetToken', res.data.data)
        }
      });
    },
    signOut() {
        this.$message.success("logout success");
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        this.showLogin = true
        this.showBar = false
        this.name = ''
    },
    goFav() {
        this.showBar = false;
        this.$router.push('/favorites')
    }
  }
};
</script>

<style scoped>
.login_box .input {
  margin-bottom: 20px;
}

.login_box {
  padding: 20px;
  width: 360px;
  background: #fff;
  height: 100%;
}

.login_success {
  border-bottom: 1px solid #ebedf0;
  justify-content: space-between;
  /* line-height: 30px; */
  padding-bottom: 10px;
  position: relative;
}

.login_success .bar_box {
  position: absolute;
  z-index: 1;
  background: #fff;
  right: 0;
  top: 16px;
  border: 1px dashed #f5bb00;
  padding: 5px 20px;
  font-size: 16px;
  border-radius: 5px;
}
.bar_box .bar_each_ope {
  line-height: 26px;
  cursor: pointer;
  padding: 3px 6px;
  border-bottom: 1px dashed #f5bb00;
}

.bar_box .bar_each_ope:hover {
  background: #f5bb00;
  color: #fff;
  border-radius: 3px;
}

.bar_box .bar_each_ope span {
  margin-left: 5px;
}

.login_success .user_name {
  padding-bottom: 12px;
  border-bottom: 2px solid #f5bb00;
}
</style>



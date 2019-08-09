<template>
  <a-modal title="login" v-model="visible" @ok="handleOk">
    <!-- {{timestamp}} -->
    <div class="input">
      <a-input
        placeholder="username123"
        v-model.trim="loginForm.username"
        ref="userNameInput"
        size="large"
      >
        <a-icon slot="prefix" type="user" />
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
        <a-icon slot="prefix" type="lock" />
      </a-input>
    </div>
    <template slot="footer">
      <a-button key="back" @click="visible = false">Cancel</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
    </template>
  </a-modal>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
import axios from "axios";
export default {
  data() {
    return {
      visible: false,
      loginForm: { username: "", passwd: "" },
      loading: false
    };
  },
  //   computed: mapState(["timestamp"]),
  computed: {
    timestamp() {
      return this.$store.state.login.timestamp;
    }
  },
  methods: {
    handleOk() {
      this.loading = true;
      return;
      axios.post("/login", { ...this.loginForm }).then(res => {
        if (res) {
          this.visible = false;
          this.$message.success("login success");
          // localStorage.setItem("token", res.data.data);
          // localStorage.setItem("name", this.loginForm.username);
          Cookie.set("_to", res.data.data);
          this.$store.commit("token/SetToken", res.data.data);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        this.loading = false;
      });
    }
  },
  watch: {
    timestamp(v) {
      this.visible = true;
    }
  }
};
</script>


<style>
.input {
  margin-bottom: 20px;
}
</style>

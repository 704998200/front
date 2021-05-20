<template>
  <div :class="'fixed-center'" class="q-pa-md" style="max-width: 400px">
    <span class="KKK">项目管理追踪系统</span>
    <q-form action="" class="q-gutter-md">
      <q-input
        v-model="username"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        filled
        label="Your username *"
      />

      <q-input
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        filled
        label="Your password *"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn color="primary" label="Submit" @click="onSubmit" />
        <q-btn
          class="q-ml-sm"
          color="primary"
          flat
          label="Regist"
          @click="onRegist"
        />
      </div>
    </q-form>
  </div>
</template>

<style lang="sass">
.KKK
  position: relative
  left: 0rem
  top: -3rem
  text-align: center
  width: 150px
  height: 55px
  color: #ffffff
  background-color: #1976d2
  border-radius: 10px 10px 10px 10px
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
  font-weight: 500
  font-size: 1.5rem
  line-height: 2rem
  padding: 4px 16px
  margin: 4rem 0 1.5rem
</style>

<script>
import { ref } from "vue";
import { axios } from "../boot/axios";
import { useRouter } from "vue-router";
import store from "../store";

export default {
  data() {
    const isPwd = ref(true);
    const router = useRouter();
    return {
      username: null,
      password: null,
      isPwd,
      router,
    };
  },

  methods: {
    onSubmit() {
      let username = this.username;
      let password = this.password;
      let token = null;
      console.log(`输入信息 ${this.username} ${this.password} `);
      axios
        .post("/user/login", {
          username,
          password,
        })
        .then((successResponse) => {
          const responseResult = JSON.stringify(successResponse);
          if (responseResult.httpState === 200) {
            token = responseResult.data.token;
          }
          return axios.post("/user/login", {
            token,
          });
        })
        .then((successResponse) => {
          const responseResult = JSON.stringify(successResponse);
          if (responseResult.httpState === 200) {
            const level = responseResult.data.level;
            store.commit("set_token", { token: token, level: level });
            void router.replace({ path: "/main" });
            alert("登陆成功!");
          }
        })
        .catch((failResponse) => {
          path: "/login", alert("登录失败！");
        });
    },
    onRegist() {
      let router = this.router;
      void router.push({ path: "/regist" });
    },
  },
};
</script>

<style scoped></style>

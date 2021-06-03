<template>
  <div class="background">
  </div>
  <div :class="'fixed-center'" class="q-pa-md" style="max-width: 400px">
    <span CLASS="KKK">项目管理追踪系统注册</span>
    <q-form action="" class="q-gutter-md">
      <q-input
        v-model="username"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        filled
        label="用户名 *"
        lazy-rules
      />

      <q-input
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        filled
        label="输入密码 *"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
        v-model="repassword"
        :type="isPwd ? 'password' : 'text'"
        filled
        label="再次输入密码"
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
        <q-btn color="primary" label="提交" @click="Submit" />
        <q-btn
          class="q-ml-sm"
          color="primary"
          flat
          label="登录"
          @click="Login"
        />
      </div>
    </q-form>
  </div>
</template>

<style lang="sass">
.q-gutter-md
  background-color: #42b983
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
  z-index: 1
.background
  position: absolute
  width: 100%
  height: 100%
  z-index: -1
  background-image: url('https://common-1251511762.cos.ap-guangzhou.myqcloud.com/R18/1068697.jpg')

</style>

<script>
import { ref } from "vue";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";

export default {
  data() {
    const isPwd = ref(true);
    const router = useRouter();
    return {
      username: null,
      password: null,
      repassword: null,
      isPwd,
      router,
    };
  },
  methods: {
    Submit() {
      let username = this.username;
      let password = this.password;
      api
        .post("/user/login", {
          username,
          password,
        })
        .then((successResponse) => {
          const responseResult = JSON.stringify(successResponse.data);
          if (successResponse.data.code === 200) {
            void router.replace({ path: "/login" });
            alert("注册成功!");
          }
        })
        .catch((failResponse) => {
          path: "/user/login", alert("注册失败！");
        });
    },
    Login() {
      let router = this.router;
      void router.push({ path: "/login" });
    },
  },
};
</script>

<style scoped></style>

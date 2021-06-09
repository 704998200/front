<template>
  <div class="background"></div>
  <div
    :class="'fixed-center'"
    class="q-pa-md"
    style="
      max-width: 400px;
      background-color: #c8c8c8;
      border: 2px;
      border-radius: 25px;
    "
  >
    <span CLASS="KKK">项目管理追踪系统注册</span>
    <q-form action="" class="q-gutter-md" @submit="onSubmit">
      <q-input
        v-model="username"
        :rules="[(val) => (val && val.length > 0) || '用户名不能为空']"
        filled
        label="用户名 *"
        lazy-rules
      />

      <q-input
        v-model="email"
        type="email"
        :rules="[(val) => (val && val.length > 0) || '邮箱不能为空']"
        filled
        label="输入邮箱 *"
      >
      </q-input>

      <q-input
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        :rules="[(val) => (val && val.length > 0) || '密码不能为空']"
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
        v-model="rePassword"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          (val) => {
            if (val && val.length > 0) {
              if (val === this.password) {
                return true;
              } else {
                return '两次输入不一样';
              }
            } else {
              return '密码不能为空';
            }
          },
        ]"
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
        <q-btn color="primary" label="提交" type="submit" />
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
import { api, axios } from "../boot/axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isPwd = ref(true);
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const rePassword = ref("");
    const email = ref("");
    return {
      username,
      password,
      rePassword,
      isPwd,
      router,
      email,
    };
  },
  methods: {
    onSubmit() {
      let username = this.username;
      let password = this.password;
      let email = this.email;
      axios
        .post("/api/v1/user/register", {
          username: username,
          password: password,
          email: email,
        })
        .then((successResponse) => {
          this.router.push({
            path: "/login",
          });
          this.$q.notify({
            message: "注册成功",
            color: "green",
            position: "center",
            timeout: "1000",
          });
        })
        .catch((failResponse) => {
          console.log(failResponse);
          this.$q.notify({
            message: "注册失败",
            color: "red",
            position: "center",
            timeout: "1000",
          });
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

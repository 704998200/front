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
      opacity: 70%;
    "
  >
    <span class="KKK">项目管理追踪系统</span>
    <q-form action="" class="q-gutter-md" @submit="onSubmit">
      <q-input
        v-model="username"
        :rules="[(val) => (val && val.length > 0) || '用户名不能为空']"
        filled
        label="用户名 *"
      />

      <q-input
        v-model="password"
        :rules="[(val) => (val && val.length > 0) || '密码不能为空']"
        :type="isPwd ? 'password' : 'text'"
        filled
        label="你的密码 *"
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
        <q-btn color="primary" label="登录" type="submit" />
        <q-btn
          class="q-ml-sm"
          color="primary"
          flat
          label="注册"
          @click="register()"
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
  position: fixed
  width: 100%
  height: 100%
  z-index: -1
  background-image: url('https://common-1251511762.cos.ap-guangzhou.myqcloud.com/R18/1068697.jpg')
</style>

<script>
import { axios } from "src/boot/axios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  setup() {
    //ref引用传递
    const username = ref("");
    const password = ref("");
    const isPwd = ref(true);
    const router = useRouter();
    const myStore = useStore();
    const $q = useQuasar();
    let tokenState = computed({
      // 相当于重写了返回值,参考 Kotlin
      set: (value) => {
        console.log("刷新 token");
        myStore.commit("token/setBearerToken", value);
      },
      get: () => myStore.state.token.bearerToken,
    });
    //获取下面的数据发布到生命周期里面
    return {
      tokenState,
      router,
      $q,
      username,
      password,
      isPwd,
    };
  },
  methods: {
    onSubmit() {
      //从页面获取数据
      let username = this.username;
      let password = this.password;
      console.log(`输入信息 ${username} ${password} `);
      //提交数据
      axios
        //跳转到登陆页面
        .post("/api/auth/login", {
          username,
          password,
        })
        .then((successResponse) => {
          // console.log(successResponse);
          // console.log(typeof successResponse.data);
          // 不要解码,因为已经解码过了
          const responseResult = successResponse.data;
          // 所以下面就已经在访问返回的 JSON 的 data.token 字段
          this.tokenState = responseResult.data.token;
          // console.log(token);
          console.log("Vuex 中的数据" + this.tokenState);
          // 跳转回到首页
          this.router.push({
            path: "/",
          });
        })
        .catch((failResponse) => {
          console.log(failResponse);
          this.$q.notify({
            message: "登陆失败",
            color: "red",
            position: "center",
            timeout: "1000",
          });
        });
    },
    register() {
      let router = this.router;
      //跳转到新页面
      router.push({ path: "/register" });
    },
  },
};
</script>

<style scoped></style>

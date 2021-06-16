<template>
  <q-layout class="bg-grey-1" view="hHh lpR fFf">
    <q-header class="bg-white text-grey-8" elevated height-hint="64">
      <div>
        <q-toolbar>
          <q-btn
            aria-label="Menu"
            class="q-mr-sm"
            dense
            flat
            icon="menu"
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
          />
          <q-toolbar-title
            v-if="$q.screen.gt.xs"
            class="row items-center no-wrap"
            shrink
            clickable="true"
            @click="router.push({ path: '/' })"
          >
            <span> 项目管理追踪系统</span>
          </q-toolbar-title>
          <q-space />
          <q-btn-group rounded style="left: 100%">
            <q-btn>
              <q-avatar size="30px">
                <img
                  :src="`https://www.gravatar.com/avatar/${emailHash}?s=128&d=mm&r=g`"
                />
              </q-avatar>
              <q-tooltip>
                <div>{{ username }}</div>
              </q-tooltip>
            </q-btn>
            <q-btn-dropdown rounded auto-close>
              <q-list>
                <q-item clickable v-close-popup @click="logout()">
                  <q-item-section>
                    <q-item-label>登出</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-btn-group>
        </q-toolbar>
      </div>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="200"
      bordered
      content-class="bg-white"
      show-if-above
    >
      <q-scroll-area class="fit">
        <q-list class="text-grey-8" padding>
          <q-item
            v-for="link in links"
            :key="link.text"
            v-ripple
            clickable
            :to="link.target"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="js">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { axios } from "boot/axios";

const md5 = require("js-md5");
export default {
  name: "ProjectLayout",
  methods: {
    debugAvatar() {
      // console.log(emailHash);
      // console.log(this.emailHash);
    },
    logout() {
      this.tokenState = "";
      this.router.push({ path: "/login" });
    }
  },
  setup() {
    const myStore = useStore();
    const router = useRouter();
    // 连续定义的简化写法
    let username = ref(""),
      email = ref(""),
      emailHash = ref("empy");
    let tokenState = computed({
      // 相当于重写了返回值,参考 Kotlin
      set: (value) => {
        console.log("刷新 token");
        myStore.commit("token/setBearerToken", value);
      },
      get: () => myStore.state.token.bearerToken
    });
    onMounted(() => {
      // console.log(tokenState);
      if (tokenState.value == "") {
        // 说明还没有准备 Token,自然就是去登陆
        console.log("还没有登陆");
        router.push({ path: "/login" });
      }
      // console.log("邮件哈希:", emailHash.value);
      // 获取用户信息填充 界面
      axios.get("/api/v1/user/get").then((successResponse) => {
        // 不要解码,因为已经解码过了
        const responseResult = successResponse.data;
        // console.log(responseResult);
        // 这里需要使用 value 来访问
        username.value = responseResult.data.username;
        email.value = responseResult.data.email;
        emailHash.value = md5(email.value);
        // console.log("邮件哈希:", emailHash.value);
      });
    });
    return {
      tokenState,
      // 返回的时候不需要 value
      username,
      email,
      emailHash,
      router,
      emH2: "12",
      leftDrawerOpen: ref(true),
      links: [
        {
          icon: "web",
          text: "项目管理",
          target: "/projects"
        },
        {
          icon: "person",
          text: "问题追踪",
          target: "/issues"
        }
      ]
    };
  }
};
</script>

<style lang="sass"></style>

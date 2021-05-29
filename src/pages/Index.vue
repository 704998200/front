<template>
  <q-layout class="bg-grey-1" view="hHh lpR fFf">
    <q-header class="bg-white text-grey-8" elevated height-hint="64">
      <q-toolbar class="">
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
        >
          <span>项目管理追踪系统</span>
          <!--          <span>{{ tokenState }}</span>-->
        </q-toolbar-title>
        <q-space />
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn flat round>
            <q-avatar :class="'float-right'" size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
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

<script lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  // name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
      links: [
        {
          icon: "web",
          text: "项目管理",
          target: "/projects",
        },
        {
          icon: "person",
          text: "问题追踪",
          target: "/issues",
        },
      ],
    };
  },
  methods: {},
  setup() {
    const myStore = useStore();
    const router = useRouter();
    const route = useRoute();
    let tokenState = computed({
      // 相当于重写了返回值,参考 Kotlin
      set: (value) => {
        console.log("刷新 token");
        myStore.commit("token/setBearerToken", value);
      },
      get: () => myStore.state.token.bearerToken,
    });
    onMounted(() => {
      console.log(tokenState);
      if (tokenState.value == "") {
        // 说明还没有准备 Token,自然就是去登陆
        console.log("还没有登陆");
        router.push({ path: "/login" });
      }
    });
    return {
      tokenState,
    };
  },
};
</script>

<style lang="sass"></style>

<template>
  <div class="q-pa-md">
    <q-btn @click="onNewpj" color="primary" label="NEW" />
  </div>
  <!--  <div v-model="newp"> <newproject></newproject> </div>-->
  <q-space />

  <q-separator></q-separator>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered separator class="rounded-borders" style="max-width: 100%">
      <q-item v-for="link in links1" :key="link.text">
        <q-item-section avatar>
          <q-avatar icon="folder" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section @click="onMange" v-ripple clickable>
          <q-item-label>{{ link.text }}</q-item-label>
          <q-item-label caption>{{ link.createtime }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" color="" />
        </q-item-section>
        <q-btn color="primary" label="Delte" />
        <q-separator></q-separator>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref } from "vue";

import newproject from "./newproject";

export default {
  data() {
    return {
      newp: ref(false),
      leftDrawerOpen: false,
      search: "",
      links1: [
        { text: "Home" },
        { text: "Trending" },
        { text: "Subscriptions" },
      ],
    };
  },
  components() {
    "newproject";
  },
  methods: {
    onNewpj() {
      let newp = this.newp;
      newp = true;
    },
    onMange() {},
  },
};
</script>

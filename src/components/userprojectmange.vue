<template>
 <Newproject></Newproject>
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

import Newproject from "./newproject";

export default {
  data() {
    return {
      newp: ref(false),
      leftDrawerOpen: false,
      search: "",
      links1: [
        {text: "Home"},
        {text: "Trending"},
        {text: "Subscriptions"},
      ],
    };
  },
  components: {
    "Newproject": Newproject,
  },
  methods: {

    onMange() {
    },
  },
};
</script>

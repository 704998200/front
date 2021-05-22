<template>
  <div>
    <q-toggle v-model="drawerState" />
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
// import { storeKey } from "src/store";

export default {
  setup() {
    const $store = useStore();
    console.log($store);
    const drawerState = computed({
      get: () => $store,
      set: (val) => {
        $store.commit("token/setBearerToken", val);
      },
    });
    return {
      drawerState,
    };
  },
};
</script>

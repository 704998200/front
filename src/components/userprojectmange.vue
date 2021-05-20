<template>
  <!--  <Newproject></Newproject>-->
  <q-btn color="primary" label="NEW" @click="showdialog" />
  <q-space />

  <q-separator></q-separator>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered class="rounded-borders" separator style="max-width: 100%">
      <q-item v-for="link in links1" :key="link.text">
        <q-item-section avatar>
          <q-avatar color="primary" icon="folder" text-color="white" />
        </q-item-section>

        <q-item-section v-ripple clickable @click="onMange">
          <q-item-label>{{ link.text }}</q-item-label>
          <q-item-label caption>{{ link.createtime }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon color="" name="info" />
        </q-item-section>
        <q-btn color="primary" label="Delte" />
        <q-separator></q-separator>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import newprojectA from "./newprojectA";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();

    function showdialog() {
      $q.dialog({
        component: newprojectA,
        componentProps: {},
      })
        .onOk(() => {
          console.log("OK");
        })
        .onCancel(() => {
          console.log("Cancel");
        })
        .onDismiss(() => {
          console.log("Called on OK or Cancel");
        });
    }

    return { showdialog };
  },
  // data() {
  //   return {
  //     newp: ref(false),
  //     leftDrawerOpen: false,
  //     search: "",
  //     links1: [
  //       {text: "Home"},
  //       {text: "Trending"},
  //       {text: "Subscriptions"},
  //     ],
  //   };
  // },
  // components: {
  //   "Newproject": Newproject,
  // },
  // methods: {
  //   onMange() {
  //   },
  // },
};
</script>

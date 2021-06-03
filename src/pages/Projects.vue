<template>
  <q-btn class="" color="primary" label="新建" @click="newp = true" />
  <q-dialog v-model="newp">
    <q-card>
      <q-card-section>
        <div class="text-h6">创建新项目</div>
      </q-card-section>
      <q-form>
        <q-input v-model="projectName" label="任务内容 *" outlined />
        <q-input v-model="projectShortId" label="短ID *" outlined />
        <q-input v-model="projectDescription" label="任务介绍 *" outlined />
        <div>
          <q-btn color="primary" label="Submit" type="submit" />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
  <q-dialog v-model="mangep">
    <q-card>
      <q-card-section>
        <div class="text-h6">创建新任务</div>
      </q-card-section>
      <q-form>
        <div class=submit-btn>
          <q-btn color="primary" label="提交" type="submit" />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
  <div class="q-pa-md q-gutter-md">
    <q-list bordered class="rounded-borders" separator style="max-width: 100%">
      <q-item v-for="link in links1" :key="link.text">
        <q-item-section avatar>
          <q-avatar color="primary" icon="folder" text-color="white" />
        </q-item-section>

        <q-item-section v-ripple clickable @click="mangep = true">
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
import { ref } from "vue";

export default {
  setup() {
    let projectName = ref("");
    let projectShortId = ref("");
    let projectDescription = ref("");
    return {
      newp: ref(false),
      mangep: ref(false),
      leftDrawerOpen: false,
      search: "",
      projectName,
      projectShortId,
      projectDescription,
      links1: [
        { text: "Home" },
        { text: "Trending" },
        { text: "Subscriptions" },
      ],
    };
  },

  methods: {},
};
</script>

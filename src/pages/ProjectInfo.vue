<template>
  <q-dialog v-model="editp">
    <q-card style="width: 600px; height: 800px">
      <q-card-section>
        <div class="text-h6 text-center">修改项目</div>
      </q-card-section>
      <q-form>
        <q-input
          color="blue-11"
          square
          filled
          v-model="editProject.projectShortId"
          label="短ID *"
          style="margin-top: 10px"
        />
        <q-input
          color="blue-11"
          square
          filled
          v-model="editProject.projectName"
          label="项目名称 *"
          style="margin-top: 20px"
        />
        <q-input
          type="date"
          color="blue-11"
          square
          filled
          v-model="editProject.projectScheduledStartDate"
          hint="计划开始 *"
          style="margin-top: 20px"
        />
        <q-input
          type="date"
          color="blue-11"
          square
          filled
          v-model="editProject.projectScheduledFinishDate"
          hint="计划完成 *"
          style="margin-top: 20px"
        />
        <q-input
          type="textarea"
          color="blue-11"
          square
          filled
          v-model="editProject.projectDescription"
          label="任务介绍 *"
          style="margin-top: 20px"
        />
        <div>
          <q-btn
            style="margin-left: 44%; margin-top: 30px"
            text-color="black"
            label="提交"
            @click="editThisProject()"
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>

  <div class="q-pa-md" style="width: 100%">
    <div>
      <q-card class="my-card" style="margin-left: 1%; width: 98%">
        <q-parallax
          :speed="1"
          src="https://cdn.quasar.dev/img/parallax1.jpg"
          :height="250"
        >
        </q-parallax>
        <q-card-section>
          <span
            style="
              display: -moz-inline-box;
              display: inline-block;
              width: 1500px;
            "
            class="text-h4 text-black"
          >{{ cur.projectName }}</span
          >
          <q-btn
            size="15px"
            label="修改"
            @click="editp = true"
            class="bg-secondary text-white"
          />
        </q-card-section>
        <q-separator/>

        <q-card-section>
          <span
            style="
              display: -moz-inline-box;
              display: inline-block;
              width: 800px;
            "
            class="text-body1 text-black"
          >
            创建人:{{ cur.projectCreator }}
          </span>

          <span class="text-body1 text-black">
            短ID:{{ cur.projectShortId }}
          </span>
        </q-card-section>
        <q-card-section>
          <span
            style="
              display: -moz-inline-box;
              display: inline-block;
              width: 800px;
            "
            class="text-body1 text-black"
          >
            创建时间:{{ cur.projectCreatTime }}
          </span>

          <span class="text-body1 text-black">
            更新时间:{{ cur.projectUpdateTime }}
          </span>
        </q-card-section>
        <q-card-section>
          <span
            style="
              display: -moz-inline-box;
              display: inline-block;
              width: 800px;
            "
            class="text-body1 text-black"
          >
            预计开始时间:{{ cur.projectScheduledStartDate }}
          </span>

          <span class="text-body1 text-black">
            预计结束时间:{{ cur.projectScheduledFinishDate }}
          </span>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <span
            style="
              display: -moz-inline-box;
              display: inline-block;
              word-break: break-word;

            "
            class="text-body1 text-black"
          >
            任务内容:
            {{ cur.projectDescription }}
          </span>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {axios} from "../boot/axios";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";

function formatTime(timestamp) {
  if (timestamp) {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    if (month.toString().length < 2) {
      month = '0' + month;

    }
    if (day.toString().length < 2) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  } else {
    return '未定义';
  }
}

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    let editProject = ref({
        projectName: "",
        projectShortId: "",
        projectId: 0,
        projectDescription: "",
        projectScheduledStartDate: Date(),
        projectScheduledFinishDate: Date(),
      }
    )
    let cur = ref({
        projectName: "",
        projectShortId: "",
        projectId: 0,
        projectDescription: "",
        projectScheduledStartDate: Date(),
        projectScheduledFinishDate: Date(),
        projectCreator: "",
        projectCreatTime: Date(),
        projectUpdateTime: Date()
      }
    );
    onMounted(() => {
      axios
        .get("/api/v1/project/" + route.params.projectId + "/get")
        .then((successResponse) => {
          const responseResult = successResponse.data.data;
          console.log(responseResult);
          cur.value.projectShortId = responseResult.projectShortId;
          editProject.value.projectShortId = cur.value.projectId = responseResult.projectId;
          cur.value.projectDescription = responseResult.projectDescription;
          editProject.value.projectScheduledStartDate = cur.value.projectScheduledStartDate = formatTime(responseResult.startTime);
          editProject.value.projectScheduledFinishDate = cur.value.projectScheduledFinishDate = formatTime(responseResult.finishTime);
          cur.value.projectCreator = responseResult.postedBy.username;
          cur.value.projectCreatTime = formatTime(responseResult.createdTime);
          cur.value.projectUpdateTime = formatTime(responseResult.updatedTime);
          editProject.value.projectName = cur.value.projectName = responseResult.projectName;
          editProject.value.projectDescription = cur.value.projectDescription = responseResult.projectDescription;
          editProject.value.projectId = cur.value.projectId = responseResult.projectId;
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
    });
    return {
      editp: ref(false),
      cur,
      editProject,
      router,
      route,
    };
  },
  methods: {
    editThisProject() {
      //TODO
    },

  },
};
</script>
<style></style>

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
          v-model="projectShortId"
          label="短ID *"
          style="margin-top: 10px"
        />
        <q-input
          color="blue-11"
          square
          filled
          v-model="projectName"
          label="项目名称 *"
          style="margin-top: 20px"
        />
        <q-input
          type="date"
          color="blue-11"
          square
          filled
          v-model="projectScheduledStartDate"
          hint="计划开始 *"
          style="margin-top: 20px"
        />
        <q-input
          type="date"
          color="blue-11"
          square
          filled
          v-model="projectScheduledFinishDate"
          hint="计划完成 *"
          style="margin-top: 20px"
        />
        <q-input
          type="textarea"
          color="blue-11"
          square
          filled
          v-model="projectDescription"
          label="任务介绍 *"
          style="margin-top: 20px"
        />
        <div>
          <q-btn
            style="margin-left: 44%; margin-top: 30px"
            text-color="black"
            label="提交"
            @click="editProject()"
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>


  <div class="q-pa-md" style="width:100%">
    <div>
      <q-card class="my-card" style="margin-left: 1%; width: 98%">
        <q-parallax
          :speed="1"
          src="https://cdn.quasar.dev/img/parallax1.jpg"
          :height="250"
        >
        </q-parallax>
        <q-card-section>
          <span style="display:-moz-inline-box; display:inline-block; width:1500px;"
                class="text-h4 text-black">{{ curProjectName }}</span>
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
            style="display:-moz-inline-box; display:inline-block; width:800px;"
            class="text-body1 text-black"
          > 创建人:{{ curProjectCreator }}
          </span>

          <span
            class="text-body1 text-black"
          > 短ID:{{ curProjectShortId }}
          </span>
        </q-card-section>
        <q-card-section>

          <span
            style="display:-moz-inline-box; display:inline-block; width:800px;"
            class="text-body1 text-black"
          > 创建时间:{{ curProjectCreatTime }}
          </span>

          <span

            class="text-body1 text-black"
          > 更新时间:{{ curProjectUpdateTime }}
          </span>
        </q-card-section>
        <q-card-section>
          <span
            style="display:-moz-inline-box; display:inline-block; width:800px;"
            class="text-body1 text-black"
          > 预计开始时间:{{ curProjectScheduledStartDate }}
          </span>

          <span

            class="text-body1 text-black"
          > 预计结束时间:{{ curProjectScheduledFinishDate }}
          </span>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <span
            style="display:-moz-inline-box; display:inline-block; width:800px;"
            class="text-body1 text-black"
          > 任务内容:{{ curProjectDescription }}
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

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    let projectName = ref("");
    let projectScheduledStartDate = ref("");
    let projectScheduledFinishDate = ref("");
    let projectShortId = ref("");
    let projectDescription = ref("");
    let curProjectId = ref("");
    let curProjectName = ref("");
    let curProjectShortId = ref("");
    let curProjectDescription = ref("");
    let curProjectCreator = ref("");
    let curProjectCreatTime = ref("");
    let curProjectUpdateTime = ref("");
    let curProjectScheduledStartDate = ref("");
    let curProjectScheduledFinishDate = ref("");
    onMounted(() => {
        axios
          .get("/api/v1/project/" + route.query.id + "/get")
          .then((successResponse) => {
            const responseResult = successResponse.data.data;
            console.log(responseResult);
            curProjectShortId.value = responseResult.projectShortId;
            projectShortId.value = curProjectId.value = responseResult.projectId;
            curProjectDescription.value = responseResult.projectDescription;
            projectScheduledStartDate.value = curProjectScheduledStartDate.value = responseResult.startTime;
            curProjectScheduledFinishDate.value = responseResult.endedTime;
            curProjectCreator.value = responseResult.postedBy.username;
            curProjectCreatTime.value = responseResult.createdTime;
            curProjectUpdateTime.value = responseResult.updatedTime;
            projectName.value = curProjectName.value = responseResult.projectName;
            projectDescription.value = curProjectDescription.value = responseResult.projectDescription;
          })
          .catch((failResponse) => {
            console.log(failResponse);
          });
      }
    )
    return {
      editp: ref(false),
      curProjectId,
      curProjectCreatTime,
      curProjectUpdateTime,
      curProjectName,
      curProjectCreator,
      curProjectScheduledStartDate,
      curProjectScheduledFinishDate,
      curProjectShortId,
      curProjectDescription,
      projectName,
      projectScheduledStartDate,
      projectScheduledFinishDate,
      projectShortId,
      projectDescription,
      router,
      route
    };
  },
  methods: {
    editProject() {
      //TODO

    },

  },
};
</script>
<style></style>

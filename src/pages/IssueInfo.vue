<template>
  <q-dialog v-model="editi">
    <q-card style="width: 600px; height: 800px">
      <q-card-section>
        <div class="text-h6 text-center">修改项目</div>
      </q-card-section>
      <q-form>
        <q-input
          color="blue-11"
          square
          filled
          v-model="editIssue.issueName"
          label="问题名称 *"
          style="margin-top: 20px"
        />
        <div>状态:</div>
        <div class="q-gutter-sm">
          <q-radio v-model="editIssue.status" val="open" label="open"/>
          <q-radio v-model="editIssue.status" val="close" label="close"/>
        </div>
        <q-input
          type="textarea"
          color="blue-11"
          square
          filled
          v-model="editIssue.issueDescription"
          label="问题详情 *"
          style="margin-top: 20px"
        />
        <div>
          <q-btn
            style="margin-left: 44%; margin-top: 30px"
            text-color="black"
            label="提交"
            @click="editThisIssue()"
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
          >{{ }}</span
          >
          <q-btn
            size="15px"
            label="修改"
            @click="editi = true"
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
           上传人:{{  }}
          </span>

          <span class="text-body1 text-black">
            状态:{{}}
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
            创建时间:{{  }}
          </span>

          <span class="text-body1 text-black">
            更新时间:{{ }}
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
            {{ }}
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

    let editIssue = ref({
        issueName: "",
        issueDescription: "",
        issueCreateDate: Date(),
        issueUpdateDate: Date(),
      }
    )
    // let cur = ref({
    //     projectName: "",
    //     projectShortId: "",
    //     projectId: 0,
    //     projectDescription: "",
    //     projectScheduledStartDate: Date(),
    //     projectScheduledFinishDate: Date(),
    //     projectCreator: "",
    //     projectCreatTime: Date(),
    //     projectUpdateTime: Date()
    //   }
    // );
    // onMounted(() => {
    //   axios
    //     .get("/api/v1/project/" + route.params.projectId + "/get")
    //     .then((successResponse) => {
    //       const responseResult = successResponse.data.data;
    //       console.log(responseResult);
    //       cur.value.projectShortId = responseResult.projectShortId;
    //       editIssue.value.projectShortId = cur.value.projectId = responseResult.projectId;
    //       cur.value.projectDescription = responseResult.projectDescription;
    //       editIssue.value.projectScheduledStartDate = cur.value.projectScheduledStartDate = formatTime(responseResult.startTime);
    //       editIssue.value.projectScheduledFinishDate = cur.value.projectScheduledFinishDate = formatTime(responseResult.finishTime);
    //       cur.value.projectCreator = responseResult.postedBy.username;
    //       cur.value.projectCreatTime = formatTime(responseResult.createdTime);
    //       cur.value.projectUpdateTime = formatTime(responseResult.updatedTime);
    //       editIssue.value.projectName = cur.value.projectName = responseResult.projectName;
    //       editIssue.value.projectDescription = cur.value.projectDescription = responseResult.projectDescription;
    //       editIssue.value.projectId = cur.value.projectId = responseResult.projectId;
    //     })
    //     .catch((failResponse) => {
    //       console.log(failResponse);
    //     });
    // });
    return {
      shape: ref(''),
      editi: ref(false),
      // cur,
      editIssue,
      router,
      route,
    };
  },
  methods: {
    editThisIssue() {
      //TODO
    },

  },
};
</script>
<style></style>

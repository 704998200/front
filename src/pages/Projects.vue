<template>
  <q-dialog v-model="newProjectBtn">
    <q-card style="width: 600px; height: 800px">
      <q-card-section>
        <div class="text-h6 text-center">创建新项目</div>
      </q-card-section>
      <q-form>
        <q-input
          color="blue-11"
          square
          filled
          v-model="newProjectInfo.projectShortId"
          label="短ID *"
          style="margin-top: 10px"
        />
        <q-input
          color="blue-11"
          square
          filled
          v-model="newProjectInfo.projectName"
          label="项目名称 *"
          style="margin-top: 20px"
        />
        <q-input
          type="date"
          color="blue-11"
          square
          filled
          v-model="newProjectInfo.projectScheduledStartDate"
          hint="计划开始 *"
          style="margin-top: 20px"
        />
        <q-input
          type="date"
          color="blue-11"
          square
          filled
          v-model="newProjectInfo.projectScheduledFinishDate"
          hint="计划完成 *"
          style="margin-top: 20px"
        />
        <q-input
          type="textarea"
          color="blue-11"
          square
          filled
          v-model="newProjectInfo.projectDescription"
          label="任务介绍 *"
          style="margin-top: 20px"
        />
        <div>
          <q-btn
            style="margin-left: 44%; margin-top: 30px"
            text-color="black"
            label="提交"
            @click="postNewProject()"
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>

  <div class="q-pa-md q-gutter-md">
    <div class="row justify-between"></div>
    <q-table :rows="projectRows" :columns="projectColumns" row-key="name">
      <template v-slot:top="props">
        <div class="col-2 q-table__title">项目</div>
        <q-btn
          size="20px"
          style="margin-left: 75%"
          label="新建"
          @click="newProjectBtn = true"
          class="bg-secondary text-white"
        />
      </template>

      <template v-slot:body-cell-projectInfo="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="openProject(props)"
            icon="arrow_forward"
          ></q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="deleteProject(props)"
            icon="delete"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
  <div>
    <!--    <q-card class="my-card" style="margin-left: 1%; width: 98%">-->
    <!--      <q-parallax-->
    <!--        :speed="1"-->
    <!--        src="https://cdn.quasar.dev/img/parallax1.jpg"-->
    <!--        :height="250"-->
    <!--      >-->
    <!--      </q-parallax>-->
    <!--      <q-card-section>-->
    <!--        <div class="text-h4 text-black">{{ curProjectName }}</div>-->
    <!--      </q-card-section>-->
    <!--      <q-separator />-->
    <!--      <q-card-actions>-->
    <!--        <div-->
    <!--          style="width: 100%; word-wrap: break-word"-->
    <!--          class="text-body1 text-black"-->
    <!--        >-->
    <!--          {{ curProjectDescription }}-->
    <!--        </div>-->
    <!--      </q-card-actions>-->
    <!--    </q-card>-->
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { axios } from "../boot/axios";
import { useRouter } from "vue-router";
import moment from "moment";

const projectColumns = [
  {
    name: "id",
    required: true,
    label: "id",
    align: "center",
    field: (row) => row.projectId,
    sortable: true,
  },
  { name: "Name", align: "center", label: "项目名称", field: "projectName" },
  { name: "ShortId", align: "center", label: "短Id", field: "projectShortId" },
  {
    name: "Creator",
    align: "center",
    label: "创建人",
    field: "projectCreator",
  },
  {
    name: "ScheduledStartDate",
    align: "center",
    label: "计划开始",
    // 单行写法
    field: (row) => {
      return formatTime(row.projectScheduledStartDate);
    },
    sortable: true,
  },
  {
    name: "ScheduledFinishDate",
    align: "center",
    label: "计划完成",
    // 多行写法
    field: (row) => {
      return formatTime(row.projectScheduledStartDate);
    },
    // 或者下面着一种
    // field: function (row) {
    //   if (row.projectScheduledFinishDate) {
    //     return formatTime(row.projectScheduledFinishDate);
    //   } else {
    //     return "未定义";
    //   }
    // },
    // field: "projectScheduledFinishDate",
    sortable: true,
  },
  { name: "projectInfo", align: "center", label: "任务内容" },
  { name: "actions", align: "center", label: "操作" },
];

function formatTime(timestamp) {
  if (timestamp) {
    // console.log(moment);
    return moment(timestamp).format("YYYY-MM-DD");
  } else {
    return "未定义";
  }
}

export default {
  setup() {
    const router = useRouter();
    let projectRows = ref([]);
    let newProjectInfo = ref({
      projectName: "",
      projectShortId: "",
      projectId: 0,
      projectDescription: "",
      projectScheduledStartDate: Date(),
      projectScheduledFinishDate: Date(),
    });
    onMounted(() => {
      axios.get("/api/v1/project/getAll").then((successResponse) => {
        const responseResult = successResponse.data.data;
        console.log(responseResult);
        // 填充列
        responseResult.forEach((item) => {
          const project = {
            projectName: item.projectName,
            projectShortId: item.projectShortId,
            projectId: item.id,
            projectDescription: item.projectDescription,
            projectScheduledStartDate: item.startTime,
            projectScheduledFinishDate: item.finishTime,
            projectCreator: item.postedBy.username,
          };
          projectRows.value.push(project);
        });
        console.log(projectRows);
      });
    });
    return {
      newProjectBtn: ref(false),
      newProjectInfo,
      projectColumns,
      projectRows,
      router,
    };
  },
  methods: {
    postNewProject() {
      let postData = {
        name: this.newProjectInfo.projectName,
        shortId: this.newProjectInfo.projectShortId,
        startDate: this.newProjectInfo.projectScheduledStartDate,
        finishDate: this.newProjectInfo.projectScheduledFinishDate,
        description: this.newProjectInfo.projectDescription,
      };
      console.log(postData);
      axios
        .post("/api/v1/project/new", postData)
        .then((successResponse) => {
          // 成功以后可以关闭消息窗口的
          this.newProjectBtn = false;
          // 跳转回本页
          this.router.go(0);
        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
    },
    openProject(props) {
      let projectId = props.row.projectId;
      console.log(projectId);
      this.router.push({
        // 当你直接编码路径的时候 参数会被忽略
        path: `/projects/${projectId}/projectInfo`,
        // params: {
        //   projectId: projectId,
        // },
      });
    },
    deleteProject(props) {
      //TODO
    },
  },
};
</script>
<style></style>

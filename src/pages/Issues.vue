<template>
  <q-dialog v-model="newIssueBtn">
    <q-card style="width: 600px; height: 800px">
      <q-card-section>
        <div class="text-h6 text-center">创建问题</div>
      </q-card-section>
      <q-form>
        <q-input
          color="blue-11"
          square
          filled
          v-model="newIssue.issueName"
          label="问题名称 *"
          style="margin-top: 20px"
        />
        <q-input
          color="blue-11"
          square
          filled
          v-model="newIssue.issueName"
          label="指派人 * (不选则指派给发起人)"
          style="margin-top: 20px"
        />
        <!--        <div>状态:</div>-->
        <!--        <div class="q-gutter-sm">-->
        <!--          <q-radio v-model="newIssue.status" val="open" label="open" />-->
        <!--          <q-radio v-model="newIssue.status" val="close" label="close" />-->
        <!--        </div>-->
        <q-input
          type="textarea"
          color="blue-11"
          square
          filled
          v-model="newIssue.issueDescription"
          label="问题详情 *"
          style="margin-top: 20px"
        />
        <div>
          <q-btn
            style="margin-left: 44%; margin-top: 30px"
            text-color="black"
            label="提交"
            @click="submitIssue()"
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
  <q-layout class="bg-grey-1" view="hHh lpR fFf">
    <q-drawer :width="400" bordered content-class="bg-white" show-if-above>
      <q-scroll-area class="fit">
        <q-list class="text-grey-8" padding>
          <q-item
            v-for="project in projects"
            :key="project.projectName"
            v-ripple
            clickable
            @click="getProjectIssues(project.projectId)"
          >
            <q-item-section>
              <q-item-label>{{ project.projectName }}</q-item-label>
            </q-item-section>
            <q-btn
              dense
              round
              flat
              color="grey"
              @click="addIssue(project.projectId)"
              icon="playlist_add"
            ></q-btn>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page>
        <div class="q-pa-md" style="width: 100%; max-height: 50%">
          <q-list bordered separator>
            <q-item
              v-ripple
              clickable

              v-for="issue in issues"
            >
              <q-item-section avatar top>
                <q-avatar icon="folder" color="primary" text-color="white"/>
              </q-item-section>
              <q-item-section @click="openIssue(issue.issueId)">

                <q-item-label lines="1">{{ issue.issueTitle }}</q-item-label>
                <!--                <q-item-label caption-->
                <!--                  >更新于:{{ issue.issueUpdateTime }}-->
                <!--                </q-item-label>-->
                <!--                <q-item-label caption-->
                <!--                  >创建于:{{ issue.issueCreateTime }}-->
                <!--                </q-item-label>  -->
                <q-item-label caption
                >#{{ issue.id }} 由 {{ issue.postedBy.username }} 在
                  {{ calculateTime(issue.createdTime) }} 发起
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-chip
                  :color="issue.status === '1' ? 'green' : 'red'"
                  icon="bookmark"
                >
                  状态: {{ issue.status === "1" ? "打开" : "关闭" }}
                </q-chip>
              </q-item-section>
              <q-btn
                dense
                round
                flat
                color="grey"
                @click="deleteIssue()"
                icon="delete"
              ></q-btn>
            </q-item>
          </q-list>
        </div>


      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import { onMounted, ref } from "vue";
import { axios } from "../boot/axios";
import moment from "moment";


export default {
  name: "Issues",
  setup() {
    let projects = ref([]);
    let newIssue = ref({});
    onMounted(() => {
      axios.get("/api/v1/project/getAll").then((successResponse) => {
        const responseResult = successResponse.data.data;
        responseResult.forEach(function (item) {
          const project = {};
          project.projectName = item.projectName;
          project.projectId = item.id;
          projects.value.push(project);
        });
        // console.log(projects);
      });
    });
    return {
      newIssueBtn: ref(false),
      issues: ref([]),
      newIssue,
      projects,
      moment,
    };
  },


  methods: {
    addIssue(projectId) {
      console.log(projectId);
      this.newIssueBtn = true;

    },
    getProjectIssues(projectId) {
      axios
        .get(`/api/v1/project/${projectId}/issues`)
        .then((successResponse) => {
          const responseResult = successResponse.data.data;
          this.issues = responseResult;
          // responseResult.forEach((item) => {
          //   const issue = {};
          //   issue.issueId = item.id;
          //   issue.issueTitle = item.issueTitle;
          //   issue.issueContent = item.issueContent;
          //   issue.issueUpdateTime = item.updatedTime;
          //   issue.issueCreateTime = item.createdTime;
          //   issue.postedBy = item.postedBy.username;
          //   this.issues.push(item);
          // });
          // console.log(projects);
        });
    },
    deleteIssue() {
      //TODO
    },
    openIssue(issueId) {
      console.log(issueId);
      this.router.push({
        // 当你直接编码路径的时候 参数会被忽略
        path: `/issues/${issueId}/issueInfo`,
        // params: {
        //   projectId: projectId,
        // },
      });
    },
    submitIssue() {
      //TODO
    },
    calculateTime(timestamp) {
      moment.locale("zh-CN");
      if (timestamp) {
        return moment(timestamp).fromNow();
      } else {
        return "未知";
      }
    },
  },
};
//修改模板

</script>

<style scoped>
a {
  text-decoration: none;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ececec;
  margin: 1em 0;
  padding: 0;
}

.comments-outside {
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
}

.comments-header {
  background-color: #c8c8c8;
  padding: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: #333;
  min-height: 80px;
  font-size: 20px;
}

.comments-header .comments-stats span {
  margin-left: 10px;
}

.post-owner {
  display: flex;
  align-items: center;
}

.post-owner .avatar > img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
}

.post-owner .username {
  margin-left: 5px;
}

.post-owner .username > a {
  color: #333;
}
</style>

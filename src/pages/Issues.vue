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
        <div>状态:</div>
        <div class="q-gutter-sm">
          <q-radio v-model="newIssue.status" val="open" label="open" />
          <q-radio v-model="newIssue.status" val="close" label="close" />
        </div>
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
            @click="newIssue()"
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
              @click="newIssueBtn = true"
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
              @click="openIssue()"
              v-for="issue in issues"
            >
              <q-item-section avatar top>
                <q-avatar icon="folder" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">{{ issue.issueName }}</q-item-label>
                <q-item-label caption
                  >更新于:{{ issue.issueUpdateTime }}</q-item-label
                >
                <q-item-label caption
                  >创建于:{{ issue.issueCreateTime }}</q-item-label
                >
              </q-item-section>
              <q-item-section avatar>
                <q-chip
                  :color="issue.status === 'open' ? 'green' : 'grey'"
                  icon="bookmark"
                  >状态{{ issue.status }}
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

        <div class="comments-outside">
          <div class="comments-header">
            <div class="post-owner">
              <div class="username">
                <a href="#">@{{ creator.user }}</a>
              </div>
            </div>
          </div>
          <Comments
            :comments_wrapper_classes="['custom-scrollbar', 'comments-wrapper']"
            :comments="comments"
            :current_user="current_user"
            @submit-comment="submitComment"
          ></Comments>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Comments from "../components/Comments.vue";
import { onMounted, ref } from "vue";
import { axios } from "../boot/axios";

export default {
  name: "Issues",
  setup() {
    let projects = ref([]);
    onMounted(() => {
      axios.get("/api/v1/project/getAll").then((successResponse) => {
        const responseResult = successResponse.data.data;
        responseResult.forEach(function (item) {
          const project = {};
          project.projectName = item.projectName;
          project.projectId = item.id;
          projects.value.push(project);
        });
        console.log(projects);
      });
    });
    return {
      newIssueBtn: ref(false),
      issues: [
        {
          issueTitle: "项目管理",
          issueContent: "1321321",
          issueUpdateTime: "5464564564",
          issueCreateTime: "456456456",
          status: "open",
        },
        {
          issueTitle: "项目管理",
          issueContent: "1321321",
          issueUpdateTime: "5464564564",
          issueCreateTime: "456456456",
          status: "open",
        },
      ],
      projects,
      comments,
      creator,
      current_user,
    };
  },
  components: {
    Comments: Comments,
  },

  methods: {
    submitComment(reply) {
      this.comments.push({
        id: this.comments.length + 1,
        user: this.current_user.user,
        avatar: this.current_user.avatar,
        text: reply,
      });
    },
    getProjectIssues(projectId) {
      // console.log(projectId);
      // TODO 此时可以调用 Axios
      axios
        .get(`/api/v1/project/${projectId}/getAll`)
        .then((successResponse) => {
          const responseResult = successResponse.data.data;
          responseResult.forEach(function (item) {
            const project = {};
            project.projectName = item.projectName;
            project.projectId = item.id;
            projects.value.push(project);
          });
          console.log(projects);
        });
    },
    deleteIssue() {
      //TODO
    },
    openIssue() {
      //TODO
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
    newIssue() {
      //TODO
    },
  },
};
//修改模板
const comments = [
  {
    id: 1,
    user: "example",
    avatar: "http://via.placeholder.com/100x100/a74848",
    text: "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor ",
  },
  {
    id: 2,
    user: "example1",
    avatar: "http://via.placeholder.com/100x100/2d58a7",
    text: "lorem ipsum dolor",
  },
  {
    id: 3,
    user: "example2",
    avatar: "http://via.placeholder.com/100x100/36846e",
    text: "lorem ipsum dolor again",
  },
];
const creator = {
  avatar: "http://via.placeholder.com/100x100/a74848",
  user: "exampleCreator",
};
const current_user = {
  avatar: "http://via.placeholder.com/100x100/a74848",
  user: "exampler",
};
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

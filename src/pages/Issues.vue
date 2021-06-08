<template>
  <q-layout class="bg-grey-1" view="hHh lpR fFf">
    <q-drawer :width="400" bordered content-class="bg-white" show-if-above>
      <q-scroll-area class="fit">
        <q-list class="text-grey-8" padding>
          <q-item
            v-for="project in projects"
            :key="project.projectName"
            v-ripple
            clickable
            @click="getProjectIssues(project)"
          >
            <q-item-section>
              <q-item-label>{{ project.projectName }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page>
        <div class="q-pa-md" style="width: 100%; max-height: 50%">
          <q-list bordered separator>
            <q-item clickable v-ripple v-for="link in links">
              <q-item-section avatar top>
                <q-avatar icon="folder" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">{{ link.text }}</q-item-label>
                <q-item-label caption>{{ link.issueUpdateTime }}</q-item-label>
                <q-item-label caption>{{ link.issueCreateTime }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-chip
                  :color="link.status === 'open' ? 'green' : 'red'"
                  icon="bookmark"
                  >{{ link.status }}
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
      links: [
        {
          issueTitle: "项目管理",
          issueContent: "1321321",
          issueUpdateTime: "5464564564",
          issueCreateTime: "456456456",
          status: "open",
        },
        {
          text: "66管理",
          status: "close",
        },
        {
          text: "项目管理",
        },
        {
          text: "项目管理",
        },
        {
          text: "项目管理",
        },
        {
          text: "项目管理",
        },
        {
          text: "项目管理",
        },
        {
          text: "项目管理",
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
    getProjectIssues(project) {
      console.log(project);
      let projectId = project.projectId;
      // TODO 此时可以调用 Axios
    },
    deleteIssue() {
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

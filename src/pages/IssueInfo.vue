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
</template>

<script>
import {onMounted, ref} from "vue";
import {axios} from "../boot/axios";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import Comments from "../components/Comments.vue";



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
      comments,
      creator,
      current_user,
    };
  },
  methods: {
    editThisIssue() {
      //TODO
    },
    submitComment(reply) {
      this.comments.push({
        id: this.comments.length + 1,
        user: this.current_user.user,
        avatar: this.current_user.avatar,
        text: reply,
      });
    },

  },
  components: {
    Comments: Comments,
  },
};
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
<style></style>

<template>
  <div class="comments">
    <div :class="comments_wrapper_classes">
      <single-comment
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id"
      ></single-comment>
    </div>
    <hr />
    <div class="reply">
      <input
        type="text"
        v-model.trim="reply"
        class="reply--text"
        placeholder="Leave a comment..."
        maxlength="250"
        required
        @keyup.enter="submitComment()"
      />
      <button class="reply--button" @click.prevent="submitComment()">
        <i class="fa fa-paper-plane"></i> Send
      </button>
    </div>
  </div>
</template>

<script>
import singleComment from "./SingleComment";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "comments",
  components: {
    "single-comment": singleComment,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    return {
      reply: ref(""),
      route,
    };
  },
  methods: {
    submitComment() {
      if (this.reply == "") {
        return null;
      }
      console.log("触发于组件" + this.reply);
      this.$emit("submit-comment", this.reply);
      this.reply = "";
    },
  },
  props: ["comments", "current_user", "comments_wrapper_classes"],
};
</script>

<style scoped>
.comments {
  margin-top: 20px;
  padding: 20px;
  padding-top: 0;
}

/* Reply component */
.reply {
  display: flex;
  position: relative;
  align-items: center;
  background-color: #ebebeb;
  border-radius: 30px;
  padding: 5px 10px;
  overflow: hidden;
}

.reply .avatar {
  position: absolute;
}

.reply .avatar > img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.reply .reply--text {
  min-height: 40px;
  padding: 10px 10px 10px 55px;
  margin-right: 10px;
  border: 0;
  color: #333;
  width: 100%;
  outline: 0;
  background-color: transparent;
  box-shadow: none;
}

.reply input.reply--text:valid {
  margin-right: 71px;
}

.reply input.reply--text:valid + .reply--button {
  right: 10px;
}

.reply .reply--button {
  position: absolute;
  right: -100px;
  border: 1px solid #2a629c;
  background-color: transparent;
  color: #2a629c;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 15px;
  line-height: 1.5;
  border-radius: 30px;
  transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out,
    border-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out,
    right 0.25s ease-in-out;
  outline: 0;
}

.reply .reply--button:hover {
  color: #fff;
  background-color: #2a629c;
}

.reply .reply--button:focus,
.reply .reply--button:active {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

hr {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

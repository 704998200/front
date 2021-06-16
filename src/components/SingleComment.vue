<template>
  <div class="comment">
    <div class="text">
      <q-avatar size="30px">
        <img
          :src="`https://www.gravatar.com/avatar/${md5(
            comment.email
          )}?s=128&d=mm&r=g`"
        />
      </q-avatar>
      <a class="username" href="#">@{{ comment.user }}</a>
      <span>{{ comment.commentContent }}</span>
    </div>
  </div>
</template>

<script>
const md5 = require("js-md5");
export default {
  setup() {
    return {
      md5,
    };
  },
  name: "singleComment",
  props: ["comment"],
};
</script>

<style scoped>
/* Single-comment component */
.comment {
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  align-items: center;
  color: #333;
  background-color: #f2f2f2;
  border-radius: 30px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.comment .text {
  text-align: left;
  margin-left: 5px;
}

.comment .text span {
  margin-left: 5px;
}

.comment .text .username {
  font-weight: bold;
  color: #333;
}
</style>

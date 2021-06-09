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
</template>

<script>
export default {
  name: "NewIssuePopout",
};
</script>

<style scoped></style>

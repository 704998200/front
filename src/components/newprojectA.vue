<template>
  <q-layout class="bg-white" container view="Lhh lpR fff">
    <q-header class="bg-primary"> </q-header>
    <q-page-container>
      <q-page padding>
        <q-form class="q-gutter-md">
          <q-input
            v-model="projectname"
            hint="项目名称"
            label="项目名称 *"
            outlined
          />
          <q-select
            v-model="multiple"
            :options="options"
            label="项目人员"
            multiple
            outlined
          />

          <div>
            <q-btn color="primary" label="Submit" type="submit" />
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "newprojectA",
};
</script>

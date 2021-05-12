<template>
  <q-layout view="Lhh lpR fff" container class="bg-white">
    <q-header class="bg-primary">
    </q-header>
    <q-page-container>
      <q-page padding>
        <q-form
          class="q-gutter-md"
        >
          <q-input
            outlined
            v-model="projectname"
            label="项目名称 *"
            hint="项目名称"
          />
          <q-select outlined multiple v-model="multiple" :options="options" label="项目人员"/>

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "newprojectA"
}
</script>


<template>

  <q-dialog v-model="newp">
    <q-card style="width: 600px;height: 800px;">
      <q-card-section>
        <div class="text-h6 text-center ">创建新项目</div>
      </q-card-section>
      <q-form>
        <q-input color="blue-11" square filled v-model="projectShortId" label="短ID *" style="margin-top: 10px;"/>
        <q-input color="blue-11" square filled v-model="projectName" label="项目名称 *"
                 style="margin-top: 20px;"/>
        <q-input type="Native date" color="blue-11" square filled v-model="projectScheduledStartDate" label="计划开始 *"
                 style="margin-top: 20px;"/>
        <q-input type="Native date" color="blue-11" square filled v-model="projectScheduledFinshDate" label="计划完成 *"
                 style="margin-top: 20px;"/>
        <q-input type="textarea" color="blue-11" square filled v-model="projectDescription" label="任务介绍 *"
                 style="margin-top: 20px;"/>
        <div>
          <q-btn style=" margin-left: 44%;margin-top: 30px;"
                 text-color="black" label="提交" @click="newProject()"/>
        </div>
      </q-form>
    </q-card>
  </q-dialog>

  <div class="q-pa-md q-gutter-md">

    <div class="row justify-between"></div>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"

    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">项目</div>
        <q-btn size="20px" style="margin-left: 75%" label="新建" @click="newp = true" class="bg-secondary text-white"/>
      </template>

      <template v-slot:body-cell-任务内容="props">
        <q-td :props="props">
          <q-btn dense round flat color="grey" @click="showDescription(props)" icon="lightbulb_outline"></q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
          <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
        </q-td>
      </template>

    </q-table>
  </div>
  <div>
    <q-card class="my-card" style="margin-left: 1%; width: 98%">
      <q-parallax
        :speed="1"
        src="https://cdn.quasar.dev/img/parallax1.jpg"
        :height="250"
      >
      </q-parallax>
      <q-card-section>
        <div class="text-h4  text-black">{{ curprojectName }}</div>
      </q-card-section>
      <q-separator/>
      <q-card-actions>
        <div style="width:100%;word-wrap:break-word" class="text-body1  text-black">{{ curprojectDescription }}</div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import {axios} from "../boot/axios";

const columns = [
  {
    name: 'id',
    required: true,
    label: 'id',
    align: 'center',
    field: row => row.projectId,
    sortable: true,
  },
  {name: 'name', align: 'center', label: '项目名称', field: 'projectName'},
  {name: 'ShortId', label: '短Id', field: 'projectShortId'},
  {name: 'Creator', label: '创建人', field: 'projectCreator'},
  {name: 'ScheduledStartDate', label: '计划开始', field: 'projectScheduledStartDate', sortable: true},
  {name: 'ScheduledFinshDate', label: '计划完成', field: 'projectScheduledFinshDate', sortable: true,},
  {name: '任务内容', label: '任务内容'},
  {name: 'actions', label: ''},
];

export default {
  setup() {
    let rows = ref([])
    let projectId = ref("")
    let projectName = ref("");
    let projectShortId = ref("");
    let projectDescription = ref("");
    let projectScheduledStartDate = ref("");
    let projectScheduledFinshDate = ref("");
    let curprojectId = ref("")
    let curprojectName = ref("");
    let curprojectShortId = ref("");
    let curprojectDescription = ref("");
    let curprojectCreator = ref("");
    let curprojectScheduledStartDate = ref("");
    let curprojectScheduledFinshDate = ref("");
    onMounted(() => {
      axios.get("/api/v1/project/getAll").then((successResponse) => {
        const responseResult = successResponse.data.data;
        console.log(responseResult);
        responseResult.forEach(function (item) {
          const project = {};
          project.projectName = item.projectName;
          project.projectShortId = item.projectShortId;
          project.projectId = item.id;
          project.projectDescription = item.projectDescription;
          project.projectScheduledStartDate = item.startedTime;
          project.projectScheduledFinshDate = item.updatedTime;
          project.projectCreator = item.postedBy.username;
          rows.value.push(project);
        })
        console.log(rows);
      });
    });
    return {
      newp: ref(false),
      projectName,
      projectScheduledStartDate,
      projectScheduledFinshDate,
      projectShortId,
      projectId,
      projectDescription,
      curprojectId,
      curprojectName,
      curprojectCreator,
      curprojectScheduledStartDate,
      curprojectScheduledFinshDate,
      curprojectShortId,
      curprojectDescription,
      columns,
      rows,
    };
  },
  methods: {
    newProject() {
      let projectDescription = this.projectDescription;
      let projectShortId = this.projectShortId;
      let projectName = this.projectName;
      let projectScheduledStartDate = this.projectScheduledStartDate;
      let projectScheduledFinshDate = this.projectScheduledFinshDate;
      axios
        .post("/api/v1/project/new", {
          projectName,
          projectShortId,
          projectScheduledStartDate,
          projectScheduledFinshDate,
          projectDescription,
        })
        .then((successResponse) => {

        })
        .catch((failResponse) => {
          console.log(failResponse);
        });
    },
    editRow(props) {
      console.log(props.row);

    },
    deleteRow(props) {
      console.log(props.row)
    },
    showDescription(props) {
      this.curprojectName = props.row.projectName;
      this.curprojectDescription = props.row.projectDescription;

    }
  },

};
</script>
<style>

</style>

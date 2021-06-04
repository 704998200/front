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
        <q-input color="blue-11" square filled v-model="projectAdmin" label="负责人 *"
                 style="margin-top: 20px;"/>
        <q-input type="number" color="blue-11" square filled v-model="projectBudget" label="预算(RMB) *"
                 style="margin-top: 20px;"/>
        <q-input type="Native date" color="blue-11" square filled v-model="projectScheduledStartDate" label="计划开始 *"
                 style="margin-top: 20px;"/>
        <q-input type="Native date" color="blue-11" square filled v-model="projectScheduledFinshDate" label="计划完成 *"
                 style="margin-top: 20px;"/>
        <q-input type="textarea" color="blue-11" square filled v-model="projectDescription" label="任务介绍 *"
                 style="margin-top: 20px;"/>
        <div>
          <q-btn style=" margin-left: 44%;margin-top: 30px;"
                 color="bg-secondary" label="提交" type="submit"/>
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
          <q-btn dense round flat color="grey" @click="showDescription(props)" icon="edit"></q-btn>
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
import {ref} from 'vue'

const columns = [
  {
    name: 'id',
    required: true,
    label: 'id',
    align: 'center',
    field: row => row.projectShortId,
    sortable: true,
  },
  {name: 'iname', align: 'center', label: '项目名称', field: 'projectName'},
  {name: 'Admin', label: '负责人', field: 'projectAdmin'},
  {name: 'Budget', label: '预算', field: 'projectBudget', sortable: true,},
  {name: 'ScheduledStartDate', label: '计划开始', field: 'projectScheduledStartDate', sortable: true},
  {name: 'ScheduledFinshDate', label: '计划完成', field: 'projectScheduledFinshDate', sortable: true,},
  {name: '任务内容', label: '任务内容'},
  {name: 'actions', label: ''},
];
const rows = [
  {
    projectShortId: '1',
    projectName: '2',
    projectAdmin: 1829,
    projectBudget: 6.0,
    projectScheduledStartDate: '2000/03/20',
    projectScheduledFinshDate: '2045/04/20',
    projectDescription: '8754687546875468754687546875468754687548754687546875468754875468754687546875487546875468754687548754687546875468754875468754687546875487546875468754687548754687546875468754875468754687546875487546875468754687548754687546875468754875468754687546875487546875468754687548754687546875468754875468754687546875487546875468754687548754687546875468754875468754687546875487546875468754687548754687546875468754687546875468754687546875468754687546875468754687546875468754687546875468754687546875468754687546875468754687546875468754687546875468754687546875468754687546875468754687546875468754687546875468754687546',
  },
  {
    projectShortId: '1',
    projectName: '2',
    projectAdmin: 154569,
    projectBudget: 6.0,
    projectScheduledStartDate: '2000/03/20',
    projectScheduledFinshDate: '2045/04/20',
    projectDescription: 87546,
  },
  {
    projectShortId: '1',
    projectName: '2',
    projectAdmin: 1549,
    projectBudget: 6.0,
    projectScheduledStartDate: '2000/03/20',
    projectScheduledFinshDate: '2045/04/20',
    projectDescription: 87546,
  },
  {
    projectShortId: '1',
    projectName: '2',
    projectAdmin: 1549,
    projectBudget: 6.0,
    projectScheduledStartDate: '2000/03/20',
    projectScheduledFinshDate: '2045/04/20',
    projectDescription: 87546,
  },
  {
    projectShortId: '1',
    projectName: '2',
    projectAdmin: 159,
    projectBudget: 6.0,
    projectScheduledStartDate: '1977/03/20',
    projectScheduledFinshDate: '2045/12/20',
    projectDescription: 87,
  },
  {
    projectShortId: '1',
    projectName: '2',
    projectAdmin: 159,
    projectBudget: 6.0,
    projectScheduledStartDate: '1977/05/20',
    projectScheduledFinshDate: '2066/03/20',
    projectDescription: 87,
  },

]
export default {
  setup() {
    let projectName = ref("");
    let projectShortId = ref("");
    let projectDescription = ref("");
    let projectBudget = ref("");
    let projectAdmin = ref("");
    let projectScheduledStartDate = ref("");
    let projectScheduledFinshDate = ref("");
    let curprojectName = ref("");
    let curprojectShortId = ref("");
    let curprojectDescription = ref("");
    let curprojectBudget = ref("");
    let curprojectAdmin = ref("");
    let curprojectScheduledStartDate = ref("");
    let curprojectScheduledFinshDate = ref("");
    return {
      newp: ref(false),
      projectName,
      projectAdmin,
      projectBudget,
      projectScheduledStartDate,
      projectScheduledFinshDate,
      projectShortId,
      projectDescription,
      curprojectName,
      curprojectAdmin,
      curprojectBudget,
      curprojectScheduledStartDate,
      curprojectScheduledFinshDate,
      curprojectShortId,
      curprojectDescription,
      columns,
      rows,

    };
  },
  methods: {
    editRow(props) {
      console.log(props.row);

    },
    deleteRow(props) {
      console.log(props.row)
    },
    showDescription(props) {
      this.curprojectName = props.row.projectName;
      this.curprojectAdmin = props.row.projectAdmin;
      this.curprojectDescription = props.row.projectDescription;

    }
  },
};
</script>
<style>

</style>

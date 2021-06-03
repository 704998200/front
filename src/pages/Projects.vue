<template>
  <q-btn color="primary" label="新建" @click="newp = true" style=" margin-left: 1%;margin-top: 1%"/>
  <q-dialog v-model="newp">
    <q-card style="width: 600px;height: 800px;background-image: url('');">
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
                 color="primary" label="提交" type="submit"/>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
  <q-dialog v-model="mangep">
    <q-card>
      <q-card-section>
        <div class="text-h6">创建新任务</div>
      </q-card-section>
      <q-form>
        <div class=submit-btn>
          <q-btn color="primary" label="提交" type="submit"/>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
  <div class="q-pa-md q-gutter-md">
    <q-table
      title="项目列表"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width/>
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
                   :icon="props.expand ? 'remove' : 'add'"/>
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">任务内容: {{ props.row.projectDescription }}</div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import {ref} from "vue";

const columns = [
  {
    name: 'id',
    required: true,
    label: 'id',
    align: 'center',
    field: row => row.projectShortId,
    sortable: true,
  },
  {name: 'name', align: 'center', label: '项目名称', field: 'projectName'},
  {name: 'Admin', label: '负责人', field: 'projectAdmin'},
  {name: 'Budget', label: '预算', field: 'projectBudget', sortable: true,},
  {name: 'ScheduledStartDate', label: '计划开始', field: 'projectScheduledStartDate', sortable: true},
  {name: 'ScheduledFinshDate', label: '计划完成', field: 'projectScheduledFinshDate', sortable: true,},
];
const rows = [
  {
    projectShortId: '1',
    projectName: '2',
    projectAdmin: 159,
    projectBudget: 6.0,
    projectScheduledStartDate: '2000/03/20',
    projectScheduledFinshDate: '2045/04/20',
    projectDescription: 87,
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
    let projectName = null;
    let projectShortId = null;
    let projectDescription = null;
    let projectBudget = null;
    let projectScheduledStartDate = null;
    let projectScheduledFinshDate = null;
    return {
      newp: ref(false),
      mangep: ref(false),
      leftDrawerOpen: false,
      search: "",
      projectName,
      projectBudget,
      projectScheduledStartDate,
      projectScheduledFinshDate,
      projectShortId,
      projectDescription,
      columns,
      rows,
    };
  },

  methods: {},
};
</script>

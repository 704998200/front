<template>
  <div class="q-pa-md q-gutter-md">
    <div class="row justify-between"></div>
    <q-card style="width: 50%">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        title=""
      >
        <q-tab name="myProjects" label="我的项目"/>
        <q-tab name="myIssues" label="我的问题"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="myProjects">
          <q-table :rows="projectRows" :columns="myProjectsColumns" row-key="name" flat>
            <template v-slot:body-cell-projectInfo="props">
              <q-td :props="props">
                <q-btn
                  dense
                  round
                  flat
                  color="grey"
                  @click="openProject(props)"
                  icon="arrow_forward"
                ></q-btn>
              </q-td>
            </template>
          </q-table>
        </q-tab-panel>

        <q-tab-panel name="myIssues">
          <q-table :rows="issueRows" :columns="myIssuesColumns" row-key="name" flat>

            <template v-slot:body-cell-issueInfo="props">
              <q-td :props="props">
                <q-btn
                  dense
                  round
                  flat
                  color="grey"
                  @click="openIssue(props)"
                  icon="arrow_forward"
                ></q-btn>
              </q-td>
            </template>

          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>


  </div>
  <v-chart class="chart" :option="option"/>
</template>

<script>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {PieChart} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, {THEME_KEY} from "vue-echarts";
import {ref, defineComponent} from "vue";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);
const myProjectsColumns = [
  {
    name: "id",
    required: true,
    label: "id",
    align: "center",
    field: (row) => row.projectId,
    sortable: true,
  },
  {name: "name", align: "center", label: "项目名称", field: "projectName"},
  {name: "projectInfo", align: "center", label: "操作"},
];
const myIssuesColumns = [
  {
    name: "id",
    required: true,
    label: "id",
    align: "center",
    field: (row) => row.issueId,
    sortable: true,
  },
  {name: "name", align: "center", label: " 问题名称", field: "issueName"},
  {name: "status", align: "center", label: " 状态", field: "issueStatus"},
  {name: "issueInfo", align: "center", label: "操作"},
];
const issueRows = [
  {
    issueName: 'Frozen Yogurt',
    issueId: 159,
    issueStatus: "开启"
  }];
const projectRows = [
  {
    projectName: 'Frozen Yogurt',
    projectId: 159,
  }];
export default defineComponent({
  name: "index",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
  },
  setup() {

    const option = ref({
      title: {
        text: "Traffic Sources",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
      },
      series: [
        {
          name: "Traffic Sources",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            {value: 335, name: "Direct"},
            {value: 310, name: "Email"},
            {value: 234, name: "Ad Networks"},
            {value: 135, name: "Video Ads"},
            {value: 1548, name: "Search Engines"}
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(255, 255,255,1)"
            }
          }
        }
      ]
    });

    return {
      option,
      tab: ref('myProjects'),
      myProjectsColumns,
      myIssuesColumns,
      issueRows,
      projectRows
    };
  },
  methods: {
    openIssue(props) {
      //TODO
    },
    openProject(props) {
      //TODO
    },
  },
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>

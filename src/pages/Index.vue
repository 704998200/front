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
        <q-tab name="openByMe" label="我打开的" />
        <q-tab name="assignToMe" label="分配给我的" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="openByMe">
          <q-table
            :rows="openByMeRows"
            :columns="issueCols"
            row-key="name"
            flat
          >
            <template v-slot:body-cell-action="props">
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
        <q-tab-panel name="assignToMe">
          <q-table
            :rows="assignToMeRows"
            :columns="issueCols"
            row-key="name"
            flat
          >
            <template v-slot:body-cell-action="props">
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
    <q-card name="chart" style="width: 50%">
      <v-chart class="chart" :option="chartData" />
    </q-card>
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { defineComponent, onMounted, ref } from "vue";
import { axios } from "../boot/axios";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
// 这里定义了列信息
const issueCols = [
  {
    name: "id",
    required: true,
    label: "id",
    align: "center",
    field: "id",
    sortable: true,
  },
  { name: "title", align: "center", label: "Issue标题", field: "issueTitle" },
  { name: "action", align: "center", label: "操作" },
];
// 定义两种不同的类型
const assignToMeRows = [
  {
    issueTitle: "FY2",
    id: 159,
  },
];
const openByMeRows = [
  {
    issueTitle: "FY3",
    id: 114,
  },
];
export default defineComponent({
  name: "index",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  setup() {
    const chartData = ref({
      title: {
        text: "问题状态",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["已开启", "已关闭"],
      },
      series: [
        {
          name: "问题状态",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            // { value: 335, name: "Direct" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(255, 255,255,1)",
            },
          },
        },
      ],
    });
    onMounted(() => {
      // 拿绘图用的数据
      axios.get("/api/v1/dashboard/counts").then((successResponse) => {
        const responseResult = successResponse.data.data;
        let openedIssueCount = responseResult.openedIssue;
        let closedIssueCount = responseResult.closedIssue;
        chartData.value.series[0].data.push({
          value: openedIssueCount,
          name: "已开启",
        });
        chartData.value.series[0].data.push({
          value: closedIssueCount,
          name: "已关闭",
        });
      });
      // 拿分配给我的
    });
    return {
      chartData,
      tab: ref("openByMe"),
      issueCols,
      assignToMeRows,
      openByMeRows,
    };
  },
  methods: {
    openIssue(props) {
      // TODO
    },
  },
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>

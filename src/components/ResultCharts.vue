<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type TooltipItem,
} from "chart.js";
import { euros } from "@/lib/Numbers";
import { isSmallScreen } from "../lib/responsiveness";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

type Amount = number;

const props = defineProps<{
  years: string[];
  bills: Amount[];
  subsidization: Amount[];
  savings: Amount[];
}>();

const { bills, subsidization } = toRefs(props);

// make the chart reactive on all props
const series = [
  {
    name: "Eigenanteil",
    data: bills,
    color: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132",
  },
  {
    name: "Staatliche Unterstützung",
    data: subsidization,
    color: "rgba(255, 205, 86, 0.2)",
    borderColor: "rgba(255, 205, 86, 0.4)",
  },
  // {
  //   name: "Eigene Einsparung",
  //   data: savings,
  //   color: "rgba(201, 203, 207, 0.05)",
  //   borderColor: "rgb(201, 203, 207)",
  // },
];

// determine the height based on the screen size.
// Fixed 200 is too small on mobile, 300 is too big on desktop
const smallScreenHeight = 500
const bigScreenHeight = 200
let chartHeight = isSmallScreen.value ? smallScreenHeight : bigScreenHeight


const scales = {
  x: {
    stacked: true,
  },
  y: {
    stacked: true,
    ticks: {
      callback(value: string | number) {
        return euros(value as number, 0);
      },
    },
  },
};

const options = {
  scales,
  borderSkipped: "bottom",
  maintainAspectRation: false,
  plugins: {
    tooltip: {
      callbacks: {
        label(context: TooltipItem<"bar">) {
          return context.dataset.label + ": " + euros(context.parsed.y);
        },
      },
    },
  },
};

const chartData = computed(() => {
  const labels = [2021, 2022] as Array<number | string>;
  if (props.savings[3]) {
    labels.push("2023 ohne Einsparung");
    labels.push("2023 mit Einsparung");
  } else {
    labels.push(2023);
  }
  return {
    labels,
    datasets: series.map((s) => ({
      data: s.data.value,
      label: s.name,
      backgroundColor: s.color,
      borderColor: s.borderColor,
      borderWidth: 2,
    })),
  };
});
</script>

<template>
  <Bar :chart-data="chartData" :chart-options="options" :height="chartHeight" />
</template>

<style scoped>
.result-chart canvas {
  height: 200px;
}
</style>

<script setup lang="ts">
import { computed, toRefs } from "vue";
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

type Year = number;
type Amount = number;

const props = defineProps<{
  years: Year[];
  bills: Amount[];
  subsidization: Amount[];
  savings: Amount[];
}>();

const { bills, subsidization, savings } = toRefs(props);

// make the chart reactive on all props
const series = [
  {
    name: "Eigenanteil",
    data: bills,
    color: "rgba(255, 99, 132, 0.2)",
    borderColor: "#dbb",
  },
  {
    name: "Staatliche Unterstützung",
    data: subsidization,
    color: "rgba(255, 205, 86, 0.2)",
    borderColor: "rgba(255, 205, 86)",
  },
  {
    name: "Eigene Einsparung",
    data: savings,
    color: "rgba(201, 203, 207, 0.05)",
    borderColor: "rgb(201, 203, 207)",
  },
];

const scales = {
  x: {
    stacked: true,
  },
  y: {
    stacked: true,
    ticks: {
      callback(value: string | number) {
        return euros(value as number, 0)
      }
    }
  },
};

const options = {
  scales,
  borderSkipped: "middle",
  plugins: {
    tooltip: {
      callbacks: {
        label(context: TooltipItem<"bar">) {
          return context.dataset.label + ": " + euros(context.parsed.y);
        },
      },
    },
  }
};

const chartData = computed(() => ({
  labels: [2021, 2022, 2023],
  datasets: series.map((s) => ({
    data: s.data.value,
    label: s.name,
    backgroundColor: s.color,
    borderColor: s.borderColor,
    borderWidth: 2,
  })),
}));
</script>

<template>
  <Bar
    :chart-data="chartData"
    :chart-options="options"
    :height="200"
  />
</template>

<style scoped>
.result-chart canvas {
  height: 400px
}
</style>

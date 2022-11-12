<script setup lang="ts">
import { toRefs } from "vue";
import VueApexChart from "vue3-apexcharts";

type Year = number;
type Amount = number;

const props = defineProps<{
  years: Year[];
  bills: Amount[];
  reductions: Amount[];
  savings: Amount[];
}>();

const chartOptions = {
  chart: { id: "gas-costs", stacked: true },
  xaxis: { categories: props.years },
  colors: ["#ff0000", "#888888", "#00ff00"],
  fill: {
    colors: ["#ff0000", "#888888", "#00ff00"],
  }
};
const { bills, reductions, savings } = toRefs(props);
const series = [
  { name: "Eigenanteil", data: bills },
  { name: "Staatliche Unterstützung", data: reductions },
  { name: "Eigene Einsparung", data: savings },
];
</script>

<template>
  <VueApexChart
    width="500"
    type="bar"
    :options="chartOptions"
    :series="series"
  ></VueApexChart>
</template>

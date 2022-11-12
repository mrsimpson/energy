<script setup lang="ts">
import { euros } from "@/lib/Numbers";
import { toRefs } from "vue";
import VueApexChart from "vue3-apexcharts";

type Year = number;
type Amount = number;

const props = defineProps<{
  years: Year[];
  bills: Amount[];
  subsidization: Amount[];
  savings: Amount[];
}>();

const chartOptions = {
  chart: { id: "gas-costs", stacked: true },
  xaxis: { categories: props.years },
  fill: {
    colors: ["#ff0000", "#888888", "#00ff00"],
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => euros(val, 0),
  },
};
const { bills, subsidization: reductions, savings } = toRefs(props);
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

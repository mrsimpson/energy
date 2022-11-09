<script setup lang="ts">
import VueApexChart from "vue3-apexcharts";

type Year = number
type Amount = number

const props = defineProps<{
  years: Year[]
  bills: Amount[]
  reductions: Amount[]
  savings: Amount[]
}>()

const chartOptions = {
  chart: { id: "gas-costs", stacked: true },
  xaxis: { categories: props.years },
}

const series = [
  { name: "Eigenanteil", data: props.bills },
  { name: "Staatliche Unterstützung", data: props.reductions },
  { name: "Eigene Einsparung", data: props.savings },
]
</script>

<template>
  <VueApexChart
    width="500"
    type="bar"
    :options="chartOptions"
    :series="series"
  ></VueApexChart>
</template>

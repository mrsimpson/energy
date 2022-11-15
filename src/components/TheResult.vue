<script setup lang="ts">
import ResultCharts from "./ResultCharts.vue";
import { NCard, NSpace } from "naive-ui";
import { euros } from "@/lib/Numbers";

defineProps<{
  years: number[];
  bills: number[];
  savings: number[];
  subsidization: number[];
  reduction2023: number;
}>();
</script>

<template>
  <n-space>
    <n-card class="savings" style="min-width: 40rem">
      <p>Du sparst</p>
      <p style="font-size: 3rem">
        {{ euros(savings[savings.length - 1]) }}
      </p>
      <p>
        Durch Deine Einsparung von {{ reduction2023 }}kWh reduzierst Du nicht
        nur Emissionen, sondern sparst auch richtig Geld!
      </p>
    </n-card>

    <n-card>
      <p>
        Wie sich Deine Kosten entwickelt haben bzw. entwickeln können, siehst Du
        im folgenden Diagramm.
      </p>
      <p>
        Wir zeigen Dir hier an, in welchem Jahr Dein Verbrauch welche Kosten
        verursachen würde. Keine Sorge: Zahlen musst Du nur den Eigenanteil.
      </p>
      <ResultCharts
        :years="years"
        :bills="bills"
        :subsidization="subsidization"
        :savings="savings"
      />
      <p>
        Beachte dennoch: Die staatlichen Förderungen sind nur für 2023
        garantiert. Was 2024 kommt, weiß noch niemand – nur dass das, was Du
        nicht verbrauchst ganz sicher Deine Kosten senkt!
      </p>
    </n-card>
  </n-space>
</template>
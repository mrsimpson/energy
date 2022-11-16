<script setup lang="ts">
import ResultCharts from "./ResultCharts.vue";
import { NCard, NSpace, NNumberAnimation, type NumberAnimationInst } from "naive-ui";
import { onMounted, ref, watch } from "vue";

const props = defineProps<{
  years: number[];
  bills: number[];
  savings: number[];
  subsidization: number[];
  reduction2023: number;
}>();

const resultAnimationInstRef = ref<NumberAnimationInst | null>(null);

const resultFrom = ref(0);
const resultTo = ref(props.savings[props.savings.length - 1]);

const animateResult = () => resultAnimationInstRef.value?.play();

watch(
  () => props.savings,
  (current: number[], previous: number[]) => {
    resultFrom.value = previous[previous.length -1];
    resultTo.value = current[previous.length -1];
  }
);

onMounted(animateResult);
</script>

<template>
  <n-space vertical>
    <n-card class="savings" :bordered="false">
      <p>Du sparst</p>
      <p style="font-size: 3rem">
        <n-number-animation
          :from="resultFrom"
          :to="resultTo"
          :precision="2"
          locale="de"
        >
          reduction2023
        </n-number-animation>
        €
      </p>
      <p>
        Durch Deine Einsparung von
        {{ reduction2023 }}kWh reduzierst Du nicht nur Emissionen, sondern
        sparst auch richtig Geld!
      </p>
    </n-card>

    <n-card :bordered="false">
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

<style scoped>
.result-charts {
  max-height: 100px;
}
</style>
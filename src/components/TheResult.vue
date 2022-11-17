<script setup lang="ts">
import ResultCharts from "./ResultCharts.vue";
import { NCard, NSpace, NNumberAnimation, type NumberAnimationInst } from "naive-ui";
import { onMounted, ref, watch } from "vue";

const props = defineProps<{
  years: string[];
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

const compressedPadding = {paddingTop: '0px', paddingBottom: '0px'}
</script>

<template>
  <n-space vertical>
    <n-card v-if="reduction2023 === 0"></n-card>
    <n-card v-if="reduction2023 > 0" :bordered="false"  :content-style="compressedPadding">
      <p>Du sparst</p>
      <p style="font-size: 3rem; margin-block-start: 0.5rem; margin-block-end: 0.5rem">
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
        Durch deine Einsparung von {{ reduction2023 }}kWh reduzierst du nicht
        nur CO<sub>2</sub>, sondern sparst auch richtig Geld!
      </p>
    </n-card>

    <n-card :bordered="false" :content-style="compressedPadding">
      <p>
        Wie sich deine Kosten entwickelt haben bzw. entwickeln können, siehst du
        im folgenden Diagramm.
      </p>
      <p>
        Wir zeigen dir hier an, in welchem Jahr dein Verbrauch welche Kosten
        verursachen würde. Keine Sorge: Zahlen musst du nur den Eigenanteil.
      </p>
      <ResultCharts
        :years="years"
        :bills="bills"
        :subsidization="subsidization"
        :savings="savings"
      />
      <p>
        Wie es ab 2024 aussieht, weiß jetzt noch niemand. Klar ist aber: was du
        einsparst, senkt deine Kosten immer.
      </p>
    </n-card>
  </n-space>
</template>

<style scoped>
.result-charts {
  max-height: 100px;
}
</style>
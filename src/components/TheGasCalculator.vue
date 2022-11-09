<template>
  <n-card class="input-params"
    title="Meine Verbrauchsdaten">
    <n-space vertical>
    <n-input-group>
      <n-input-group-label>Energieverbrauch 2021</n-input-group-label>
    <n-input-number
      v-model:value="consumption2021"
      :validator="validatePositive"
      :min="1"
      placeholder="Energieverbrauch 2021"
      :step="1000"
    >
      <template #suffix>kWh</template></n-input-number
    >
    </n-input-group>
    <n-input-group>
      <n-input-group-label>Gaspreis 2021</n-input-group-label>

    <n-input-number
      v-model:value="price2021"
      :validator="validatePositive"
      :min="0"
      placeholder="Gaspreis 2021"
      :step="0.01"
      :format="euroToCent"
      :parse="centToEuro"
    >
      <template #suffix>Cent / kWh</template></n-input-number
    >
  </n-input-group>
</n-space>
  </n-card>
  <n-card>

  </n-card>
</template>

<script setup lang="ts">
import { NInputNumber, NCard, NInputGroup, NInputGroupLabel, NSpace } from "naive-ui";
import { ref } from "vue";

const consumption2021 = ref(15000)
const price2021 = ref(0.1)
const price2022 = ref(0.4)

const validatePositive = (x: number) => x > 0
const euroToCent = (x: number | null): string => `${((x || 0) * 100).toFixed(0)}`
const centToEuro = (x: string): number => Number(x) / 100
</script>
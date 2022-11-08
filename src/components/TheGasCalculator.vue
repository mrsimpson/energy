<template>
  <n-card class="input-params"
    title="Meine Verbrauchsdaten">
    <n-space vertical>
    <n-input-group>
      <n-input-group-label>Energieverbrauch 2021</n-input-group-label>
    <n-input-number
      v-model:value="params.consumption2021"
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
      v-model:value="params.price2021"
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

<script lang="ts">
import { defineComponent } from "vue";
import { NInputNumber, NCard, NInputGroup, NInputGroupLabel, NSpace } from "naive-ui";
import { toNumber } from "@vue/shared";

export default defineComponent({
  setup: () => ({
    validatePositive: (x: number) => x > 0,
    euroToCent: (x: number | null): string => `${(x || 0) * 100}`,
    centToEuro: (x: string): number => toNumber(x) / 100,
  }),
  components: {
    NInputNumber,
    NInputGroup,
    NInputGroupLabel,
    NCard,
    NSpace
  },
  data: () => ({
    params: {
      consumption2021: 15000,
      price2021: 0.1,
      price2022: 0.4,
    },
  }),
});
</script>
<script setup lang="ts">
import type { Ref } from "vue";
import { centToEuro, euroToCent } from "../lib/Numbers";

const props = defineProps<{
  modelValue: Ref<number>;
  label: string;
  price2022: number;
  price2023: number;
}>();

</script>

<template>
  <n-form-item>
    <n-input-group-label>Gaspreis 2021</n-input-group-label>
    <n-input
      v-model:value="props.modelValue.value"
      placeholder="Gaspreis 2021"
      :step="0.01"
      :format="euroToCent"
      :parse="centToEuro"
      :on-input="emit('price2021Changed', model.price2021.value)"
    >
      <template #suffix>Cent / kWh</template></n-input
    >
  </n-form-item>
</template>

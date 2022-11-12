<script setup lang="ts">
import { toRefs } from "vue";
import {
  NInputNumber,
  NCard,
  NInputGroup,
  NInputGroupLabel,
  NSpace,
  NSlider,
  NEl,
} from "naive-ui";
import { validatePositive } from "../lib/Numbers";

const props = defineProps<{
  consumption: number;
  reduction2023: number;
}>();

const emit = defineEmits(['consumptionChanged', 'reduction2023Changed'])

</script>

<template>
  <n-card
    class="calc-basis"
    title="Mein Energiebedarf"
  >
    <n-space>
      <n-input-group>
        <n-input-group-label>Energiebedarf</n-input-group-label>
        <n-input-number
          v-model:value="consumption"
          :validator="validatePositive"
          :min="1"
          placeholder="Energiebedarf"
          :step="1000"
          :on-input="emit('consumptionChanged', consumption)"
        >
          <template #suffix>kWh</template></n-input-number
        >
      </n-input-group>
      <n-input-group>

        <n-input-group-label>Davon spare ich 2023</n-input-group-label>
        <n-input-number
          v-model:value="reduction2023"
          :validator="validatePositive"
          :min="0"
          placeholder="Dein Sparziel für 2023"
          :step="100"
          :on-input="emit('reduction2023Changed', reduction2023)"
        >
          <template #suffix>kWh</template></n-input-number
        >
      </n-input-group>
    </n-space>
  </n-card>
</template>

<style>
.n-input-group-label {
    min-width: 12rem;
}
</style>

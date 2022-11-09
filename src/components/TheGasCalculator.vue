<template>
  <n-space horizontal>
    <n-space vertical>
      <n-card
        class="calc-basis"
        title="Meine Verbrauchsdaten"
        style="max-width: 24rem"
      >
        <n-space vertical>
          <n-input-group>
            <n-input-group-label>Energiebedarf</n-input-group-label>
            <n-input-number
              v-model:value="consumption"
              :validator="validatePositive"
              :min="1"
              placeholder="Energiebedarf 2021"
              :step="1000"
            >
              <template #suffix>kWh</template></n-input-number
            >
          </n-input-group>
          <n-input-group>
            <n-input-group-label>Gaspreis 2022</n-input-group-label>
            <n-input-number
              v-model:value="price2022"
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
          <n-el style="margin-top: 0.5rem; margin-bottom: 2rem">
            <n-el>Einsparung 2023</n-el>
            <n-slider
              v-model:value="reduction2023"
              :step="0.01"
              :min="0"
              :max="1"
              :format-tooltip="(x) => `${(x * 100).toFixed(0)}%`"
              :default-value="reduction2023"
              :show-tooltip="true"
              placement="bottom"
            />
          </n-el>

          <!-- <n-input-group>
            <n-input-group-label>Abschlag 09/2022</n-input-group-label>
            <n-input-number
              v-model:value="paymentSeptember2022"
              :validator="validatePositive"
              :min="0"
              placeholder="Abschlagszahlung September"
              :step="1"
            >
              <template #suffix>€</template></n-input-number
            >
          </n-input-group> -->
        </n-space>
      </n-card>
      <n-card
        class="comparison"
        title="Zu Vergleichszwecken"
        style="max-width: 24rem"
      >
        <n-space vertical>
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
          <n-input-group>
            <n-input-group-label>Gaspreis 2023</n-input-group-label>
            <n-input-number
              v-model:value="price2023"
              :validator="validatePositive"
              :min="0"
              placeholder="Gaspreis 2023"
              :step="0.01"
              :format="euroToCent"
              :parse="centToEuro"
            >
              <template #suffix>Cent / kWh</template></n-input-number
            >
          </n-input-group>
        </n-space>
      </n-card>
    </n-space>
    <n-card title="Du sparst"> </n-card>
  </n-space>
</template>

<script setup lang="ts">
import {
  NInputNumber,
  NCard,
  NInputGroup,
  NInputGroupLabel,
  NSpace,
  NSlider,
  NEl
} from "naive-ui";
import { ref } from "vue";

const consumption = ref(15000);
const price2021 = ref(0.1);
const price2022 = ref(0.18);
const price2023 = ref(0.3);
const reduction2023 = ref(0.1)
const paymentSeptember2022 = ref((consumption.value * price2021.value) / 12);

const validatePositive = (x: number) => x > 0;
const euroToCent = (x: number | null): string =>
  `${((x || 0) * 100).toFixed(0)}`;
const centToEuro = (x: string): number => Number(x) / 100;
</script>

<style scoped>
  .n-input-group-label {
    min-width: 9rem;
  }
</style>
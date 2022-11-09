<template>
  <n-space vertical size="large">
    <n-layout has-sider>
      <n-layout-sider
        collapse-mode="none"
        :show-collapsed-content="false"
        :collapsed-width="0"
        width="30rem"
        :show-trigger="false"
        content-style="padding: 24px;"
        bordered
      >
        <n-space>
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
                  :step="100"
                  :min="0"
                  :max="consumption / 2"
                  :format-tooltip="(x) => `${x.toFixed(0)}kWh`"
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
      </n-layout-sider>
      <n-layout-content>
        <n-card class="savings" style="min-width: 40rem">
          <p>Du sparst</p>
          <p style="font-size: 3rem">
            {{ `${savings2023.toFixed(2)}€` }}
          </p>
          <p>
            Durch Deine Einsparung von {{ reduction2023 }}kWh reduzierst Du
            nicht nur Emissionen, ,sondern sparst auch richtig Geld!
          </p>
          <p>
            Wie sich Deine Kosten entwickelt haben bzw. entwickeln können,
            siehst Du im folgenden Diagramm.
          </p>
        </n-card>
        <n-card title="Deine Kosten">
          <ResultCharts
            :years="[2021, 2022, 2023]"
            :bills="[bill2021, bill2022, bill2023]"
            :reductions="reductions"
            :savings="savings"
          />
        </n-card>
      </n-layout-content>
    </n-layout>
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
  NEl,
  NLayout,
  NLayoutContent,
  NLayoutSider,
} from "naive-ui";
import { computed, ref } from "vue";
import ResultCharts from "./ResultCharts.vue";

const consumption = ref(15000);
const price2021 = ref(0.1);
const price2022 = ref(0.18);
const price2023 = ref(0.3);
const reduction2023 = ref(consumption.value * 0.1);
const paymentSeptember2022 = ref((consumption.value * price2021.value) / 12);
const subsidizedQuota = 0.8;
const gasPriceBreak = 0.12;
const bill2021 = computed(() => consumption.value * price2021.value);
const bill2022 = computed(
  () => consumption.value * price2022.value - paymentSeptember2022.value
);
const bill2023 = computed(
  () => consumption.value * Math.min(price2023.value, gasPriceBreak)
);
const reductions = computed(() => [
  0,
  paymentSeptember2022.value,
  consumption.value * (price2023.value - gasPriceBreak),
]);
const savings = computed(() => [0, 0, savings2023.value]);

const validatePositive = (x: number) => x > 0;
const euroToCent = (x: number | null): string =>
  `${((x || 0) * 100).toFixed(0)}`;
const centToEuro = (x: string): number => Number(x) / 100;

const reducedConsumption2023 = computed(
  () => consumption.value - reduction2023.value
);

const savings2023 = computed(
  () =>
    Math.min((1 - subsidizedQuota) * consumption.value, reduction2023.value) *
      price2023.value +
    Math.max(
      reduction2023.value - (1 - subsidizedQuota) * consumption.value,
      0
    ) *
      gasPriceBreak
);

// const savings2023 = computed( () => )
</script>

<style scoped>
.n-input-group-label {
  min-width: 9rem;
}
</style>
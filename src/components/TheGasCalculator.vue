<template>
  <n-space vertical size="large">
    <n-layout has-sider>
      <n-layout-sider
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
        <TheResult
          :years="[2021, 2022, 2023]"
          :bills="[calculation2021.billed, calculation2022.billed, calculation2023.billed]"
          :subsidization="subsidization"
          :savings="savings"
          :reduction2023="reduction2023"
        />
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
import TheResult from "./TheResult.vue";

// Parameters
const consumption = ref(15000);
const price2021 = ref(0.1);
const price2022 = ref(0.18);
const price2023 = ref(0.3);
const reduction2023 = ref(consumption.value * 0.1);
const paymentSeptember2022 = ref((consumption.value * price2021.value) / 12);
const subsidizedQuota = 0.8;
const gasPriceBreak = 0.12;

// Business Logic

const calculation2021 = computed(() => ({
  billed: consumption.value * price2021.value,
}));

const calculation2022 = computed(() => ({
  subsidized: paymentSeptember2022.value,
  billed: consumption.value * price2022.value - paymentSeptember2022.value,
}));

const calculation2023 = computed(() => {
  const actualConsumption = consumption.value - reduction2023.value;
  const consumptionSubsidized = Math.min(
    subsidizedQuota * consumption.value,
    actualConsumption
  );
  const consumptionAtMarketprice = actualConsumption - consumptionSubsidized;
  return {
    billed:
      consumptionAtMarketprice * price2023.value +
      consumptionSubsidized * gasPriceBreak,
    subsidized: consumptionSubsidized * (price2023.value - gasPriceBreak),
    saved:
      Math.min((1 - subsidizedQuota) * consumption.value, reduction2023.value) *
        price2023.value +
      Math.max(
        reduction2023.value - (1 - subsidizedQuota) * consumption.value,
        0
      ) *
        gasPriceBreak,
  };
});

const subsidization = computed(() => [
  0,
  calculation2022.value.subsidized,
  calculation2023.value.subsidized,
]);
const savings = computed(() => [0, 0, calculation2023.value.saved]);

// ui-helper functions
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

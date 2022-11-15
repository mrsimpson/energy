<template>
  <n-space vertical size="large">
    <TheConsumptionParameters
      :consumption="consumption"
      :reduction2023="reduction2023"
      @consumption-changed="consumption = $event"
      @reduction2023-changed="reduction2023 = $event"
    />
    <ThePriceParameters 
      :payment-september2022="paymentSeptember2022"
      :price2021="price2021"
      :price2022="price2022"
      :price2023="price2023"
      @payment-september2022-changed="paymentSeptember2022 = $event"
      @price2021-changed="price2021 = $event"
      @price2022-changed="price2022 = $event"
      @price2023-changed="price2023 = $event"
      />
    <TheResult
      :years="[2021, 2022, 2023]"
      :bills="[
        calculation2021.billed,
        calculation2022.billed,
        calculation2023.billed,
      ]"
      :subsidization="subsidization"
      :savings="savings"
      :reduction2023="reduction2023"
    />
  </n-space>
</template>

<script setup lang="ts">
import {
  NSpace,
} from "naive-ui";
import { computed, ref } from "vue";
import TheConsumptionParameters from "./TheConsumptionParameters.vue";
import ThePriceParameters from "./ThePriceParameters.vue"

import TheResult from "./TheResult.vue";
import { centToEuro, euroToCent, validatePositive } from "../lib/Numbers";

// Parameters
const consumption = ref(15000);
const price2021 = ref(0.1);
const price2022 = ref(0.18);
const price2023 = ref(0.3);
const reduction2023 = ref(consumption.value * 0.1);
const paymentSeptember2022 = ref((consumption.value * price2022.value) / 12);
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
</script>

<style scoped>
.n-input-group-label {
  min-width: 9rem;
}
</style>

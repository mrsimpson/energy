<script setup lang="ts">
import calculateMonthlyRate from "../lib/calculateMonthlyRate";
import TheConsumptionParameters from "./TheConsumptionParameters.vue";
import ThePriceParameters from "./ThePriceParameters.vue";

import TheResult from "./TheResult.vue";

// Parameters
const consumption = ref(15000);
const price2021 = ref(0.1);
const price2022 = ref(0.18);
const price2023 = ref(0.3);
const reduction2023 = ref(0);
const paymentSeptember2022 = ref(
  calculateMonthlyRate(consumption.value, price2022.value)
);
const subsidizedQuota = 0.8;
const gasPriceBreak = 0.12;

// UI logic
const showPriceParameter = ref(false);
const togglePriceParameters = () => {
  showPriceParameter.value = !showPriceParameter.value;
};

watch(
  () => consumption.value,
  (current) => {
    if (!showPriceParameter.value) {
      paymentSeptember2022.value = calculateMonthlyRate(
        current,
        price2022.value
      );
    }
  }
);

// Business Logic
const calculation2021 = computed(() => ({
  billed: consumption.value * price2021.value,
}));

const calculation2022 = computed(() => ({
  subsidized: paymentSeptember2022.value,
  billed: consumption.value * price2022.value - paymentSeptember2022.value,
}));

const calculation2023 = computed(() => {
  const reduction: number = reduction2023.value || 0;
  const actualConsumption = consumption.value - reduction;

  const consumptionSubsidized = subsidizedQuota * consumption.value;

  const consumptionAtMarketprice = actualConsumption - consumptionSubsidized;
  return {
    billed:
      consumptionAtMarketprice * price2023.value +
      consumptionSubsidized * gasPriceBreak,
    subsidized: Math.max(consumptionSubsidized * (price2023.value - gasPriceBreak), 0),
    saved: reduction * price2023.value,
  };
});

const subsidization = computed(() => [
  0,
  calculation2022.value.subsidized,
  calculation2023.value.subsidized,
  calculation2023.value.subsidized,
]);
const savings = computed(() => [0, 0, 0, calculation2023.value.saved]);

onMounted(() => scrollTo({top: 0}))
</script>

<template>
  <n-space vertical>
    <n-card>
      <h1>Gaskosten</h1>
      <p>Gib an, was Du an Gas verbrauchst und was Du einsparen m??chtest</p>
      <TheConsumptionParameters />
      <p style="padding-top: 1rem">
        Basierend auf deinem Verbrauch, der Einsparung und
        <n-el class="show-price" @click="togglePriceParameters" tag="a"
          >einigen Annahmen zu Preisen und Preisentwicklung
        </n-el>
        sch??tzen wir ab, wie sich Deine Ausgaben in 2023 entwickeln.
      </p>
      <ThePriceParameters
        v-if="showPriceParameter"
        :consumption="consumption"
        :price2021="price2021"
        :price2022="price2022"
        :price2023="price2023"
        @payment-september2022-changed="paymentSeptember2022 = $event"
        @price2021-changed="price2021 = $event"
        @price2022-changed="price2022 = $event"
        @price2023-changed="price2023 = $event"
        style="padding-top: 1rem"
      />
    </n-card>
    <TheResult
      :years="['2021', '2022', '2023 ohne Einsparung', '2023']"
      :bills="[
        calculation2021.billed,
        calculation2022.billed,
        calculation2023.billed + calculation2023.saved,
        calculation2023.billed,
      ]"
      :subsidization="subsidization"
      :savings="savings"
      :reduction2023="reduction2023"
    />
  </n-space>
</template>

<style scoped>
.n-input-group-label {
  min-width: 9rem;
}
</style>

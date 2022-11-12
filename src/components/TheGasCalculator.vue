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
            class="comparison"
            title="Preise und Abschläge"
            style="max-width: 24rem"
          >
            <n-space vertical>
              <n-input-group>
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
              </n-input-group>

              <h2>Preisentwicklung</h2>
              <p>
                Gib hier den Arbeitspreis Deines Vertrags an. Monatliche
                Grundgebühre sind von der Förderung ausgenommen und werden in
                diesem Rechner nicht berücksichtigt.
              </p>
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
                <n-input-group-label>Gaspreis 2022</n-input-group-label>
                <n-input-number
                  v-model:value="price2022"
                  :validator="validatePositive"
                  :min="0"
                  placeholder="Gaspreis 2022"
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
        <TheConsumptionParameters
          :consumption="consumption"
          :reduction2023="reduction2023"
          @consumption-changed="consumption = $event"
          @reduction2023-changed="reduction2023 = $event"
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
  NLayout,
  NLayoutContent,
  NLayoutSider,
} from "naive-ui";
import { computed, ref } from "vue";
import TheConsumptionParameters from "./TheConsumptionParameters.vue";
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

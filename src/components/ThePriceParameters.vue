<script setup lang="ts">
import calculateMonthlyRate from "../lib/calculateMonthlyRate";
import { centToEuro, euroToCent, validatePositive } from "../lib/Numbers";

const props = defineProps<{
  consumption: number;
  price2021: number;
  price2022: number;
  price2023: number;
}>();

const emit = defineEmits([
  "paymentSeptember2022Changed",
  "price2021Changed",
  "price2022Changed",
  "price2023Changed",
]);

const iPrice2021 = ref(props.price2021);
const iPrice2022 = ref(props.price2022);
const iPrice2023 = ref(props.price2023);

const calculateRate2022 = (total: number) => (total * iPrice2022.value) / 12;
const iPaymentSeptember2022 = ref(calculateRate2022(props.consumption));

let rateManuallyAdapted = ref(false);
watch(
  () => props.consumption,
  (current) => {
    if (!rateManuallyAdapted.value) {
      iPaymentSeptember2022.value = calculateMonthlyRate(
        current,
        iPrice2022.value
      );
    }
  }
);
</script>
<template>
  <n-card
    class="comparison"
    title="Preise und Abschläge"
    :bordered="false"
    :content-style="{ padding: 0 }"
    :header-style="{ padding: 0 }"
  >
    <n-space vertical>
      <n-input-group>
        <n-input-group-label>Abschlag 09/2022</n-input-group-label>
        <n-input-number
          v-model:value="iPaymentSeptember2022"
          :validator="validatePositive"
          :min="0"
          placeholder="Abschlagszahlung September"
          :step="1"
          @update:value="
            () => {
              rateManuallyAdapted = true;
              emit('paymentSeptember2022Changed', iPaymentSeptember2022);
            }
          "
        >
          <template #suffix>€</template></n-input-number
        >
      </n-input-group>

      <p>
        Gib den Arbeitspreis deines Vertrags an. Monatliche Grundgebühren sind
        von der Förderung ausgenommen und werden hier nicht berücksichtigt.
      </p>
      <n-input-group>
        <n-input-group-label>Gaspreis 2021</n-input-group-label>
        <n-input-number
          v-model:value="iPrice2021"
          :validator="validatePositive"
          :min="0"
          placeholder="Gaspreis 2021"
          :step="0.01"
          :format="euroToCent"
          :parse="centToEuro"
          :on-input="emit('price2021Changed', iPrice2021)"
        >
          <template #suffix>Cent / kWh</template></n-input-number
        >
      </n-input-group>
      <n-input-group>
        <n-input-group-label>Gaspreis 2022</n-input-group-label>
        <n-input-number
          v-model:value="iPrice2022"
          :validator="validatePositive"
          :min="0"
          placeholder="Gaspreis 2022"
          :step="0.01"
          :format="euroToCent"
          :parse="centToEuro"
          :on-input="emit('price2022Changed', iPrice2022)"
        >
          <template #suffix>Cent / kWh</template></n-input-number
        >
      </n-input-group>
      <n-input-group>
        <n-input-group-label>Gaspreis 2023</n-input-group-label>
        <n-input-number
          v-model:value="iPrice2023"
          :validator="validatePositive"
          :min="0"
          placeholder="Gaspreis 2023"
          :step="0.01"
          :format="euroToCent"
          :parse="centToEuro"
          :on-input="emit('price2023Changed', iPrice2023)"
        >
          <template #suffix>Cent / kWh</template></n-input-number
        >
      </n-input-group>
    </n-space>
  </n-card>
</template>

<style scoped>
.n-input-group {
  flex-wrap: wrap;
}
</style>
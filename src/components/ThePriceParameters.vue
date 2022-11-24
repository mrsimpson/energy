<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import calculateMonthlyRate from "../lib/calculateMonthlyRate";
import { centToEuro, euroToCent, validatePositive } from "../lib/Numbers";
import { isSmallScreen } from "../lib/responsiveness";
import { createInputHandler } from "../lib/Tracking";

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

const calculateRate2022 = (total: number): number =>
  (total * props.price2022) / 12;

const model = {
  ...toRefs(props),
  paymentSeptember2022: calculateRate2022(props.consumption),
};

let rateManuallyAdapted = ref(false);
watch(
  () => props,
  (newProps) => {
    model;
    if (!rateManuallyAdapted.value) {
      model.paymentSeptember2022 = calculateMonthlyRate(
        newProps.consumption,
        model.price2022.value
      );
    }
  }
);

const rulePrice: FormItemRule = {
  required: true,
};

const rules: FormRules = {
  price2021: rulePrice,
  price2022: rulePrice,
  price2023: rulePrice,
  paymentSeptember2022: {
    type: "number",
    required: true,
  },
};

const formRef = ref<FormInst | null>(null);

const handlePrice2021Changed = createInputHandler(
  (value: number) => emit("price2021Changed", value),
  "price2021",
  true
);

const handlePrice2022Changed = createInputHandler(
  (value: number) => emit("price2022Changed", value),
  "price2022",
  true
);

const handlePrice2023Changed = createInputHandler(
  (value: number) => emit("price2023Changed", value),
  "price2023",
  true
);

const handlePaymentSeptember2022Changed = createInputHandler(
  () => {
    rateManuallyAdapted.value = true;
    emit("paymentSeptember2022Changed", model.paymentSeptember2022);
  },
  "september2022Rate"
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
      <p>
        Hier hast Du die Möglichkeit, die Annahmen des Rechners an Deine ganz
        persönliche Situation und Wahrsagungsfähigkeiten anzupassen
      </p>
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        :label-placement="isSmallScreen ? 'top' : 'left'"
        label-width="auto"
        name="Price parameters"
        id="price-parameters"
        :show-require-mark="false"
      >
        <n-form-item label="Abschlag 09/2022" path="paymentSeptember2022">
          <n-input-number
            v-model:value="model.paymentSeptember2022"
            placeholder="Abschlagszahlung September"
            :step="1"
            :min="1"
            :validator="validatePositive"
            @update:value="handlePaymentSeptember2022Changed"
          >
            <template #suffix>€</template></n-input-number
          >
        </n-form-item>
        <p>
          Gib den Arbeitspreis deines Vertrags an. Monatliche Grundgebühren sind
          von der Förderung ausgenommen und werden hier nicht berücksichtigt.
        </p>
        <n-form-item label="Gaspreis 2021" path="price2021">
          <n-input-number
            v-model:value="model.price2021.value"
            placeholder="Gaspreis 2021"
            :min="0.01"
            :validator="validatePositive"
            :step="0.01"
            :format="euroToCent"
            :parse="centToEuro"
            @update:value="handlePrice2021Changed"
          >
            <template #suffix>Cent / kWh</template></n-input-number
          >
        </n-form-item>
        <n-form-item label="Gaspreis 2022" path="price2022">
          <n-input-number
            v-model:value="model.price2022.value"
            placeholder="Gaspreis 2022"
            :min="0.01"
            :validator="validatePositive"
            :step="0.01"
            :format="euroToCent"
            :parse="centToEuro"
            @update:value="handlePrice2022Changed"
          >
            <template #suffix>Cent / kWh</template></n-input-number
          >
        </n-form-item>
        <n-form-item label="Gaspreis 2023" path="price2023">
          <n-input-number
            v-model:value="model.price2023.value"
            placeholder="Gaspreis 2023"
            :min="0.01"
            :validator="validatePositive"
            :step="0.01"
            :format="euroToCent"
            :parse="centToEuro"
            @update:value="handlePrice2023Changed"
          >
            <template #suffix>Cent / kWh</template></n-input-number
          >
        </n-form-item>
      </n-form>
    </n-space>
  </n-card>
</template>

<style scoped>
.n-input-number-group {
  flex-wrap: wrap;
}
</style>

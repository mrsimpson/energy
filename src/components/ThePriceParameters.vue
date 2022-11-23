<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from "naive-ui";
import calculateMonthlyRate from "../lib/calculateMonthlyRate";
import { centToEuro, euroToCent, validatePositive } from "../lib/Numbers";
import { isSmallScreen } from "../lib/responsiveness";

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

const model = ref({
  price2021: props.price2021,
  price2022: props.price2022,
  price2023: props.price2023,
  paymentSeptember2022: calculateRate2022(props.consumption),
});

const rulePrice: FormItemRule = {
  required: true,
};

const rules: FormRules = {
  price2021: rulePrice,
  price2022: rulePrice,
  price2023: rulePrice,
  paymentSeptember2022: {
    type: "number",
    required: true
  }
};

const formRef = ref<FormInst | null>(null);

let rateManuallyAdapted = ref(false);
watch(
  () => props.consumption,
  (current) => {
    if (!rateManuallyAdapted.value) {
      model.value.paymentSeptember2022 = calculateMonthlyRate(
        current,
        model.value.price2022
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
            @update:value="
              () => {
                rateManuallyAdapted = true;
                emit(
                  'paymentSeptember2022Changed',
                  model.paymentSeptember2022
                );
              }
            "
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
            v-model:value="model.price2021"
            placeholder="Gaspreis 2021"
            :min="0.01"
            :validator="validatePositive"
            :step="0.01"
            :format="euroToCent"
            :parse="centToEuro"
            :on-input-number="emit('price2021Changed', model.price2021)"
          >
            <template #suffix>Cent / kWh</template></n-input-number
          >
        </n-form-item>
        <n-form-item label="Gaspreis 2022" path="price2022">
          <n-input-number
            v-model:value="model.price2022"
            placeholder="Gaspreis 2022"
            :min="0.01"
            :validator="validatePositive"
            :step="0.01"
            :format="euroToCent"
            :parse="centToEuro"
            :on-input-number="emit('price2022Changed', model.price2022)"
          >
            <template #suffix>Cent / kWh</template></n-input-number
          >
        </n-form-item>
        <n-form-item label="Gaspreis 2023" path="price2023">
          <n-input-number
            v-model:value="model.price2023"
            placeholder="Gaspreis 2023"
            :min="0.01"
            :validator="validatePositive"
            :step="0.01"
            :format="euroToCent"
            :parse="centToEuro"
            :on-input-number="emit('price2023Changed', model.price2023)"
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

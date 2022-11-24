<script setup lang="ts">
import { validatePositive } from "../lib/Numbers";
import { CalculatorOutline as CalculatorIcon } from "@vicons/ionicons5";
import Explanation from "@/components/ExplanationText.vue";
import RecommendationsModal from "@/components/RecommendationsModal.vue";
import type { FormRules, FormInst } from "naive-ui";
import { isSmallScreen } from "@/lib/responsiveness";
import { createInputHandler } from "@/lib/Tracking";

const props = defineProps<{
  consumption: number;
  reduction2023: number | undefined;
}>();

const emit = defineEmits(["consumptionChanged", "reduction2023Changed"]);

const model = { ...toRefs(props) };

// as we're managing state in the parent component passing it as props and
// decouple it when creating the model above, we manually need to react on
// changes of the parent state (no automatic two way binding)
watch(
  () => props,
  (newProps) => {
    model.consumption.value = newProps.consumption;
    model.reduction2023.value = newProps.reduction2023;
  }
);

const rules: FormRules = {
  consumption: {
    type: "number",
    required: true,
  },
  reduction: {
    type: "number",
  },
};
const formRef = ref<FormInst | null>(null);

const showRecommendations = ref(false);

const savingsPercent = computed(
  ():number => (((model.reduction2023.value || 0) * 100) / model.consumption.value)
);

const handleConsumptionChanged = createInputHandler(
  (value: number) => emit("consumptionChanged", value),
  "consumption"
);

const handleReductionChanged = createInputHandler(
  (value: number) => emit("reduction2023Changed", value),
  "reduction"
);

function setSavings(percent: number) {
  showRecommendations.value = false;
  const reduction = (model.consumption.value * percent) / 100;
  emit("reduction2023Changed", reduction);
}
</script>

<template>
  <n-card
    class="calc-basis"
    title="Dein Gasbedarf"
    :bordered="false"
    :content-style="{ padding: '1rem 0 0 0' }"
    :header-style="{ padding: 0 }"
  >
    <n-space vertical>
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        :label-placement="isSmallScreen ? 'top' : 'left'"
        label-width="auto"
        name="Consumption parameters"
        id="consumption-parameters"
        :show-require-mark="false"
      >
        <n-form-item label="Verbrauch im letzten Jahr" path="consumption">
          <n-input-number
            v-model:value="model.consumption.value"
            placeholder="Energiebedarf"
            :min="1"
            :step="1000"
            :validator="validatePositive"
            @change="handleConsumptionChanged"
          >
            <template #suffix>kWh</template></n-input-number
          >
          <Explanation
            display="icon"
            text="Die Zahl kannst du in der letzten Abrechnung 
                  von deinem Gasversorger ablesen. Ein m³ Gas entspricht ca. 10kWh."
          />
        </n-form-item>
        <n-form-item label="Das will ich einsparen" path="reduction">
          <n-input-number
            v-model:value="model.reduction2023.value"
            placeholder="Dein Sparziel für 2023"
            :min="0"
            :max="model.consumption.value"
            :validator="validatePositive"
            :step="100"
            @change="handleReductionChanged"
            autofocus
          >
            <template #suffix>kWh</template>
          </n-input-number>
          <Explanation
            display="icon"
            :text="`Das ist dein persönliches
          Einsparziel. Ideen dazu findest du unter &quot;Wie kann ich sparen?&quot;`"
          />
        </n-form-item>
      </n-form>
      <n-button @click="showRecommendations = true">
        Wie kann ich sparen?
        <template #icon>
          <n-icon>
            <calculator-icon />
          </n-icon>
        </template>
      </n-button>
    </n-space>
  </n-card>

  <RecommendationsModal
    :show="showRecommendations"
    :value="Math.round(savingsPercent)"
    @change="setSavings"
    @close="showRecommendations = false"
  />
</template>

<style scoped>
.n-input-group {
  flex-wrap: wrap;
}
.n-input-group-label {
  min-width: 12rem;
}

label {
  border-color: --var(border-color);
}
</style>

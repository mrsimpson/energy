<script setup lang="ts">
import { validatePositive } from "../lib/Numbers";
import { CalculatorOutline as CalculatorIcon } from "@vicons/ionicons5";
import Explanation from "@/components/ExplanationText.vue";
import RecommendationsModal from "@/components/RecommendationsModal.vue";
import type { FormRules, FormInst } from "naive-ui";
import { isSmallScreen } from "../lib/responsiveness";

const props = defineProps<{
  consumption: number;
  reduction2023?: number;
}>();

const emit = defineEmits(["consumptionChanged", "reduction2023Changed"]);

const showRecommendations = ref(false);

const model = ref({
  consumption: props.consumption,
  reduction: props.reduction2023,
});

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

const savingsPercent = computed(
  () => ((props.reduction2023 || 0) * 100) / props.consumption
);

function setSavings(savingsPercent: number) {
  showRecommendations.value = false;
  model.value.reduction = (props.consumption * savingsPercent) / 100;
  emit("reduction2023Changed", model.value.reduction);
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
            v-model:value="model.consumption"
            placeholder="Energiebedarf"
            :min="1"
            :step="1000"
            :validator="validatePositive"
            :on-input="emit('consumptionChanged', model.consumption)"
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
            v-model:value="model.reduction"
            placeholder="Dein Sparziel für 2023"
            :min="0"
            :max="model.consumption"
            :validator="validatePositive"
            :step="100"
            :on-input="emit('reduction2023Changed', model.reduction)"
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
    :value="savingsPercent"
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

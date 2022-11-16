<script setup lang="ts">
import {
  NButton,
  NIcon,
  NInputNumber,
  NCard,
  NInputGroup,
  NSpace,
  NFormItem,
} from "naive-ui";
import { ref } from "vue";
import { validatePositive } from "../lib/Numbers";
import { CalculatorOutline as CalculatorIcon } from "@vicons/ionicons5";

const props = defineProps<{
  consumption: number;
  reduction2023: number;
}>();

const emit = defineEmits(["consumptionChanged", "reduction2023Changed"]);

const iConsumption = ref(props.consumption);
const iReduction = ref(props.reduction2023);
</script>

<template>
  <n-card
    class="calc-basis"
    title="Mein Energiebedarf"
    :bordered="false"
    :content-style="{ padding: '1rem 0 0 0' }"
    :header-style="{ padding: 0 }"
  >
    <n-input-group>
      <n-form-item label="Bisheriger Verbrauch">
        <n-input-number
          v-model:value="iConsumption"
          :validator="validatePositive"
          :min="1"
          placeholder="Energiebedarf"
          :step="1000"
          :on-input="emit('consumptionChanged', iConsumption)"
        >
          <template #suffix>kWh</template>
        </n-input-number>
      </n-form-item>
    </n-input-group>

    <n-space :vertical="true" />

    <small>
      Die Zahl kannst du in der letzten Abrechnung von deinem Gasversorger ablesen
    </small>

    <n-input-group>
      <n-form-item label="Einsparziel">
        <n-input-number
          v-model:value="iReduction"
          :validator="validatePositive"
          :min="0"
          placeholder="Dein Sparziel für 2023"
          :step="100"
          :on-input="emit('reduction2023Changed', iReduction)"
        >
          <template #suffix>kWh</template>
        </n-input-number>
      </n-form-item>
    </n-input-group>

    <n-space :vertical="true" />

    <small
      >Das ist dein persönliches Einsparziel. Ideen dazu findest du unter "Wie kann ich
      sparen?"
    </small>

    <n-space :vertical="true" />

    <n-button>
      Wie kann ich sparen?
      <template #icon>
        <n-icon>
          <calculator-icon />
        </n-icon>
      </template>
    </n-button>
  </n-card>
</template>

<style scoped>
:v-deep(.n-card > .n-card__content) {
  margin-top: 1rem;
}

small {
  font-size: 11px;
  margin: -1.6rem 0 0.5rem;
  display: block;
}
</style>

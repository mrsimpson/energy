<script setup lang="ts">
import {
  NButton,
  NIcon,
  NInputNumber,
  NCard,
  NInputGroup,
  NInputGroupLabel,
  NSpace,
} from "naive-ui";
import { ref } from "vue";
import { validatePositive } from "../lib/Numbers";
import { CalculatorOutline as CalculatorIcon } from "@vicons/ionicons5";
import Explanation from "@/components/ExplanationText.vue";

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
    <n-space>
      <div>
        <n-input-group>
          <n-input-group-label>Verbrauch im letzten Jahr</n-input-group-label>
          <n-input-number
            v-model:value="iConsumption"
            :validator="validatePositive"
            :min="1"
            placeholder="Energiebedarf"
            :step="1000"
            :on-input="emit('consumptionChanged', iConsumption)"
          >
            <template #suffix>kWh</template></n-input-number
          >
        </n-input-group>
        <Explanation
          display="inline"
          text="Die Zahl kannst du in der letzten Abrechnung von deinem Gasversorger ablesen"
        />
      </div>
      <div>
        <n-input-group>
          <n-input-group-label>Das will ich einsparen</n-input-group-label>
          <n-space>
            <n-input-number
              v-model:value="iReduction"
              :validator="validatePositive"
              :min="0"
              placeholder="Dein Sparziel für 2023"
              :step="100"
              :on-input="emit('reduction2023Changed', iReduction)"
            >
              <template #suffix>kWh</template></n-input-number
            >
            <n-button>
              Wie kann ich sparen?
              <template #icon>
                <n-icon>
                  <calculator-icon />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </n-input-group>
        <Explanation display="inline" :text='`Das ist dein persönliches
        Einsparziel. Ideen dazu findest du unter "Wie kann ich sparen?"`' />
      </div>
    </n-space>
  </n-card>
</template>

<style scoped>
.n-input-group-label {
  min-width: 12rem;
}
</style>

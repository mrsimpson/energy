<script setup lang="ts">
import { NButton, NModal, NSlider } from "naive-ui";
import { ref } from "vue";

const props = defineProps<{ show: boolean; value: number }>();
const emit = defineEmits(["close", "change", "update:modelValue"]);

const sliderValue = ref(props.value);
</script>

<template>
  <n-modal
    :show="show"
    title="Einsparmöglichkeiten"
    preset="dialog"
    @close="emit('close')"
  >
    <ul>
      <li>
        Reduziere die Raumtemperatur um 1°. Das spart laut Umwelt-Bundesamt ca. 6% Gas.
        Reduzierst du um 2° oder 3° sparst du entsprechend mehr.
      </li>
      <li>
        Wenn du nur halb so viel duschst, sparst du warmes Wasser, das dann natürlich auch
        nicht aufgeheizt werden muss und damit kein Gas verbraucht.
      </li>
      <li>
        Du hast einen Gasherd? Du könntest ihn beim Nudeln oder Reis kochen nach 2min
        ausschalten.
      </li>
    </ul>

    <p>Ich versuche, die folgende Einsparung zu erreichen:</p>
    <div class="wrapper">
      <n-slider v-model:value="sliderValue" :step="1" :tooltip="false" />
      <span class="currentValue">{{ sliderValue }}%</span>
      <NButton @click="emit('change', sliderValue)">Übernehmen</NButton>
    </div>
  </n-modal>
</template>

<style scoped>
.n-modal {
  max-width: 600px;
}

.wrapper {
  display: flex;
  align-items: center;
}

.currentValue {
  width: 5rem;
  padding: 0 0.5rem;
  text-align: right;
}
</style>

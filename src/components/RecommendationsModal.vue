<script setup lang="ts">
import { useSettingsStore } from "@/SettingsStore";

defineProps<{ show: boolean }>();
const emit = defineEmits(["close"]);

const store = useSettingsStore();

const sliderValue = ref(
  Math.round(((store.reduction2023 || 0) * 100) / store.consumption)
);

function setSavings() {
  store.setReduction2023((store.consumption * sliderValue.value) / 100);
  emit("close");
}
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
      <li>
        <a
          href="https://www.energiewechsel.de/KAENEF/Navigation/DE/Thema/energiespartipps.html"
        >
          Noch mehr Ideen zum sparen
        </a>
      </li>
    </ul>

    <p>Ich versuche, die folgende Einsparung zu erreichen:</p>
    <div class="wrapper">
      <n-slider v-model:value="sliderValue" :step="1" :tooltip="false" :max="50" />
      <span class="currentValue">{{ sliderValue }}%</span>
      <NButton @click="setSavings">Übernehmen</NButton>
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

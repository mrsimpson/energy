<script setup lang="ts">
import { useSettingsStore } from "@/SettingsStore";
import { NButton, NModal, NSlider } from "naive-ui";
import { ref } from "vue";

defineProps<{
  show: boolean;
  recommendations: string[];
}>();

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
      <li v-for="(recommendation, index) in recommendations" :key="index">
        {{ recommendation }}
      </li>
    </ul>

    <a
      href="https://www.energiewechsel.de/KAENEF/Navigation/DE/Thema/energiespartipps.html"
      target="_blank"
    >
      Noch mehr Ideen zum sparen
    </a>

    <p>Ich versuche, die folgende Einsparung zu erreichen:</p>
    <div class="wrapper">
      <n-slider v-model:value="sliderValue" :step="1" :tooltip="false" :max="50" />
      <span class="currentValue">{{ sliderValue }}%</span>
      <NButton @click="setSavings">Übernehmen</NButton>
    </div>

    <p>
      Die Vorschläge passen nicht zu deinen Lebensumständen? Wir gehen von bestimmten
      Annahmen aus, die du
      <RouterLink :to="{ name: 'settings' }">hier anpassen</RouterLink> kannst.
    </p>
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

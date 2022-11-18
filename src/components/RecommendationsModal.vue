import { NButton } from 'naive-ui';
<script setup lang="ts">
import { NButton, NCard, NModal } from "naive-ui";

defineProps<{ show: boolean }>();
const emit = defineEmits(["close"]);
</script>

<template>
  <n-modal
    :show="show"
    title="Einsparmöglichkeiten"
    preset="dialog"
    @close="emit('close')"
  >
    <n-card preset="dialog" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <ul>
        <li>
          Reduziere die Raumtemperatur um 1°. Das spart laut Umwelt-Bundesamt ca. 6% Gas.
          Reduzierst du um 2° oder 3° sparst du entsprechend mehr.
        </li>
        <li>
          Wenn du nur halb so viel duschst, sparst du warmes Wasser, das dann natürlich
          auch nicht aufgeheizt werden muss und damit kein Gas verbraucht.
        </li>
        <li>
          Du hast einen Gasherd? Du könntest ihn beim Nudeln oder Reis kochen nach 2min
          ausschalten.
        </li>
      </ul>
    </n-card>

    <template #footer>
      <n-button @click="emit('close')">Ok</n-button>
    </template>
  </n-modal>
</template>

<style scoped>
.n-modal {
  max-width: 600px;
}
</style>

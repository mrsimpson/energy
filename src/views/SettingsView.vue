<script setup lang="ts">
import { settings, saveSettings } from "../Settings";
import { Save } from "@vicons/ionicons5";
import {
  NButton,
  NCard,
  NCollapse,
  NCollapseItem,
  NForm,
  NFormItem,
  NIcon,
  NInputNumber,
  NSelect,
  NSwitch,
} from "naive-ui";
import { useRouter } from "vue-router";
import { validatePositive } from "../lib/Numbers";

const router = useRouter();

const houseCategoryOptions = [
  { label: "Baujahr vor 1980", value: 300 },
  { label: "Baujahr vor 1995", value: 140 },
  { label: "Baujahr bis 2008", value: 100 },
  { label: "Niedrigenergiehaus (ab 2009)", value: 70 },
  { label: "3L Haus", value: 30 },
  { label: "Passivhaus", value: 15 },
];

const cookingsPerWeekOptions = [
  { value: 0, label: "praktisch gar nicht" },
  { value: 3, label: "max. 3x pro Woche" },
  { value: 7, label: "praktisch täglich" },
  { value: 14, label: "mehrmals täglich" },
];

const showersPerWeekOptions = [
  { value: 0, label: "ich wasche mich mit dem Waschlappen" },
  { value: 2, label: "bis zu zwei Mal pro Woche" },
  { value: 5, label: "bis zu fünf Mal pro Woche" },
  { value: 7, label: "bis zu sieben Mal pro Woche" },
  { value: 14, label: "mehrmals täglich" },
];

const bathsPerWeekOptions = [
  { value: 0, label: "praktisch gar nicht" },
  { value: 1, label: "ein Mal pro Woche" },
  { value: 2, label: "zwei Mal pro Woche" },
  { value: 5, label: "öfter als 2x pro Woche" },
];

function save() {
  saveSettings();
  router.push({ name: "calculator" });
}
</script>

<template>
  <n-card class="settings" :bordered="false">
    <h1>Lebensumstände</h1>

    <p>
      Deine persönlichen Lebensumstände machen einen großen Unterschied in Bezug auf
      deinen Gasverbrauch. Daher kannst du mit der Beantwortung einiger Fragen die
      Berechnung deiner Kosten genauer machen.
    </p>

    <p>
      Deine Daten werden nur in dem Gerät gespeichert, das du gerade verwendest und
      nirgendwohin übertragen. Wundere dich also nicht, wenn du sie erneut eintragen
      musst, wenn du z.B. vom Smartphone auf ein Notebook wechselst.
    </p>

    <n-card>
      <n-form label-placement="left">
        <n-collapse default-expanded-names="1" accordion>
          <n-collapse-item title="Anzahl der Personen im Haushalt" name="1">
            <n-input-number
              v-model:value="settings.numPersons"
              placeholder="Anzahl Personen im Haushalt"
              :validator="validatePositive"
              :min="1"
              :max="99"
              :style="{ width: '100px' }"
            />
          </n-collapse-item>
          <n-collapse-item title="Heizen" name="2">
            <n-form-item label="Ich heize mit Gas">
              <n-switch v-model:value="settings.heatWithGas" />
            </n-form-item>

            <n-form-item label="Wohnfläche (ungefähr)">
              <n-input-number
                v-model:value="settings.livingSpace"
                placeholder="Wohnfläche (ungefähr)"
                :validator="validatePositive"
                :min="10"
                :max="999"
                :step="10"
                :style="{ width: '130px' }"
              >
                <template #suffix>qm</template>
              </n-input-number>
            </n-form-item>

            <n-form-item label="Hauskategorie">
              <n-select
                v-model:value="settings.houseCategory"
                :options="houseCategoryOptions"
                :style="{ width: '250px' }"
              />
            </n-form-item>
          </n-collapse-item>

          <n-collapse-item title="Kochen" name="3">
            <n-form-item label="Ich verwende einen Gasherd">
              <n-switch v-model:value="settings.cookWithGas" />
            </n-form-item>

            <n-form-item label="Ich koche" v-if="settings.cookWithGas">
              <n-select
                v-model:value="settings.cookingsPerWeek"
                :options="cookingsPerWeekOptions"
              />
            </n-form-item>
          </n-collapse-item>

          <n-collapse-item title="Baden / Duschen" name="4">
            <n-form-item label="Mein Wasser wird mit Gas erwärmt">
              <n-switch v-model:value="settings.waterWarmingWithGas" />
            </n-form-item>

            <n-form-item label="Ich dusche">
              <n-select
                v-model:value="settings.showersPerWeek"
                :options="showersPerWeekOptions"
                :style="{ width: '250px' }"
              />

              <n-input-number
                v-if="settings.showersPerWeek !== 0"
                v-model:value="settings.showersDuration"
                placeholder="Minuten lang"
                :validator="validatePositive"
                :min="1"
                :max="99"
                :style="{ width: '130px' }"
              >
                <template #prefix>ø</template>
                <template #suffix>min</template>
              </n-input-number>
            </n-form-item>

            <n-form-item label="Ich bade">
              <n-select
                v-model:value="settings.bathsPerWeek"
                :options="bathsPerWeekOptions"
                :style="{ width: '250px' }"
              />
            </n-form-item>
          </n-collapse-item>
        </n-collapse>
      </n-form>
    </n-card>

    <n-button @click="save">
      <n-icon :style="{ padding: '4px' }">
        <Save />
      </n-icon>
      Speichern
    </n-button>
  </n-card>
</template>

<style scoped>
.n-switch {
  margin-right: 0.5rem;
}

button {
  margin-top: 0.5rem;
}
</style>

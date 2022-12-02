import { defineStore } from "pinia";
import { useLocalStorage } from '@vueuse/core'

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    consumption: useLocalStorage('pinia/settings/consumption', 15000),
    reduction2023: useLocalStorage('pinia/settings/reduction2023', 0 as number | undefined),
  }),

  actions: {
    setConsumption(consumption: number) {
      this.consumption = consumption;
    },

    setReduction2023(reduction: number) {
      this.reduction2023 = reduction;
    },
  },
});

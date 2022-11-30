import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    consumption: 15000,
    reduction2023: undefined as number | undefined,
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

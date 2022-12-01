import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  persist: true,

  state: () => ({
    consumption: 15000,
    reduction2023: undefined as number | undefined,
    numPersons: 2,
    heatWithGas: true,
    livingSpace: 50,
    houseCategory: 140,
    cookWithGas: true,
    cookingsPerWeek: 7,
    waterWarmingWithGas: true,
    showersPerWeek: 7,
    showersDuration: 10,
    bathsPerWeek: 1,
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

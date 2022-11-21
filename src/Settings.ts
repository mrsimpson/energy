import { ref } from "vue";

type Settings = {
  gasConsumption: number;
  numPersons: number;
  heatWithGas: boolean;
  livingSpace: number;
  houseCategory: number;
  cookWithGas: boolean;
  cookingsPerWeek: number;
  waterWarmingWithGas: boolean;
  showersPerWeek: number;
  showersDuration: number;
  bathsPerWeek: number;
};

const savedSettings = localStorage.getItem("settings");
const defaultValues = {
  gasConsumption: 15000,
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
};

export const settings = ref<Settings>(
  Object.assign(
    {},
    defaultValues,
    savedSettings ? JSON.parse(savedSettings) : {}
  )
);

export function saveSettings() {
  localStorage.setItem("settings", JSON.stringify(settings.value));
}

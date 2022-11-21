import { settings } from "./Settings";
import { computed } from "vue";

const flowRate = 12; // Sparduschköpfe: eher 6L/min
const supplyTemp = 60; // Vorlauftemperatur
const showerTemp = 37;
const coldWaterTemp = 10;
const kWhPerLiter = 4.182 / 3.6; // Wärmekapazität Wasser [kJ] -> kWh
const heatingRate = (showerTemp - coldWaterTemp) / (supplyTemp - coldWaterTemp);
const kwhPerShowerMinute = flowRate * heatingRate * kWhPerLiter;

const energyConsumptionForWaterHeating = computed(() => {
  const waterWarmingPercent =
    100 - 44.0457 * Math.pow(settings.value.houseCategory, 0.125282);
  return (settings.value.gasConsumption * waterWarmingPercent) / 100;
});

const energySavingsWithOnly1showerPerWeek = computed(() => {
  return (
    (settings.value.showersPerWeek - 1) *
    settings.value.showersDuration *
    kwhPerShowerMinute *
    settings.value.numPersons
  );
});

const energySavingsWithOnly5minShowers = computed(() => {
  return (
    settings.value.showersPerWeek *
    (settings.value.showersDuration - 5) *
    kwhPerShowerMinute *
    settings.value.numPersons
  );
});

export const savingPercents = {
  lessShowers() {
    return (
      (energySavingsWithOnly1showerPerWeek.value * 52) /
      energyConsumptionForWaterHeating.value
    );
  },
  shorterShowers() {
    return (
      (energySavingsWithOnly5minShowers.value * 52) /
      energyConsumptionForWaterHeating.value
    );
  },
};

export function personalize(text: string) {
  return text.replace(/\{(.*?)\}/g, (_, m) => {
    const f = savingPercents[m as keyof typeof savingPercents];
    return f ? Math.round(f() * 10) / 10 : m;
  });
}

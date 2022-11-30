import { computed } from "vue";
import { personalize } from "./Savings";
import { useSettingsStore } from './SettingsStore';

const store = useSettingsStore()

type Recommendation = {
  title: string;
  condition: () => boolean;
};

const allRecommendations: Recommendation[] = [
  {
    title: `Reduziere die Raumtemperatur. Das spart laut Umwelt-Bundesamt ca. 6% Gas pro Grad.`,
    condition: () => true,
  },
  {
    title: `Verringere die Vorlauftemperatur der Warmwasserspeichers. 50°C reichen aus.
      Nur nach längerer Abwesenheit (z.B. Urlaub) solltest du kurzzeitig mal auf 70°C
      erhöhen, um Bakterien zu vermeiden`,
    condition: () => store.waterWarmingWithGas,
  },
  {
    title: `Weniger oft duschen spart warmes Wasser und somit Gas.
      Wenn jeder im Haushalt nur noch 1x pro Woche duscht, sparst du {lessShowers}% Gas`,
    condition: () =>
      store.waterWarmingWithGas && store.showersPerWeek > 1,
  },
  {
    title: `Kürzer (max. 5min) duschen, spart warmes Wasser und somit Gas.
      Z.B. indem man während des Einseifens das Wasser abdreht.
      Du würdest dadurch ca. {shorterShowers}% Gas sparen`,
    condition: () =>
      store.waterWarmingWithGas && store.showersDuration > 5,
  },
  {
    title: `Statt baden reicht auch duschen, das spart viel warmes Wasser und damit Gas.`,
    // @TODO: how much?
    condition: () =>
      store.waterWarmingWithGas && store.bathsPerWeek > 0,
  },
  {
    title: `Du kannst deinen Gasherd beim Nudeln oder Reis kochen nach 2min Kochzeit ausschalten.
      Danach lässt du es weiter ziehen, bis die Nudeln bzw. der Reis weich ist.
      Das kann bis zu einem Prozent Gas einsparen.`,
    // @TODO really? We need a source for that
    condition: () => store.cookWithGas,
  },
];

export const recommendations = computed(() =>
  allRecommendations
    .filter((recommendation) => recommendation.condition())
    .map((recommendation) => personalize(recommendation.title))
);

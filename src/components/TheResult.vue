<script setup lang="ts">
import ResultCharts from "./ResultCharts.vue";
import { NCard } from "naive-ui";

defineProps<{
    years: number[]
    bills: number[]
    savings: number[]
    reductions: number[]
}>()

function euros(amount: number) {
    return (amount || 0).toFixed(2) + "€"
}
</script>

<template>
    <n-card class="savings" style="min-width: 40rem">
        <p>Du sparst</p>
        <p style="font-size: 3rem">
            {{ euros(savings[savings.length - 1]) }}
        </p>
        <p>
            Durch Deine Einsparung von {{ reductions[reductions.length - 1] }}kWh reduzierst Du
            nicht nur Emissionen, ,sondern sparst auch richtig Geld!
        </p>
    </n-card>

    <n-card>
        <p>
            Wie sich Deine Kosten entwickelt haben bzw. entwickeln können,
            siehst Du im folgenden Diagramm.
        </p>
        <p>
            Wir zeigen Dir hier an, in welchem Jahr Dein Verbrauch welche Kosten verursachen würde.
            Keine Sorge: Zahlen musst Du nur den Eigenanteil.
        </p>
        <ResultCharts :years="years"
            :bills="bills"
            :reductions="reductions"
            :savings="savings" />
        <p>
            Beachte dennoch: Die staatlichen Förderungen sind nur für 2023 garantiert.
            Was 2024 kommt, weiß noch niemand – nur dass das, was Du nicht verbrauchst
            ganz sicher Deine Kosten senkt!
        </p>
    </n-card>
</template>
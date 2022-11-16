<script setup lang="ts">
import { NCard, NButton, NIcon, NSpace } from "naive-ui";
import { CalculatorOutline as CalculatorIcon } from "@vicons/ionicons5";
</script>

<template>
  <n-card
    class="intro"
    title="Was kostet mich Gas jetzt und im nächsten Jahr?"
    :bordered="false"
  >
    <n-space>
      <p>
        Gas wird teurer oder ist es schon. Mit der nur jährlichen Abrechnung kommt die
        böse Überraschung oft erst spät. Höhere Beiträge, aber auch Nachzahlungen schmerzen.
      </p>

      <p>
        Die Regierung hat Hilfe versprochen, übernimmt eine Monatsrate und deckelt später
        auch den Preis.
      </p>

      <p>
        Aber was kommt am Ende raus? Was muss ich tatsächlich bezahlen, wie viel übernimmt
        der Staat wirklich und wie viel kann ich einsparen?
      </p>

      <p>
        Unser Gas-Rechner beantwortet deine Fragen und erklärt dir was es bringt, weniger zu
        duschen, effizienter zu kochen oder die Heizung ein Grad runter zu drehen.
      </p>

      <RouterLink to="calculator">
        <n-button>
          Hier geht's zum Gas-Rechner
          <template #icon>
            <n-icon>
              <calculator-icon />
            </n-icon>
          </template>
        </n-button>
      </RouterLink>
    </n-space>
  </n-card>
</template>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { NCard, NButton, NIcon, NSpace } from "naive-ui";
import { CalculatorOutline as CalculatorIcon } from "@vicons/ionicons5";
import Quote from '@/components/TextQuote.vue'

</script>

<template>
  <n-card
    class="intro"
    title="Was kostet mich Gas jetzt und im nächsten Jahr?"
    :bordered="false"
  >
    <n-space>
      <Quote 
        text="Jede Kilowattstunde, die ihr spart, lohnt sich. 
              Ihr spart jedes Mal den aktuellen Preis. 
              Ihr bekommt dann einen Zuschuss, wahrscheinlich monatlich, 
              der nichts mit eurem aktuellen Verbrauch zu tun hat. 
              Und der Zuschuss, der sinkt auch nicht, wenn ihr spart. Sparen lohnt sich also. 
              Ich glaube, das ist die Bottom Line."
        origin="Philip Banse, Podcast Lage der Nation vom 9. November 2022" />
      <p>
        Gas wird teurer oder ist es schon. Mit der jährlichen Abrechnung kommt die
        böse Überraschung oft erst spät. Höhere Beiträge, aber auch Nachzahlungen schmerzen.
      </p>

      <p>
        Die Regierung hat Hilfe versprochen, übernimmt eine Monatsrate und deckelt später
        auch den Preis.
      </p>

      <p>
        Aber was kommt am Ende raus? Was muss ich tatsächlich bezahlen, wie viel übernimmt
        der Staat wirklich und wie viel kann ich einsparen?
        Unser Gas-Rechner beantwortet deine Fragen und erklärt dir, was es bringt, weniger zu
        duschen, effizienter zu kochen oder die Heizung ein Grad runter zu drehen.
      </p>

      <RouterLink to="calculator" :custom="true" v-slot="{ navigate }">
        <n-button @click="navigate" size="large">
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

<script setup lang="ts">
import { NIcon, NTooltip, NButton } from "naive-ui";
import { InformationCircleOutline as InformationIcon } from "@vicons/ionicons5";

type displayType = "inline" | "icon";

defineProps<{
  text: String;
  display: displayType;
}>();
</script>

<template>
  <n-tooltip trigger="hover" v-if="display === 'icon'">
    <template #trigger>
      <n-button text>
        <template #icon>
          <n-icon size="1.5rem" :style="{ padding: '4px' }">
            <InformationIcon />
          </n-icon>
        </template>
      </n-button>
    </template>
    {{ text }}</n-tooltip
  >
  <small class="inlined" v-if="display === 'inline'">{{ text }}</small>
</template>

<style scoped>
  .inlined {
    font-style: italic;
  }
</style>
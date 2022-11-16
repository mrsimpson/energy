<script setup lang="ts">
import { NIcon, NTooltip, NButton } from "naive-ui";
import { InformationCircleOutline as InformationIcon } from "@vicons/ionicons5";

defineProps<{
  text: string;
}>();
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button text>
        <template #icon>
          <n-icon size="1.5rem" :style="{padding: '4px'}">
            <InformationIcon />
          </n-icon>
        </template>
      </n-button>
    </template>
    {{ text }}</n-tooltip
  >
</template>
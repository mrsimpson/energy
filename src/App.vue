<template>
  <n-space vertical>
    <n-space>
      <n-button @click="theme = darkTheme">Dark</n-button>
      <n-button @click="theme = null">Light</n-button>
    </n-space>
    <n-config-provider :theme="theme">
      <RouterView />
    </n-config-provider>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NButton, NConfigProvider, NSpace, darkTheme, type GlobalTheme } from 'naive-ui';

const theme = ref(null as GlobalTheme | null);
</script>

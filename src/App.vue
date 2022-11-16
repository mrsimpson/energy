<script setup lang="ts">
import { ref } from "vue";
import {
  NConfigProvider,
  NGlobalStyle,
  NThemeEditor,
  type GlobalTheme, GlobalThemeOverrides,
} from "naive-ui";

// const osThemeRef = useOsTheme()
//const theme = ref((osThemeRef.value === 'dark' ? darkTheme : null) as GlobalTheme | null)
const theme = ref(null as GlobalTheme | null);

const themeOverrides: GlobalThemeOverrides = {
    common: {
      primaryColor: '#f00000'
    },
  }
</script>

<template>
  <n-theme-editor>
    <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
      <RouterView />
      <n-global-style />
    </n-config-provider>
  </n-theme-editor>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  NCard,
  NConfigProvider,
  NThemeEditor,
  NLayout,
  NLayoutContent,
  type GlobalTheme, GlobalThemeOverrides,
} from "naive-ui";

// const osThemeRef = useOsTheme()
//const theme = ref((osThemeRef.value === 'dark' ? darkTheme : null) as GlobalTheme | null)
const theme = ref(null as GlobalTheme | null);

const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontSize: "16px",
    primaryColor: "#00AAE8FF",
    primaryColorHover: "#00BBFFFF",
    primaryColorPressed: "#0B5976FF",
    primaryColorSuppl: "#338FB1FF"
  }
}
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-theme-editor>
      <n-layout>
        <n-layout-content>
          <n-card centered>
            <RouterView />
          </n-card>
        </n-layout-content>
      </n-layout>
    </n-theme-editor>
  </n-config-provider>
</template>

<style scoped>
.n-layout {
  max-width: 1024px;
  margin: auto;
}
</style>

<!-- Global styles -->
<style>
a {
  color: var(--primary-color);
  cursor: pointer;
  color: var(--primary-color);
}
</style>
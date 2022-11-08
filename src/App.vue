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

<script lang="ts">
import { defineComponent, ref } from "vue";
import { darkTheme, NButton, NConfigProvider, NCard, NEl, NSpace } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
import type { Ref } from "vue";

type SetupReturn = {
  darkTheme: GlobalTheme;
  theme: Ref<GlobalTheme | null>;
};

export default defineComponent({
  components: {
    NButton,
    NConfigProvider,
    NSpace
  },
  setup() {
    return {
      darkTheme,
      theme: ref(null),
    } as SetupReturn;
  },
});
</script>

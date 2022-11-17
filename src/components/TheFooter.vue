<script setup lang="ts">
import { NMenu, type MenuOption } from "naive-ui";
import { h, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import renderIcon from '@/lib/renderIcon'

import ParagraphIcon from '@/components/icons/ParagraphIcon.vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'

const route = useRoute()
const activeKey = ref<string | undefined>("")
watch(() => route.name, (name) => {activeKey.value = name?.toString()})

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'imprint',
          }
        },
        { default: () => 'Impressum' }
      ),
    key: 'imprint',
    icon: renderIcon(ParagraphIcon)
  },
  {
    label: () =>
      h(
        'a',
        {
          href: "https://github.com/mrsimpson/energy/",
          target: "_blank"
        },
        { default: () => 'Github' }
      ),
    key: 'imprint',
    icon: renderIcon(GithubIcon)
  },
]
</script>


<template>
  <n-menu
    v-model:value="activeKey"
    mode="horizontal"
    :options="menuOptions"
    :icon-size="16"
    style="font-size: small; margin: auto; align-items: center"
  />
</template>
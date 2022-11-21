<script setup lang="ts">
import type { MenuOption } from "naive-ui";
import { RouterLink, useRoute } from "vue-router";
import renderIcon from '@/lib/renderIcon'
import Flame from '@/components/icons/FlameIcon.vue'

import { CalculatorOutline as CalculatorIcon, SettingsOutline } from "@vicons/ionicons5";

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
            name: 'intro',
          }
        },
        { default: () => 'Einführung' }
      ),
    key: 'intro',
    icon: () => h(Flame)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'calculator',
          }
        },
        { default: () => 'Rechner' }
      ),
    key: 'calculator',
    icon: renderIcon(CalculatorIcon)
  },
  {
    label: () => h(RouterLink, { to: { name: "settings" } }, { default: () => 'Personalisieren' }),
    key: "settings",
    icon: renderIcon(SettingsOutline)
  },

//   {
//     key: 'divider-1',
//     type: 'divider',
//     props: {
//       style: {
//         marginLeft: '32px'
//       }
//     }
//   },

// {
//     label: () =>
//       h(
//         'a',
//         {
//           href: 'https://en.wikipedia.org/wiki/Hear_the_Wind_Sing',
//           target: '_blank',
//           rel: 'noopenner noreferrer'
//         },
//         'Hear the Wind Sing'
//       ),
//     key: 'hear-the-wind-sing',
//     icon: renderIcon(BookIcon)
//   },
//   {
//     label: 'Pinball 1973',
//     key: 'pinball-1973',
//     icon: renderIcon(BookIcon),
//     disabled: true,
//     children: [
//       {
//         label: 'Rat',
//         key: 'rat'
//       }
//     ]
//   },
//   {
//     label: 'A Wild Sheep Chase',
//     key: 'a-wild-sheep-chase',
//     disabled: true,
//     icon: renderIcon(BookIcon)
//   },
//   {
//     label: 'Dance Dance Dance',
//     key: 'Dance Dance Dance',
//     icon: renderIcon(BookIcon),
//     children: [
//       {
//         type: 'group',
//         label: 'People',
//         key: 'people',
//         children: [
//           {
//             label: 'Narrator',
//             key: 'narrator',
//             icon: renderIcon(PersonIcon)
//           },
//           {
//             label: 'Sheep Man',
//             key: 'sheep-man',
//             icon: renderIcon(PersonIcon)
//           }
//         ]
//       },
//       {
//         label: 'Beverage',
//         key: 'beverage',
//         icon: renderIcon(WineIcon),
//         children: [
//           {
//             label: 'Whisky',
//             key: 'whisky'
//           }
//         ]
//       },
//       {
//         label: 'Food',
//         key: 'food',
//         children: [
//           {
//             label: 'Sandwich',
//             key: 'sandwich'
//           }
//         ]
//       },
//       {
//         label: 'The past increases. The future recedes.',
//         key: 'the-past-increases-the-future-recedes'
//       }
//     ]
//   }
]
</script>

<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>

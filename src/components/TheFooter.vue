<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="menu-bar">
    <RouterLink :to="{ name: 'imprint' }">
      <img src="@/assets/ParagraphIcon.svg" alt="paragraph-icon"/>
      Impressum
    </RouterLink>

    <a href="https://github.com/mrsimpson/energy/" target="_blank">
      <img src="@/assets/GitHubIcon.svg" alt="github-icon"/>
      GitHub
    </a>
  </div>
</template>

<style scoped>
.menu-bar {
  display: flex;
  align-items: center;
}

.menu-bar > * {
  padding: 0 1rem;
  line-height: 3;
  position: relative;
}

.menu-bar > *:hover {
  filter: brightness(0) saturate(100%) invert(68%) sepia(45%) saturate(6457%)
    hue-rotate(163deg) brightness(105%) contrast(103%);
  transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

a {
  text-decoration: none;
}

img {
  height: 16px;
  position: relative;
  top: 3px;
  margin-right: 5px;
}
</style>

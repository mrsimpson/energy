<script setup lang="ts">
defineProps<{
  text: string;
  origin?: string;
}>();
</script>

<template>
  <div :style="{ 
    backgroundColor: 'var(--n-color-embedded)', 
    margin: '1rem 2rem 0rem',
    padding: '0.8rem',
    maxWidth: '40rem'
    }">
    <p class="quoted-text">{{ text }}</p>
    <p v-if="!!origin" class="origin">{{ origin }}</p>
  </div>
</template>

<style scoped>
.quoted-text {
  font-style: italic;
  font-size: 1.2rem;
  margin-block-end: 0.2rem;
}
.quoted-text::before,
.quoted-text::after {
  content: '"';
}

.origin {
    font-size: 0.8rem;
    margin-top: 0.2rem;
    text-align: right;
}
</style>
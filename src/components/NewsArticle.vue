{{}}
<script setup lang="ts">
const props = defineProps<{
  author: string;
  title: string;
  description: string;
  source: string;
}>();
</script>

<template>
  <article class="article">
    <header class="article__header">
      <h3 class="article__title">{{ props.title }}</h3>
      <p class="article__author">By: {{ props.author }}</p>
    </header>
    <section class="article__content">
      <p class="article__description">{{ props.description }}</p>
    </section>
    <footer>
      <a class="article__source" :href="props.source">Original article</a>
    </footer>
  </article>
</template>

<style scoped lang="scss"></style>

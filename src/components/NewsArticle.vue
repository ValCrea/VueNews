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
  <article>
    <header>
      <h3>{{ props.title }}</h3>
      <p>By: {{ props.author }}</p>
    </header>
    <section>
      <p>{{ props.description }}</p>
    </section>
    <footer>
      <a :href="props.source">Original article</a>
    </footer>
  </article>
</template>

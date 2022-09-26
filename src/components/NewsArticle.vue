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
    <footer class="article__footer">
      <a class="article__source" :href="props.source">Original article</a>
    </footer>
  </article>
</template>

<style scoped lang="scss">
.article {
  display: flex;
  flex-direction: column;

  &__header {
    padding: 0.5rem;
    padding-inline: 2rem;

    display: flex;
    flex-direction: row wrap;
    align-items: baseline;
    justify-content: space-between;

    background-color: $yellow;
    border-radius: 9999em 9999em 0 0;
  }

  &__title {
    font-size: 1.25rem;
  }

  &__author {
    font-style: italic;
  }

  &__content {
    padding: 1rem 0.25rem;
    text-indent: 1rem;

    background-color: $white;
    border-inline: 1.5rem solid $yellow;
  }

  &__description {
    font-size: 1.1rem;
  }

  &__footer {
    width: 100%;
    padding: 0.3rem;

    text-align: center;

    background-color: $yellow;
    border-radius: 0 0 9999em 9999em;
  }

  &__source {
    text-decoration: none;
    color: black;

    &:hover {
      color: $red;
      text-decoration: underline;
    }
  }
}
</style>

<script setup lang="ts">
import { useNewsStatic } from "@/api/news";
import NewsArticle from "./components/NewsArticle.vue";

const { isLoading, isError, data, error } = useNewsStatic();
</script>

<template>
  <div>
    <header class="header">
      <input class="header__search" type="text" />
    </header>
    <main class="news">
      <p v-if="isLoading" class="news__loading">Loading...</p>
      <p v-else-if="isError" class="news__error">{{ error }}</p>
      <div v-else class="news__articles">
        <p class="news__count">Total resoults: {{ data.totalResults }}</p>
        <template v-for="article in data.articles" :key="article.source.id">
          <NewsArticle
            :author="article.author"
            :title="article.title"
            :description="article.description"
            :source="article.url"
          />
        </template>
      </div>
    </main>
    <footer class="source"></footer>
  </div>
</template>

<style scoped lang="scss"></style>

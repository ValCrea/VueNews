<script setup lang="ts">
import { ref, computed, watch } from "vue";
import debounce from "lodash/debounce";
import { useNewsStatic } from "@/api/news";
import NewsArticle from "./components/NewsArticle.vue";

const searchQuery = ref("");
const enabled = ref(false);
const { isFetching, isError, isIdle, data, error, refetch } = useNewsStatic(
  searchQuery,
  {
    enabled,
  }
);

watch(searchQuery, () => {
  enabled.value = !!searchQuery.value;
  if (searchQuery.value) debounce(refetch.value, 1000)();
  else debounce(refetch.value, 1000).cancel();
});
</script>

<template>
  <div>
    {{ enabled }}
    <header class="header">
      <input v-model="searchQuery" class="header__search" type="text" />
    </header>
    <main class="news">
      <p v-if="isIdle">Search for article</p>
      <p v-else-if="isFetching" class="news__loading">Loading...</p>
      <p v-else-if="isError" class="news__error">{{ error }}</p>
      <div v-else class="news__articles">
        <p class="news__count">Total resoults: {{ data.totalResults }}</p>
        <template
          v-for="article in data.articles"
          :key="article.source.id ? article.source.id : article.source.name"
        >
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

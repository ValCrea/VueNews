<script setup lang="ts">
import { ref, watch } from "vue";
import debounce from "lodash/debounce";
import { useNewsStatic } from "@/api/news";
import NewsArticle from "./components/NewsArticle.vue";

const searchQuery = ref("");
const { isFetching, isError, isIdle, data, error, refetch } = useNewsStatic(
  searchQuery,
  {
    enabled: false,
  }
);

const refetchDebounce = debounce(refetch.value, 1000);
watch(searchQuery, () => {
  if (searchQuery.value) refetchDebounce();
  else refetchDebounce.cancel();
});

const searchBar = ref();
</script>

<template>
  <div class="flex-container">
    <header class="header">
      <input
        v-model="searchQuery"
        ref="searchBar"
        class="header__search"
        placeholder="Search"
        type="text"
      />
    </header>
    <main class="news">
      <p v-if="isIdle" @click="searchBar.focus()" class="news__idle">
        Search for articles
      </p>
      <section v-else-if="isFetching" class="news__fetching">
        Loading
        <p>.</p>
        <p>.</p>
        <p>.</p>
      </section>
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
    <footer class="source">
      <a class="source__url" href="https://newsapi.org">Original Api</a>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.flex-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  padding: 1rem;

  z-index: 1;
  display: flex;
  background-color: $yellow;

  &__search {
    width: 50%;
    max-width: 25rem;

    padding: 0.5rem 1rem;
    margin-inline: auto;

    font-size: 1.25rem;
    color: $black;
    background-color: $white;

    border: solid 0.25rem $orange;
    border-radius: 9999rem 9999rem 9999rem 9999rem;

    &:focus {
      outline: none;
      border-color: $red;
    }
  }
}

.news {
  padding: 1rem;
  flex: 1;
  background-color: $orange;

  &__top {
    font-size: 2rem;
    text-align: center;
  }

  &__idle {
    @extend .news__top;
    cursor: pointer;

    &:hover {
      @include stroke($yellow, 0.15rem);
    }
  }
  &__fetching {
    @extend .news__top;

    > *:nth-child(n) {
      display: inline-block;
      animation: 0.5s infinite alternate updown ease-in-out;
    }

    @for $i from 1 through 10 {
      > *:nth-child(#{$i}n) {
        animation-delay: #{$i * 0.1}s;
      }
    }
  }

  &__error {
    @extend .news__top;
    color: $red;
    filter: brightness(65%);
  }

  &__count {
    font-size: 1.25rem;
  }

  &__articles {
    margin-inline: auto;
    max-width: 800px;

    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}

.source {
  padding: 3rem;
  display: flex;
  background-color: $red;

  &__url {
    margin: auto;

    font-size: 1.25rem;
    font-weight: 600;
    color: $black;
    text-decoration: none;

    &:hover {
      color: $yellow;
    }
  }
}

@keyframes updown {
  from {
    transform: translateY(0rem);
  }

  to {
    transform: translateY(-1rem);
  }
}
</style>

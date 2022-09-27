<script setup lang="ts">
import { ref, watch } from "vue";
import debounce from "lodash/debounce";
import { useNews } from "@/api/news";
import NewsArticle from "./components/NewsArticle.vue";

const titleOnly = ref(false);
const fromDate = ref(
  new Date(new Date().getFullYear(), new Date().getMonth() - 1)
    .toISOString()
    .split("T")[0]
);
const toDate = ref(new Date().toISOString().split("T")[0]);
const language = ref("en");
const publisher = ref("");

const searchQuery = ref("");
const { isFetching, isError, isIdle, data, error, refetch } = useNews(
  searchQuery,
  fromDate,
  toDate,
  language,
  publisher,
  {
    enabled: false,
  }
);

const searchBar = ref();
const refetchDebounce = debounce(refetch.value, 1000);
watch(searchQuery, () => {
  if (searchQuery.value) refetchDebounce();
  else refetchDebounce.cancel();
});

const helpPopup = ref(false);
const filterPopup = ref(false);
const closePopup = () => {
  helpPopup.value = false;
  filterPopup.value = false;
};
</script>

<template>
  <div class="flex-container">
    <header class="header">
      <div class="header__container">
        <button @click="helpPopup = !helpPopup" class="header__button">
          <div>?</div>
        </button>
        <input
          v-model="searchQuery"
          ref="searchBar"
          class="header__search"
          placeholder="Search"
          type="text"
        />
        <button @click="filterPopup = !filterPopup" class="header__button">
          <div>+</div>
        </button>
      </div>
    </header>

    <aside
      v-if="helpPopup || filterPopup"
      @click.self="closePopup"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
      class="popup"
    >
      <section class="popup__content">
        <button @click="closePopup" class="popup__close">x</button>
        <template v-if="helpPopup">Help</template>
        <template v-else>
          <h3 class="popup__title">Filters</h3>

          <label class="custom">
            <input
              v-model="titleOnly"
              type="checkbox"
              class="custom__checkbox"
            />
            <span class="custom__checkmark"></span>
            Title only
          </label>

          <label for="fromdate"
            >From:
            <input
              v-model="fromDate"
              class="popup__date"
              id="fromdate"
              type="date"
          /></label>

          <label for="todate"
            >To:
            <input v-model="toDate" class="popup__date" id="todate" type="date"
          /></label>

          <input
            v-model="publisher"
            class="popup__input"
            type="text"
            placeholder="Publisher"
          />
          <input
            v-model="language"
            class="popup__input"
            type="text"
            placeholder="Language"
          />
        </template>
      </section>
    </aside>

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
  min-height: 100vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
}

.custom {
  display: block;
  position: relative;
  padding-left: 1.75rem;
  padding-top: 0.25rem;

  cursor: pointer;
  user-select: none;

  &:hover &__checkbox ~ &__checkmark {
    background-color: $orange;
  }

  & &__checkbox:checked ~ &__checkmark {
    background-color: $red;
  }

  &__checkbox {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  &__checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 1.5rem;
    width: 1.5rem;
    background-color: $yellow;
    border-radius: 0.25rem;
  }
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);

  &__content {
    padding: 1rem;
    width: 80vmin;
    height: 60vmin;

    background-color: $white;
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    > * {
      width: fit-content;
    }
  }

  &__date {
    padding: 0.25rem;
    border: solid 1px $black;

    &:focus {
      outline: none;
      border: solid 1px $yellow;
    }
  }

  &__input {
    padding: 0.25rem;
    border: solid 1px $black;
  }

  &__close {
    position: absolute;
    right: 2rem;

    color: $yellow;
    font-size: 2rem;
    font-weight: bold;

    cursor: pointer;
    background-color: $white;
    border: none;

    &:hover {
      color: $red;
    }
  }
}

.header {
  position: sticky;
  top: 0;
  padding: 1rem;

  z-index: 1;
  display: flex;
  align-items: center;
  background-color: $yellow;

  &__container {
    margin-inline: auto;
    max-width: 800px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__button {
    padding: 1rem;
    padding-bottom: 1.5rem;
    aspect-ratio: 1 / 1;

    > * {
      translate: 0 -25%;
    }

    cursor: pointer;
    font-size: 1.25rem;

    background-color: $white;
    border: solid 0.25rem $orange;
    border-radius: 9999em 9999em 9999em 9999em;

    &:hover {
      border-color: $red;
    }
  }

  &__search {
    width: 100%;
    padding: 0.5rem 1rem;
    margin-inline: 2rem;

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

  display: flex;
  background-color: $orange;

  &__top {
    margin-inline: auto;
    display: inline-block;
    font-size: 2rem;
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
    text-align: center;
  }

  &__articles {
    margin-inline: auto;
    max-width: 800px;
    width: fit-content;

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
      text-decoration: underline;
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

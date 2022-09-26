import axios from "axios";
import type { Ref } from "vue";
import { useQuery } from "vue-query";

export function useNews(search: Ref<string>, { enabled }: any) {
  return useQuery(
    ["news", search.value],
    () =>
      axios(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          search.value
        )}&apiKey=7a0f465dda0842208a41f0981ff3bb45`,
        {
          method: "GET",
        }
      ),
    {
      select: (response: any) => response.data,
      enabled,
    }
  );
}

export function useNewsStatic(search: Ref<string>, { enabled }: any) {
  return useQuery(
    ["news-static", search.value],
    async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.floor(Math.random() * 2500) + 500)
      );
      const articles = [];
      const limit = Math.floor(Math.random() * 100) + 1;
      for (let i = 0; i < limit; i++) {
        articles.push({
          source: { id: `${i}` },
          author: `Author ${i}`,
          title: `Title ${i}`,
          description: `You searched for ${search.value}. We are on iteration and description ${i}`,
          url: "",
        });
      }

      return {
        totalResults: 3,
        articles: articles,
      };
    },
    {
      select: (data: any) => data,
      enabled,
    }
  );
}

import axios from "axios";
import type { Ref } from "vue";
import { useQuery } from "vue-query";

export function useNews(
  search: Ref<string>,
  from: Ref<string>,
  to: Ref<string>,
  langauge: Ref<string>,
  domain: Ref<string>,
  { enabled }: any
) {
  return useQuery(["news", search.value], () => {
    const s = encodeURIComponent(search.value);
    const f = encodeURIComponent(from.value);
    const t = encodeURIComponent(to.value);
    const l = encodeURIComponent(langauge.value);
    const d = encodeURIComponent(domain.value);

    const url = `https://newsapi.org/v2/everything?q=${s}&from=${f}&to=${t}&language=${l}&domains=${d}&apiKey=7a0f465dda0842208a41f0981ff3bb45`;

    axios(url, {
      method: "GET",
    }),
      {
        select: (response: any) => response.data,
        enabled,
      };
  });
}

export function useNewsStatic(
  search: Ref<string>,
  from: Ref<string>,
  to: Ref<string>,
  langauge: Ref<string>,
  domain: Ref<string>,
  { enabled }: any
) {
  return useQuery(
    ["news-static", search.value],
    async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.floor(Math.random() * 2500) + 500)
      );

      const s = encodeURIComponent(search.value);
      const f = encodeURIComponent(from.value);
      const t = encodeURIComponent(to.value);
      const l = encodeURIComponent(langauge.value);
      const d = encodeURIComponent(domain.value);

      const url = `https://newsapi.org/v2/everything?q=${s}&from=${f}&to=${t}&language=${l}&domains=${d}&apiKey=7a0f465dda0842208a41f0981ff3bb45`;

      const articles = [];
      const limit = Math.floor(Math.random() * 100) + 1;
      for (let i = 0; i < limit; i++) {
        articles.push({
          source: { id: `${i}` },
          author: `Author ${i}`,
          title: `Title ${i}`,
          description: `You searched for ${
            search.value
          }. We are on iteration and description ${i != 0 ? i : url}`,
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

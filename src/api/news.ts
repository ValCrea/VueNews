import axios from "axios";
import type { Ref } from "vue";
import { useQuery } from "vue-query";

export function useNews() {
  return useQuery(
    "news",
    () =>
      axios(
        "https://newsapi.org/v2/everything?q=keyword&apiKey=7a0f465dda0842208a41f0981ff3bb45",
        {
          method: "GET",
        }
      ),
    {
      select: (response: any) => response.data,
    }
  );
}

export function useNewsStatic(search: Ref<string>, { enabled }: any) {
  return useQuery(
    "news-static",
    () => {
      return {
        totalResults: 3,
        articles: [
          {
            source: { id: "1" },
            author: "author 1",
            title: "title 1",
            description: "You searched for " + search.value,
            url: "",
          },
          {
            source: { id: "2" },
            author: "author 2",
            title: "title 2",
            description: "description 2",
            url: "",
          },
          {
            source: { id: "3" },
            author: "author 3",
            title: "title 3",
            description: "description 3",
            url: "",
          },
        ],
      };
    },
    {
      select: (data: any) => data,
      enabled,
    }
  );
}

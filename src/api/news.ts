import axios from "axios";
import { useQuery } from "vue-query";

export function useNews() {
  return useQuery(
    "openmetro",
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

export function useNewsStatic() {
  return useQuery(
    "openmetro",
    () => {
      return {
        totalResults: 3,
        articles: [
          {
            source: { id: "1" },
            author: "author 1",
            title: "title 1",
            description: "description 1",
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
    }
  );
}

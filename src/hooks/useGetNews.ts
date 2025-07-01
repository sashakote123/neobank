import { useEffect, useState } from "react";
import { INews } from "../types/types";

interface HookResult {
  data: INews[] | null;
  isLoading: boolean;
  error: Error | undefined;
}

const NEWS_API_URL = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.REACT_APP_NEWS_APIKEY}`;
const MAX_NEWS_ITEMS = 10;

export const useGetNews = (): HookResult => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<INews[] | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch(NEWS_API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (!result?.articles) {
          throw new Error("No articles data received from API");
        }

        setData(result.articles.slice(0, MAX_NEWS_ITEMS));
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  return { data, isLoading, error };
};

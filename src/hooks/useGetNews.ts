import { useEffect, useState } from "react";
import { INews } from "../types/types";

interface HookResult {
  data: INews[] | null;
  isLoading: boolean;
  error?: Error;
}

const NEWS_API_URL = `https://newsdata.io/api/1/latest?apikey=${process.env.REACT_APP_NEWS_APIKEY}&q=banking`;
const MAX_NEWS_ITEMS = 10;

const useGetNews = (): HookResult => {
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
        if (!result?.results) {
          throw new Error("No articles data received from API");
        }

        setData(result.results.slice(0, MAX_NEWS_ITEMS));
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

export default useGetNews;

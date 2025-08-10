import { useEffect, useState } from "react";
import { INews } from "../../../shared/types/types";
import axios from "axios";

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
        const response = await axios.get(NEWS_API_URL);

        if (!response.data?.results) {
          throw new Error("No articles data received from API");
        }

        setData(response.data.results.slice(0, MAX_NEWS_ITEMS));
      } catch (err) {
        const error = axios.isAxiosError(err)
          ? new Error(`HTTP error! status: ${err.response?.status}`)
          : err instanceof Error
            ? err
            : new Error("An unknown error occurred");

        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsData();
  }, []);
  return { data, isLoading, error };
};

export default useGetNews;

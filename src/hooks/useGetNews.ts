import { useEffect, useState } from "react";
import { INews } from "../types/types";

interface HookResult {
  data: INews[] | null;
  loading: boolean;
  error: boolean;
}

export const useGetNews = (): HookResult => {
  const [data, setData] = useState<INews[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.REACT_APP_NEWS_APIKEY}`
    )
      .then((resp) => {
        if (resp.ok) return resp.json();
        else throw new Error();
      })
      .catch(() => setError(true))
      .then((json) =>
        json ? setData(json.articles.slice(0, 10)) : setData(json)
      )
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

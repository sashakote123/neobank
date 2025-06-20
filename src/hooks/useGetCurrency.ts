import { useEffect, useState } from "react";
import { CurrencyData, IImage } from "../types/types";

import usd from "@images/currency/usd.svg";
import chf from "@images/currency/chf.svg";
import cny from "@images/currency/cny.svg";
import eur from "@images/currency/eur.svg";
import gbp from "@images/currency/gbp.svg";
import jpy from "@images/currency/jpy.svg";

interface HookResult {
  convertedData: any | null;
  loading: boolean;
  error: boolean;
}

const imgArray: IImage[] = [
  {
    img: usd,
    code: "usd",
  },
  {
    img: chf,
    code: "chf",
  },
  {
    img: cny,
    code: "cny",
  },
  {
    img: eur,
    code: "eur",
  },
  {
    img: jpy,
    code: "jpy",
  },
  {
    img: gbp,
    code: "gbp",
  },
];

export const useGetCurrency = (): HookResult => {
  const [data, setData] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [convertedData, setConvertedData] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      `https://api.currencyapi.com/v3/latest?apikey=${process.env.REACT_APP_CURRENCY_APIKEY}`
    )
      .then((resp) => {
        if (resp.ok) return resp.json();
        else throw new Error();
      })
      .catch(() => setError(true))
      .then((json) => {
        json ? setData(json.data) : setData(json);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (data) {
      const roubleCourse = Number(data.RUB?.value.toFixed(3));
      const newData = imgArray.map((item) => ({
        img: item.img,
        name: data[item.code.toUpperCase()]?.code || item.code,
        value: +(roubleCourse / data[item.code.toUpperCase()]?.value).toFixed(
          2
        ),
      }));
      setConvertedData(newData);
    }
  }, [data]);
  return { convertedData, loading, error };
};

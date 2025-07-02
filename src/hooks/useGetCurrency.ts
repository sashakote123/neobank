import { useEffect, useState } from "react";
import { CurrencyData, ICurrency, IImage } from "../types/types";

import usd from "@images/currency/usd.svg";
import chf from "@images/currency/chf.svg";
import cny from "@images/currency/cny.svg";
import eur from "@images/currency/eur.svg";
import gbp from "@images/currency/gbp.svg";
import jpy from "@images/currency/jpy.svg";

interface HookResult {
  convertedData: ICurrency[] | null;
  isLoading: boolean;
  error: Error | undefined;
}

const CURRENCY_IMAGES: IImage[] = [
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

const CURRENCY_API_URL = `https://api.currencyapi.com/v3/latest?apikey=123${process.env.REACT_APP_CURRENCY_APIKEY}`;

export const useGetCurrency = (): HookResult => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const [convertedData, setConvertedData] = useState<ICurrency[]>([]);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(CURRENCY_API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const data: CurrencyData = result.data;

        if (!data) {
          throw new Error("No data received from API");
        }

        const rubValue = parseFloat(data.RUB?.value.toFixed(3));
        if (isNaN(rubValue)) {
          throw new Error("Invalid RUB value");
        }
        const processedData = CURRENCY_IMAGES.map(({ img, code }) => {
          const currency = data[code.toUpperCase()];
          if (!currency) {
            console.warn(`Currency data not found for: ${code}`);
            return null;
          }

          return {
            img,
            name: code,
            value: parseFloat((rubValue / currency.value).toFixed(2)),
          };
        }).filter((item): item is ICurrency => item !== null);

        setConvertedData(processedData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrencyData();
  }, []);
  return { convertedData, isLoading, error };
};

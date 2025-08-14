import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CURRENCY_IMAGES } from "../data";
import { IImage } from "@/src/shared/types/types";
import { ICurrency } from "../types";

const CURRENCY_API_URL = `https://api.currencyapi.com`;

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: CURRENCY_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (build) => ({
    getCurrency: build.query({
      query: () => ({
        url: `/v3/latest?apikey=123${process.env.REACT_APP_CURRENCY_APIKEY}`,
      }),
      transformResponse: (
        response,
        _meta,
        currenciesArray: IImage[] = CURRENCY_IMAGES
      ) => {
        const data = response.data;
        console.log(data);
        const rubValue = parseFloat(data.RUB?.value.toFixed(3));

        return currenciesArray
          .map(({ img, code }) => {
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
          })
          .filter((item): item is ICurrency => item !== null);
      },
    }),
  }),
});

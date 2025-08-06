import "./styles.css";

import bankIcon from "@images/currency/bank.svg";
import useGetCurrency from "@/src/entities/currency/hooks/useGetCurrency";
import { ICurrency } from "./types";
import { currencyApi } from "./api/service";
import { CURRENCY_IMAGES } from "./data";

const Currency = () => {
  // const { convertedData, error } = useGetCurrency();

  const { data, isError, isLoading } =
    currencyApi.useGetCurrencyQuery(CURRENCY_IMAGES);

  return (
    <div className="converter">
      <div className="left">
        <div data-testid="title" className="converter__title">
          Exchange rate in Internet bank
        </div>
        <div data-testid="subtitle" className="converter__subtitle">
          Currency
        </div>
        {isError ? (
          <div className="converter__alert">
            Failed to fetch actual currency
          </div>
        ) : (
          <ul className="currency__list">
            {data
              ? data.map((item: ICurrency) => {
                  return (
                    <li key={item.name} className="currency__item">
                      <img
                        src={item.img}
                        alt="itemImage"
                        className="item__image"
                      />
                      <div id="usdName" className="item__name">
                        {item.name}:
                      </div>
                      <div id="usd" className="item__value">
                        {item.value}
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        )}
      </div>

      <div data-testid="right" className="right">
        <div className="right__meta">
          Update every 15 minutes
          <div id="metaDate"></div>
        </div>
        <img src={bankIcon} alt="bank" className="right__photo" />
      </div>
    </div>
  );
};

export default Currency;

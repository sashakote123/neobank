import "./styles.css";

import bankIcon from "@images/currency/bank.svg";
import { useGetCurrency } from "@/src/hooks/useGetCurrency";
import { ICurrency } from "@/src/types/types";

const Currency = () => {
  const { convertedData, error } = useGetCurrency();

  return (
    <div className="converter">
      <div className="left">
        <div className="converter__title">Exchange rate in Internet bank</div>
        <div className="converter__subtitle">Currency</div>
        {error ? (
          <div className="converter__alert">
            Failed to fetch actual currency
          </div>
        ) : (
          <ul className="currency__list">
            {convertedData.map((item: ICurrency) => {
              return (
                <li key={item.name} className="currency__item">
                  <img src={item.img} alt="itemImage" className="item__image" />
                  <div id="usdName" className="item__name">
                    {item.name}:
                  </div>
                  <div id="usd" className="item__value">
                    {item.value}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="right">
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

import styles from "./styles.module.css";
import { IRates } from "./types";

const ratesArray: IRates[] = [
  { left: "Card currency", right: "Rubles, dollars, euro" },
  { left: "Interest free period", right: "0% up to 160 days" },
  { left: "Payment system", right: "Mastercard, Visa" },
  { left: "Maximum credit limit on the card", right: "600 000 ₽" },
  {
    left: "Replenishment and withdrawal",
    right:
      "At any ATM. Top up your credit card for free with cash or transfer from other cards",
  },
  { left: "Max cashback per month", right: "15 000 ₽" },
  {
    left: "Transaction Alert",
    right:
      "60 ₽ — SMS or push notifications 0 ₽ — card statement, information about transactions in the online bank",
  },
];

const RatesAndConditions = () => {
  return (
    <section className={styles.container}>
      <ul className={styles.ratesList}>
        {ratesArray.map((item: IRates) => {
          return (
            <li key={item.left} className={styles.listItem}>
              <div className={styles.left}>{item.left}</div>
              <div className={styles.right}>{item.right}</div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default RatesAndConditions;

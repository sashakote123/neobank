import OfferItem from "@/src/entities/offerItem/OfferItem";
import styles from "./styles.module.css";
import { IOfferItem } from "@/src/shared/types/types";

interface Props {
  array: IOfferItem[];
}

const Offers: React.FC<Props> = ({ array }) => {
  return (
    <section className={styles.container}>
      <ul className={styles.offersList}>
        {array.map((item) => {
          return (
            <OfferItem
              key={item.rate}
              offer={item}
              requestedAmount={item.requestedAmount}
              totalAmount={item.totalAmount}
              term={item.term}
              rate={item.rate}
              monthlyPayment={item.monthlyPayment}
              isInsuranceEnabled={item.isInsuranceEnabled}
              isSalaryClient={item.isSalaryClient}
            />
          );
        })}
      </ul>
    </section>
  );
};
export default Offers;

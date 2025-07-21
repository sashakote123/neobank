import CashbackCardItem from "@/src/entities/cashbackCardItem/CashbackCardItem";
import styles from "./styles.module.css";
import { ICard } from "./types";

const cardsArray: ICard[] = [
  { subtitle: "For food delivery, cafes and restaurants", title: "5%" },
  { subtitle: "In supermarkets with our subscription", title: "5%" },
  { subtitle: "In clothing stores and children's goods", title: "2%" },
  {
    subtitle: "Other purchases and payment of services and fines",
    title: "1%",
  },
  { subtitle: "Shopping in online stores", title: "up to 3%" },
  { subtitle: "Purchases from our partners", title: "30%" },
];

const CashbackCards = () => {
  return (
    <section className={styles.container}>
      <ul className={styles.cardsList}>
        {cardsArray.map((item: ICard) => {
          return (
            <CashbackCardItem subtitle={item.subtitle} title={item.title} />
          );
        })}
      </ul>
    </section>
  );
};
export default CashbackCards;

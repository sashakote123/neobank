import styles from "./styles.module.css";
import { IAboutCard } from "./types";

import img1 from "./assets/Money_duotone.svg";
import img2 from "./assets/Calendar_duotone.svg";
import img3 from "./assets/Clock_duotone.svg";
import img4 from "./assets/Bag_duotone.svg";
import img5 from "./assets/Credit card_duotone.svg";
import AboutCardItem from "@/src/entities/aboutCardItem/AboutCardItem";

const cardsArray: IAboutCard[] = [
  {
    image: img1,
    title: "Up to 50 000 ₽",
    subtitle: "Cash and transfers without commission and percent",
  },
  {
    image: img2,
    title: "Up to 160 days",
    subtitle: "Without percent on the loan",
  },
  {
    image: img3,
    title: "Free delivery",
    subtitle:
      "We will deliver your card by courier at a convenient place and time for you",
  },
  {
    image: img4,
    title: "Up to 12 months",
    subtitle:
      "No percent. For equipment, clothes and other purchases in installments",
  },
  {
    image: img5,
    title: "Convenient deposit and withdrawal",
    subtitle:
      "At any ATM. Top up your credit card for free with cash or transfer from other cards",
  },
];

const AboutCards = () => {
  return (
    <section className={styles.container}>
      <ul className={styles.cardsList}>
        {cardsArray.map((item: IAboutCard) => (
          <AboutCardItem
            key={item.title}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </ul>
    </section>
  );
};
export default AboutCards;

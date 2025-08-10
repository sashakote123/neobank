import styles from "./styles.module.css";
import { IInfo } from "./types";
import card from "./assets/card.png";
import MainBtn from "@/src/shared/mainBtn/MainBtn";
import { Link } from "react-scroll";

const bannerInfoArray: IInfo[] = [
  { title: "Up to 160 days", subtitle: "No percent" },
  { title: "Up to 600 000 ₽", subtitle: "Credit limit" },
  { title: "0 ₽", subtitle: "Card service is free" },
];

const LoanBanner = () => {
  return (
    <div data-testid="loanBanner" className={styles.container}>
      <section className={styles.loanBanner}>
        <div className={styles.bannerText}>
          <h3 data-testid="title" className={styles.bannerTitle}>
            Platinum digital credit card
          </h3>
          <div data-testid="subtitle" className={styles.bannerSubtitle}>
            Our best credit card. Suitable for everyday spending and shopping.
            Cash withdrawals and transfers without commission and interest.
          </div>
          <ul data-testid="list" className={styles.bannerInfo}>
            {bannerInfoArray.map((item: IInfo) => {
              return (
                <li
                  data-testid="listitem"
                  key={item.title}
                  className={styles.infoItem}
                >
                  <div className={styles.itemTitle}>{item.title}</div>
                  <div className={styles.itemSubtitle}>{item.subtitle}</div>
                </li>
              );
            })}
          </ul>
          <Link
            data-testid="link"
            to="form"
            smooth={true}
            duration={500}
            offset={-100}
          >
            <MainBtn title="Apply for a card" />
          </Link>
        </div>
        <div className={styles.bannerImage}>
          <img src={card} alt="cardImage" />
        </div>
      </section>
    </div>
  );
};
export default LoanBanner;

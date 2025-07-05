import { NavLink } from "react-router";
import styles from "./styles.module.css";
import { ILink } from "@/src/shared/types/types";

const linksArray: ILink[] = [
  { to: "/card/about", text: "About card" },
  { to: "/card/rates", text: "Rates and conditions" },
  { to: "/card/cashback", text: "Cashback" },
  { to: "/card/faq", text: "FAQ" },
];

const LoanNavigation = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.navigatinList}>
        {linksArray.map((item: ILink) => {
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.itemLink} ${styles.linkActive}`
                    : styles.itemLink
                }
              >
                {item.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default LoanNavigation;

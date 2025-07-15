import { NavLink } from "react-router";
import styles from "./styles.module.css";
import { ILink } from "@/src/shared/types/types";
import clsx from "clsx";

const linksArray: ILink[] = [
  { to: "/card/about", text: "About card" },
  { to: "/card/rates", text: "Rates and conditions" },
  { to: "/card/cashback", text: "Cashback" },
  { to: "/card/faq", text: "FAQ" },
];

type active = {
  isActive: boolean;
};

const LoanNavigation = () => {
  const setActive = ({ isActive }: active) =>
    clsx([styles.itemLink], { [styles.linkActive]: isActive });

  return (
    <nav className={styles.container}>
      <ul className={styles.navigatinList}>
        {linksArray.map((item: ILink) => {
          return (
            <li key={item.to}>
              <NavLink to={item.to} className={setActive}>
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

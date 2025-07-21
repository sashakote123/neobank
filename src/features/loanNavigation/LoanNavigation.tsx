import styles from "./styles.module.css";
import clsx from "clsx";
import { Dispatch, useState } from "react";

const linksArray: string[] = [
  "About card",
  "Rates and conditions",
  "Cashback",
  "FAQ",
];

interface Props {
  setPage: Dispatch<React.SetStateAction<number | undefined>>;
}

const LoanNavigation: React.FC<Props> = ({ setPage }) => {
  const [activeLink, setActiveLink] = useState<number>(0);
  const setActive = (item: string) =>
    clsx([styles.itemLink], {
      [styles.linkActive]: linksArray[activeLink] === item,
    });

  return (
    <nav className={styles.container}>
      <ul className={styles.navigatinList}>
        {linksArray.map((item: string, index) => {
          return (
            <li
              className={setActive(item)}
              onClick={() => {
                setPage(index);
                setActiveLink(index);
              }}
              key={item}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default LoanNavigation;

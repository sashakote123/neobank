import styles from "./styles.module.css";

interface Props {
  subtitle: string;
  title: string;
}

const CashbackCardItem: React.FC<Props> = ({ subtitle, title }) => {
  return (
    <li className={styles.cardItem}>
      <div data-testid="subtitle" className={styles.subtitle}>
        {subtitle}
      </div>
      <div data-testid="header" className={styles.title}>
        {title}
      </div>
    </li>
  );
};
export default CashbackCardItem;

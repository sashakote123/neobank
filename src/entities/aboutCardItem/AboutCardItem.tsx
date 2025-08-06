import styles from "./styles.module.css";

interface Props {
  image: string;
  title: string;
  subtitle: string;
}

const AboutCardItem: React.FC<Props> = ({ image, title, subtitle }) => {
  return (
    <li className={styles.cardItem}>
      <img src={image} alt="card item" />
      <h3 data-testid="header" className={styles.itemTitle}>
        {title}
      </h3>
      <div data-testid="subtitle" className={styles.itemSubtitle}>
        {subtitle}
      </div>
    </li>
  );
};
export default AboutCardItem;

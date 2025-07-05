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
      <h3 className={styles.itemTitle}>{title}</h3>
      <div className={styles.itemSubtitle}>{subtitle}</div>
    </li>
  );
};
export default AboutCardItem;

import { Link } from "react-router";
import styles from "./styles.module.css";

interface Props {
  title: string;
  subtitle: string;
  btn?: boolean;
}

const WaitForDecidion: React.FC<Props> = ({ title, subtitle, btn }) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.subtitle}>{subtitle}</h2>
      {btn && (
        <Link className={styles.linkBtn} to="/">
          View other offers of our bank
        </Link>
      )}
    </section>
  );
};
export default WaitForDecidion;

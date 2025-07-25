import styles from "./styles.module.css";

interface Props {
  title: string;
  subtitle: string;
}

const WaitForDecidion: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.subtitle}>{subtitle}</h2>
    </section>
  );
};
export default WaitForDecidion;

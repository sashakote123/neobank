import LinkBtn from '@/src/shared/linkBtn/LinkBtn';

import styles from './styles.module.css';

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
      {btn && <LinkBtn title=" View other offers of our bank" />}
    </section>
  );
};
export default WaitForDecidion;

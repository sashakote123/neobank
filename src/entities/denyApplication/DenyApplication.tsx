import MainBtn from '@/src/shared/mainBtn/MainBtn';

import close from './assets/close.svg';
import styles from './styles.module.css';

interface Props {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const DenyApplication: React.FC<Props> = ({ setIsShow }) => {
  return (
    <section data-testid="denyModal" className={styles.container}>
      <div className={styles.windowAlert}>
        <div className={styles.header}>
          <div className={styles.title}>Deny application</div>
          <button onClick={() => setIsShow((prev) => !prev)}>
            <img src={close} alt="closeBtn" />
          </button>
        </div>

        <div className={styles.alert}>You exactly sure, you want to cancel this application?</div>
        <div className={styles.buttons}>
          <MainBtn title="Deny" small style={{ background: 'rgba(217, 55, 55, 0.8)' }} />

          <MainBtn title="Cancel" small onClick={() => setIsShow((prev) => !prev)} />
        </div>
      </div>
    </section>
  );
};
export default DenyApplication;

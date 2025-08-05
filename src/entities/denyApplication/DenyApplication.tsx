import styles from "./styles.module.css";
import close from "./assets/close.svg";

interface Props {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const DenyApplication: React.FC<Props> = ({ setIsShow }) => {
  return (
    <section className={styles.container}>
      <div className={styles.windowAlert}>
        <div className={styles.header}>
          <div className={styles.title}>Deny application</div>
          <button onClick={() => setIsShow((prev) => !prev)}>
            <img src={close} alt="closeBtn" />
          </button>
        </div>

        <div className={styles.alert}>
          You exactly sure, you want to cancel this application?
        </div>
        <div className={styles.buttons}>
          <button className={styles.denyBtn}>Deny</button>
          <button
            onClick={() => setIsShow((prev) => !prev)}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};
export default DenyApplication;

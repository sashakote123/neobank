import ContinuationForms from "@/src/features/continuationForms/ContinuationForms";
import styles from "./styles.module.css";

const ContinuationOfApplication = () => {
  return (
    <section className={styles.container}>
      <div className={styles.continuation}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Continuation of the application</h1>
          <div className={styles.step}>Step 2 of 5</div>
        </div>
        <ContinuationForms />
      </div>
    </section>
  );
};
export default ContinuationOfApplication;

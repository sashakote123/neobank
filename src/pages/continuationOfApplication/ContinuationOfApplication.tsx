import ContinuationForms from "@/src/features/continuationForms/ContinuationForms";
import styles from "./styles.module.css";
import WaitForDecidion from "@/src/entities/waitForDecidion/WaitForDecidion";
import StepsHeader from "@/src/entities/stepsHeader/StepsHeader";
import useRedirect from "@/src/shared/hooks/useRedirect";

const ContinuationOfApplication = () => {
  const { isShowForm, setIsShowForm } = useRedirect("continuation");

  return (
    <section className={styles.container}>
      {isShowForm ? (
        <WaitForDecidion
          title="Wait for a decision on the application"
          subtitle="The answer will come to your mail within 10 minutes"
        />
      ) : (
        <div className={styles.continuation}>
          <StepsHeader title="Continuation of the application" step={2} />
          <ContinuationForms setIsShowForm={setIsShowForm} />
        </div>
      )}
    </section>
  );
};
export default ContinuationOfApplication;

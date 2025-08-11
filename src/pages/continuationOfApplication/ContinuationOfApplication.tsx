import ContinuationForms from "@/src/features/continuationForms/ContinuationForms";
import styles from "./styles.module.css";
import WaitForDecidion from "@/src/entities/waitForDecidion/WaitForDecidion";
import StepsHeader from "@/src/entities/stepsHeader/StepsHeader";
import useApplicationStep from "@/src/shared/hooks/useApplicationStep";

const ContinuationOfApplication = () => {
  const { isShowForm, setIsShowForm, isLoading } =
    useApplicationStep("continuation");

  return (
    <section data-testid="continuationPage" className={styles.container}>
      {isLoading ? (
        <WaitForDecidion title="Loading..." subtitle="Please, wait" />
      ) : isShowForm ? (
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

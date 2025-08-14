import StepsHeader from '@/src/entities/stepsHeader/StepsHeader';
import WaitForDecidion from '@/src/entities/waitForDecidion/WaitForDecidion';
import ContinuationForms from '@/src/features/continuationForms/ContinuationForms';
import useApplicationStep from '@/src/shared/hooks/useApplicationStep';

import styles from './styles.module.css';

const ContinuationOfApplication = () => {
  const { isShowForm, setIsShowForm, isLoading } = useApplicationStep('continuation');

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

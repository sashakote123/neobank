import StepsHeader from '@/src/entities/stepsHeader/StepsHeader';
import WaitForDecidion from '@/src/entities/waitForDecidion/WaitForDecidion';
import ScheduleButtons from '@/src/features/scheduleButtons/ScheduleButtons';
import Table from '@/src/features/table/Table';
import useApplicationStep from '@/src/shared/hooks/useApplicationStep';

import styles from './styles.module.css';

const PaymentSchedule = () => {
  const { isShowForm, setIsShowForm, tableArray, isLoading } = useApplicationStep('schedule');

  return (
    <section data-testid="paymentSchedule" className={styles.container}>
      {isLoading ? (
        <WaitForDecidion title="Loading..." subtitle="Please, wait" />
      ) : isShowForm ? (
        <WaitForDecidion
          title="Documents are formed"
          subtitle="Documents for signing will be sent to your email"
        />
      ) : (
        <div className={styles.schedule}>
          <StepsHeader title="Payment Schedule" step={3} />
          {tableArray.length ? <Table tableArray={tableArray} /> : <>loading</>}

          <ScheduleButtons setIsShowForm={setIsShowForm} />
        </div>
      )}
    </section>
  );
};
export default PaymentSchedule;

import Table from "@/src/features/table/Table";
import styles from "./styles.module.css";
import ScheduleButtons from "@/src/features/scheduleButtons/ScheduleButtons";
import WaitForDecidion from "@/src/entities/waitForDecidion/WaitForDecidion";
import StepsHeader from "@/src/entities/stepsHeader/StepsHeader";
import useApplicationStep from "@/src/shared/hooks/useApplicationStep";

const PaymentSchedule = () => {
  const { isShowForm, setIsShowForm, tableArray, isLoading } =
    useApplicationStep("schedule");

  return (
    <section className={styles.container}>
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

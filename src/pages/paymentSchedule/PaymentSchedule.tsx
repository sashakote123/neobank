import Table from "@/src/features/table/Table";
import styles from "./styles.module.css";
import ScheduleButtons from "@/src/features/scheduleButtons/ScheduleButtons";

const PaymentSchedule = () => {
  return (
    <section className={styles.container}>
      <div className={styles.schedule}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Payment Schedule</h1>
          <div className={styles.step}>Step 3 of 5</div>
        </div>
        <Table />
        <ScheduleButtons />
      </div>
    </section>
  );
};
export default PaymentSchedule;

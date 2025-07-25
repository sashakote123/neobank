import styles from "./styles.module.css";

const ScheduleButtons = () => {
  return (
    <div className={styles.buttons}>
      <button className={styles.denyBtn}>Deny</button>
      <div className={styles.rBtn}>
        <div className={styles.check}>
          <input type="checkbox" />
          <div>I agree with the payment schedule</div>
        </div>
        <button className={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
};
export default ScheduleButtons;

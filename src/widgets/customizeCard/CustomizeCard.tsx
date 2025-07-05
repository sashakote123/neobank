import SelectAmount from "@/src/features/selectAmount/SelectAmount";
import styles from "./styles.module.css";
import ContactInformationForms from "@/src/features/contactInformationForms/ContactInformationForms";

const CustomizeCard = () => {
  return (
    <section className={styles.customize}>
      <div className={styles.top}>
        <div className={styles.selection}>
          <div className={styles.heading}>
            <h2 className={styles.sectionTitle}>Customize your card</h2>
            <div className={styles.steps}>Step 1 of 5</div>
          </div>
          <SelectAmount minAmount={15000} maxAmount={60000} />
        </div>
        <div className={styles.shosenAmount}>
          <h3 className={styles.shosenAmountTitle}>
            You have chosen the amount
          </h3>
          <div className={styles.amount}>150 000 ₽</div>
        </div>
      </div>
      <ContactInformationForms />
    </section>
  );
};
export default CustomizeCard;

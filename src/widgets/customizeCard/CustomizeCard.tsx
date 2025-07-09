import SelectAmount from "@/src/features/selectAmount/SelectAmount";
import styles from "./styles.module.css";
import ContactInformationForms from "@/src/features/contactInformationForms/ContactInformationForms";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IFormFields } from "@/src/shared/types/types";
import { formatDate } from "./functions";

const CustomizeCard = () => {
  const methods = useForm<IFormFields>();

  const onSubmit: SubmitHandler<IFormFields> = (data: IFormFields) => {
    console.log(data);
    fetch("http://localhost:8080/application", {
      // mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },

      body: JSON.stringify({
        ...data,
        birth: formatDate(data.birth),
        amount: 1234,
      }),
    })
      .then(() => {
        // setIsShow(true);
        // setTimeout(() => setIsShow(false), 2000);
      })
      .catch((err) => console.log(err));
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        id="form"
        className={styles.customize}
      >
        <div className={styles.top}>
          <div className={styles.selection}>
            <div className={styles.heading}>
              <h2 className={styles.sectionTitle}>Customize your card</h2>
              <div className={styles.steps}>Step 1 of 5</div>
            </div>
            <SelectAmount minAmount={15000} maxAmount={600000} />
          </div>
          <div className={styles.shosenAmount}>
            <h3 className={styles.shosenAmountTitle}>
              You have chosen the amount
            </h3>
            <div className={styles.amount}>150 000 ₽</div>
          </div>
        </div>
        <ContactInformationForms />
        <button className={styles.submitButton}>Continue</button>
      </form>
    </FormProvider>
  );
};
export default CustomizeCard;

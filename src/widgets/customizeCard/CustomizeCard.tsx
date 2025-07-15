import SelectAmount from "@/src/features/selectAmount/SelectAmount";
import styles from "./styles.module.css";
import ContactInformationForms from "@/src/features/contactInformationForms/ContactInformationForms";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormFields, formSchema } from "@/src/shared/formSchema/formSchema";

import { zodResolver } from "@hookform/resolvers/zod";

const CustomizeCard = () => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    const { patronymic, birth, ...restData } = data;
    const transformedData = {
      ...restData,
      term: Number(data.term),
      amount: Number(data.amount),
      middleName: patronymic,
      birthdate: birth,
      // passportSeries: Number(data.passportSeries),
      // passportNumber: Number(data.passportNumber),
    };

    console.log(transformedData);
    fetch("http://localhost:8080/application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(transformedData),
    }).catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
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
              <SelectAmount minAmount={150000} maxAmount={600000} />
            </div>
            <div className={styles.shosenAmount}>
              <h3 className={styles.shosenAmountTitle}>
                You have chosen the amount
              </h3>
              <div className={styles.amount}>150 000 ₽</div>
            </div>
          </div>
          <ContactInformationForms />

          <button type="submit" className={styles.submitButton}>
            Continue
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
export default CustomizeCard;

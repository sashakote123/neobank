import SelectAmount from "@/src/features/selectAmount/SelectAmount";
import styles from "./styles.module.css";
import ContactInformationForms from "@/src/features/contactInformationForms/ContactInformationForms";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormFields, formSchema } from "@/src/shared/formSchema/formSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { updateArray } from "@/src/app/store/offersSlice";
import StepsHeader from "@/src/entities/stepsHeader/StepsHeader";
import { transformData } from "./functions";
import { createLoanApplication } from "@/src/shared/api/instance";

const CustomizeCard = () => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const dispatch = useDispatch();

  const fillForm = () => {
    methods.setValue("amount", "200000");
    methods.setValue("firstName", "Alex");
    methods.setValue("lastName", "Kotikhin");
    methods.setValue("patronymic", "Andreevich");
    methods.setValue("email", "sapool@bk.ru");
    methods.setValue("term", "6");
    methods.setValue("passportNumber", "123456");
    methods.setValue("passportSeries", "6666");
    methods.setValue("birth", "27.07.2002");
  };

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    createLoanApplication(transformData(data))
      .then((resp) => {
        dispatch(updateArray(resp.data));
      })
      .catch((err) => console.log(err));
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
              <StepsHeader title="Customize your card" step={1} />
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
          <button className={styles.fillBtn} type="button" onClick={fillForm}>
            Fill fields
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
export default CustomizeCard;

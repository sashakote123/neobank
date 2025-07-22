import { IForms } from "@/src/shared/types/types";
import { employerInputsArray, inputsArray } from "./data";
import styles from "./styles.module.css";
import SelectFromForm from "@/src/entities/selectFromForm/SelectFromForm";
import SimpleInput from "@/src/entities/simpleInput/SimpleInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormFields,
  secondFormSchema,
} from "@/src/shared/formSchema/secondFormSchema";
import CalendarInput from "@/src/entities/calendarInput/CalendarInput";

const ContinuationForms = () => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(secondFormSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        onSubmit={methods.handleSubmit(onSubmit)}
        id="form"
      >
        <div className={styles.topInputs}>
          {inputsArray.map((item: IForms) => {
            return item.type === "selector" ? (
              <SelectFromForm key={item.name} item={item} />
            ) : item.type === "calendar" ? (
              <CalendarInput key={item.name} item={item} />
            ) : item.type === "input" ? (
              <SimpleInput key={item.name} item={item} />
            ) : null;
          })}
        </div>
        <div className={styles.title}>Employment</div>
        <div className={styles.bottomInputs}>
          {employerInputsArray.map((item: IForms) => {
            return item.type === "selector" ? (
              <SelectFromForm key={item.name} item={item} />
            ) : item.type === "input" ? (
              <SimpleInput key={item.name} item={item} />
            ) : null;
          })}
        </div>

        <button className={styles.submitButton}>Continue</button>
      </form>
    </FormProvider>
  );
};
export default ContinuationForms;

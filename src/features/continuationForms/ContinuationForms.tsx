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
import { useParams } from "react-router";

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContinuationForms: React.FC<Props> = ({ setIsShowForm }) => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(secondFormSchema),
  });

  const { applicationId } = useParams();

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    const transformedData = {
      gender: data.gender.toUpperCase(),
      maritalStatus: data.maritalStatus.toUpperCase().replace("/", "_"),
      dependentAmount: Number(data.dependentAmount),
      passportIssueDate: data.passportIssueDate,
      passportIssueBranch: data.passportIssueBranch,
      employment: {
        employmentStatus: data.employmentStatus.toUpperCase().replace(" ", "_"),
        employerINN: data.employerINN,
        salary: Number(data.salary),
        position: data.position.toUpperCase().replace(" ", "_"),
        workExperienceTotal: Number(data.workExperienceTotal),
        workExperienceCurrent: Number(data.workExperienceCurrent),
      },
    };

    fetch(`http://localhost:8080/application/registration/${applicationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedData),
    })
      .then(() => setIsShowForm(true))
      .catch(console.log);
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

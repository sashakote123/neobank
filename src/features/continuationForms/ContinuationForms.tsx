import { IForms } from "@/src/shared/types/types";
import { employerInputsArray, inputsArray } from "./data";
import styles from "./styles.module.css";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormFields,
  secondFormSchema,
} from "@/src/shared/formSchema/secondFormSchema";
import { useParams } from "react-router";
import { transformData } from "./utils";
import UniInput from "@/src/entities/uniInput/UniInput";
import { sendEmployerInfo } from "@/src/shared/api/instance";

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContinuationForms: React.FC<Props> = ({ setIsShowForm }) => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(secondFormSchema),
  });

  const { applicationId } = useParams();

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    sendEmployerInfo(transformData(data), applicationId)
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
          {inputsArray.map((item: IForms) => (
            <UniInput item={item} />
          ))}
        </div>
        <div className={styles.title}>Employment</div>
        <div className={styles.bottomInputs}>
          {employerInputsArray.map((item: IForms) => (
            <UniInput item={item} />
          ))}
        </div>

        <button className={styles.submitButton}>Continue</button>
      </form>
    </FormProvider>
  );
};
export default ContinuationForms;

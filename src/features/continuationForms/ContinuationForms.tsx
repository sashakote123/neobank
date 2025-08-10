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
import { loanApi } from "@/src/shared/api/service";
import MainBtn from "@/src/shared/mainBtn/MainBtn";

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContinuationForms: React.FC<Props> = ({ setIsShowForm }) => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(secondFormSchema),
  });

  const { applicationId } = useParams();

  const [sendEmployerInfo, { isLoading }] =
    loanApi.useSendEmployerInfoMutation();

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    await sendEmployerInfo({ data: transformData(data), applicationId });
    setIsShowForm(true);
  };

  return (
    <FormProvider {...methods}>
      <form
        data-testid="form"
        className={styles.form}
        onSubmit={methods.handleSubmit(onSubmit)}
        id="form"
      >
        <div data-testid="topInputs" className={styles.topInputs}>
          {inputsArray.map((item: IForms) => (
            <UniInput key={item.name} item={item} />
          ))}
        </div>
        <div className={styles.title}>Employment</div>
        <div data-testid="bottomInputs" className={styles.bottomInputs}>
          {employerInputsArray.map((item: IForms) => (
            <UniInput key={item.name} item={item} />
          ))}
        </div>
        <MainBtn title={isLoading ? "Loading..." : "Continue"} />
      </form>
    </FormProvider>
  );
};
export default ContinuationForms;

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';

import UniInput from '@/src/entities/uniInput/UniInput';
import { loanApi } from '@/src/shared/api/service';
import ErrorAlert from '@/src/shared/errorAlert/ErrorAlert';
import { FormFields, secondFormSchema } from '@/src/shared/formSchema/secondFormSchema';
import MainBtn from '@/src/shared/mainBtn/MainBtn';
import { IForms } from '@/src/shared/types/types';

import { employerInputsArray, inputsArray } from './data';
import styles from './styles.module.css';
import { transformData } from './utils';

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContinuationForms: React.FC<Props> = ({ setIsShowForm }) => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(secondFormSchema),
  });

  const { applicationId } = useParams();

  const [sendEmployerInfo, { isLoading, isError }] = loanApi.useSendEmployerInfoMutation();

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    try {
      await sendEmployerInfo({ data: transformData(data), applicationId }).unwrap();
      setIsShowForm(true);
    } catch (error) {
      setIsShowForm(false);
    }
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
        {isError && <ErrorAlert alertMessage="Failed to fetch" />}
        <MainBtn title={isLoading ? 'Loading...' : 'Continue'} />
      </form>
    </FormProvider>
  );
};
export default ContinuationForms;

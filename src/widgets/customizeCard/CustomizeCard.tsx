import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import StepsHeader from '@/src/entities/stepsHeader/StepsHeader';
import ContactInformationForms from '@/src/features/contactInformationForms/ContactInformationForms';
import SelectAmount from '@/src/features/selectAmount/SelectAmount';
import { loanApi } from '@/src/shared/api/service';
import { FormFields, formSchema } from '@/src/shared/formSchema/formSchema';
import MainBtn from '@/src/shared/mainBtn/MainBtn';

import { transformData } from './functions';
import styles from './styles.module.css';

const CustomizeCard = () => {
  const methods = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const [createLoan, { isLoading }] = loanApi.useCreateLoanApplicationMutation();
  const fillForm = () => {
    methods.setValue('amount', '200000');
    methods.setValue('firstName', 'Alex');
    methods.setValue('lastName', 'Kotikhin');
    methods.setValue('patronymic', 'Andreevich');
    methods.setValue('email', 'sapool@bk.ru');
    methods.setValue('term', '6');
    methods.setValue('passportNumber', '123456');
    methods.setValue('passportSeries', '6666');
    methods.setValue('birth', '27.07.2002');
  };

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    await createLoan(transformData(data));
  };

  return (
    <div data-testid="customizeCard" className={styles.container}>
      <FormProvider {...methods}>
        <form
          data-testid="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          id="form"
          className={styles.customize}
        >
          <div data-testid="top" className={styles.top}>
            <div className={styles.selection}>
              <StepsHeader title="Customize your card" step={1} />
              <SelectAmount minAmount={150000} maxAmount={600000} />
            </div>
            <div className={styles.shosenAmount}>
              <h3 className={styles.shosenAmountTitle}>You have chosen the amount</h3>
              <div className={styles.amount}>150 000 ₽</div>
            </div>
          </div>
          <ContactInformationForms />

          <MainBtn type="submit" title={isLoading ? 'Loading...' : 'Continue'} />
          <button data-testid="fillBtn" className={styles.fillBtn} type="button" onClick={fillForm}>
            Fill fields
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
export default CustomizeCard;

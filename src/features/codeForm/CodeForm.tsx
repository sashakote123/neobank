import { useParams } from 'react-router';

import { useEffect, useRef, useState } from 'react';

import { loanApi } from '@/src/shared/api/service';

import circle from './assets/circle.svg';
import loader from './assets/loader.svg';
import styles from './styles.module.css';

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CodeForm: React.FC<Props> = ({ setIsShowForm }) => {
  const { applicationId } = useParams();
  const [values, setValues] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [enterCode, { isError, isLoading, reset }] = loanApi.useEnterCodeMutation();

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const digit = newValue.slice(-1);
    const newValues = [...values];
    newValues[index] = digit;
    setValues(newValues);

    if (digit && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    if (values.join('').length === 4) {
      const submitCode = async () => {
        if (values.join('').length === 4) {
          try {
            await enterCode({ data: values, applicationId }).unwrap();
            setIsShowForm(true);
          } catch (error) {}
        }
      };

      submitCode();
    }
  }, [applicationId, enterCode, setIsShowForm, values]);

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isError) reset();

    if (event.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (inputRefs.current.length !== values.length) {
    inputRefs.current = Array(values.length).fill(null);
  }

  return (
    <form data-testid="codeForm" className={styles.formNumber}>
      {values.map((value, index) => (
        <div className={styles.inputArea} key={index}>
          <input
            data-testid="input"
            type="number"
            className={styles.inputNumber}
            value={value}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            inputMode="numeric"
          />
          {!value && <img className={styles.inputPlaceholder} src={circle} alt="circle" />}
        </div>
      ))}
      {isLoading && (
        <img data-testid="loading" className={styles.loader} src={loader} alt="loader" />
      )}
      {isError && (
        <div data-testid="error" className={styles.error}>
          Invalid confirmation code
        </div>
      )}
    </form>
  );
};

export default CodeForm;

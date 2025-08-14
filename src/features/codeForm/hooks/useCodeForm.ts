import { useParams } from 'react-router';

import { useEffect, useRef, useState } from 'react';

import { loanApi } from '@/src/shared/api/service';

interface HookResult {
  values: string[];
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  isLoading: boolean;
  isError: boolean;
  handleInputChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (index: number, event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const useCodeForm = (setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>): HookResult => {
  const SYMBOLS_IN_CODE = 4;

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
    if (values.join('').length === SYMBOLS_IN_CODE) {
      const submitCode = async () => {
        if (values.join('').length === SYMBOLS_IN_CODE) {
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

  return { values, inputRefs, isLoading, isError, handleInputChange, handleKeyDown };
};

export default useCodeForm;

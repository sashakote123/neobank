import styles from "./styles.module.css";
import circle from "./assets/circle.svg";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import loader from "./assets/loader.svg";

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CodeForm: React.FC<Props> = ({ setIsShowForm }) => {
  const { applicationId } = useParams();
  const [values, setValues] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    const digit = newValue.slice(-1);
    isError && setIsError(false);
    const newValues = [...values];
    newValues[index] = digit;
    setValues(newValues);

    if (digit && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    if (values.join("").length === 4) {
      setIsLoading(true);
      fetch(`http://localhost:8080/document/${applicationId}/sign/code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values.join("")),
      })
        .then((resp) => {
          if (!resp.ok) throw new Error();
          setIsLoading(false);
          setIsShowForm(true);
        })
        .catch(() => {
          setIsLoading(false);
          setIsError(true);
        });
    }
  }, [applicationId, setIsShowForm, values]);

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (inputRefs.current.length !== values.length) {
    inputRefs.current = Array(values.length).fill(null);
  }

  return (
    <form className={styles.formNumber}>
      {values.map((value, index) => (
        <div className={styles.inputArea} key={index}>
          <input
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
          {!value && (
            <img
              className={styles.inputPlaceholder}
              src={circle}
              alt="circle"
            />
          )}
        </div>
      ))}
      {isLoading && <img className={styles.loader} src={loader} alt="loader" />}
      {isError && <div className={styles.error}>Invalid confirmation code</div>}
    </form>
  );
};

export default CodeForm;

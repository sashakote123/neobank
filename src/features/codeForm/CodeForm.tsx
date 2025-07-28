import styles from "./styles.module.css";
import circle from "./assets/circle.svg";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CodeForm: React.FC<Props> = ({ setIsShowForm }) => {
  const { applicationId } = useParams();
  const [values, setValues] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    console.log(values.join(""));
    if (values.join("").length === 4) {
      fetch(`http://localhost:8080/document/${applicationId}/sign/code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values.join("")),
      })
        .then(() => setIsShowForm(true))
        .catch(console.log);
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
    </form>
  );
};

export default CodeForm;

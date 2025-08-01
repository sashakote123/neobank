import { useFormContext } from "react-hook-form";
import { IForms } from "@/src/shared/types/types";
import styles from "./styles.module.css";
import check from "./assets/check.svg";
import error from "./assets/error.svg";
import { useIMask } from "react-imask";
import { useRef } from "react";

interface Props {
  item: IForms;
}

const SimpleInput: React.FC<Props> = ({ item }) => {
  const {
    register,
    setValue,
    trigger,
    formState: { errors, isSubmitted },
  } = useFormContext();

  const isValid = !errors[item.name] && isSubmitted;

  const errorMessage = errors[item.name]?.message as string | undefined;
  const backupRef = useRef<HTMLInputElement>(null);

  const { ref: imaskRef } = useIMask<HTMLInputElement>(
    { mask: item.mask ? `${item.mask}` : undefined },
    {
      onAccept: (value) => {
        setValue(item.name, value);
        trigger(item.name);
      },
    }
  );
  const { ref: registerRef, ...registerProps } = register(item.name);

  return (
    <div className={styles.input}>
      <div className={styles.title}>
        <div className={styles.titleText}>{item.title}</div>
        {item.required && <div className={styles.required}>*</div>}
      </div>
      <div className={styles.inputArea}>
        <input
          {...registerProps}
          className={`${styles.area} ${errors[item.name] && styles.error}`}
          placeholder={item.placeholder}
          ref={(el) => {
            registerRef(el);
            item.mask && imaskRef
              ? (imaskRef.current = el)
              : (backupRef.current = el);
          }}
        />
        {errors[item.name] ? (
          <div>
            <img src={error} alt="error" className={styles.alert} />
            <div className={styles.errorAlert}>
              {errorMessage ||
                (item.required ? item.requiredAlert : item.errorAlert)}
            </div>
          </div>
        ) : (
          isValid && <img src={check} alt="check" className={styles.alert} />
        )}
      </div>
    </div>
  );
};

export default SimpleInput;

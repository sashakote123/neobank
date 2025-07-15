import { useFormContext } from "react-hook-form";
import { IForms } from "@/src/shared/types/types";
import styles from "./styles.module.css";
import check from "./assets/check.svg";
import error from "./assets/error.svg";

interface Props {
  item: IForms;
}

const SimpleInput: React.FC<Props> = ({ item }) => {
  const {
    register,
    formState: { errors, isSubmitted },
  } = useFormContext();

  const isValid = !errors[item.name] && isSubmitted;

  const errorMessage = errors[item.name]?.message as string | undefined;

  return (
    <div key={item.title} className={styles.input}>
      <div className={styles.title}>
        <div className={styles.titleText}>{item.title}</div>
        {item.required && <div className={styles.required}>*</div>}
      </div>
      <div className={styles.inputArea}>
        <input
          {...register(item.name)}
          className={`${styles.area} ${errors[item.name] && styles.error}`}
          placeholder={item.placeholder}
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

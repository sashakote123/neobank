import { useFormContext } from "react-hook-form";
import { IForms, IFormFields } from "@/src/shared/types/types";
import styles from "./styles.module.css";
import check from "./assets/check.svg";
import error from "./assets/error.svg";

interface Props {
  item: IForms;
}

const SimpleInput: React.FC<Props> = ({ item }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<IFormFields>();

  const fieldValue = watch(item.name);
  const isValid = !errors[item.name] && fieldValue;

  return (
    <div key={item.title} className={styles.input}>
      <div className={styles.title}>
        <div className={styles.titleText}>{item.title}</div>
        {item.required && <div className={styles.required}>*</div>}
      </div>
      <div className={styles.inputArea}>
        <input
          {...register(item.name, {
            required: item.required,
            validate: item.validate,
          })}
          className={`${styles.area} ${errors[item.name] && styles.error}`}
          placeholder={item.placeholder}
        />
        {errors[item.name] ? (
          <div>
            <img src={error} alt="error" className={styles.alert} />
            {errors[item.name]?.type === "validate" ? (
              <div className={styles.errorAlert}>{item.errorAlert}</div>
            ) : (
              <div className={styles.errorAlert}>{item.requiredAlert}</div>
            )}
          </div>
        ) : (
          isValid && <img src={check} alt="check" className={styles.alert} />
        )}
      </div>
    </div>
  );
};

export default SimpleInput;

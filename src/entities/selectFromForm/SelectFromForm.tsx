import { IFormFields, IForms } from "@/src/shared/types/types";
import styles from "./styles.module.css";
import { useFormContext } from "react-hook-form";

interface ISelectProps {
  item: IForms;
}

const SelectFromForm: React.FC<ISelectProps> = ({ item }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div key={item.title} className={styles.input}>
      <div className={styles.title}>
        <div className={styles.titleText}>{item.title}</div>
        {item.required && <div className={styles.required}>*</div>}
      </div>
      <select
        {...register(item.name)}
        className={`${styles.select} ${errors[item.name] && styles.error}`}
        defaultValue={item.selectorArray?.[5]}
      >
        {item.selectorArray?.map((option: number) => (
          <option key={option} value={String(option)} className={styles.option}>
            {option} month{option !== 1 ? "s" : ""}
          </option>
        ))}
      </select>
      {errors[item.name] && (
        <div className={styles.errorAlert}>
          {errors[item.name]?.message?.toString() ||
            (item.errorAlert ?? "Invalid selection")}
        </div>
      )}
    </div>
  );
};

export default SelectFromForm;

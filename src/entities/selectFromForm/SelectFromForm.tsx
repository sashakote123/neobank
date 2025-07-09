import { IFormFields, IForms } from "@/src/shared/types/types";
import styles from "./styles.module.css";
import { useFormContext } from "react-hook-form";

interface ISelectProps {
  item: IForms;
}

const SelectFromForm: React.FC<ISelectProps> = ({ item }) => {
  const { register } = useFormContext<IFormFields>();

  return (
    <div key={item.title} className={styles.input}>
      <div className={styles.title}>
        <div className={styles.titleText}>{item.title}</div>
        {item.required ? <div className={styles.required}>*</div> : null}
      </div>
      <select
        {...register(item.name)}
        className={styles.select}
        defaultValue={item.selectorArray?.[5]}
      >
        {item.selectorArray?.map((option: number) => (
          <option key={option} value={option} className={styles.option}>
            {option} months
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFromForm;

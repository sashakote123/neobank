import { IForms } from "@/src/shared/types/types";
import styles from "./styles.module.css";

interface ISelectProps {
  item: IForms;
}

const SelectFromForm: React.FC<ISelectProps> = ({ item }) => {
  return (
    <div key={item.title} className={styles.input}>
      <div className={styles.title}>
        <div className={styles.titleText}>{item.title}</div>
        {item.required ? <div className={styles.required}>*</div> : null}
      </div>
      <select name="select" className={styles.select}>
        {item.selectorArray?.map((option: number) => {
          return (
            <option key={option} className={styles.option}>
              {option} months
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default SelectFromForm;

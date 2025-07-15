import styles from "./styles.module.css";

import inputsArray from "./data";

import SelectFromForm from "@/src/entities/selectFromForm/SelectFromForm";
import CalendarInput from "@/src/entities/calendarInput/CalendarInput";
import SimpleInput from "@/src/entities/simpleInput/SimpleInput";
import { IForms } from "@/src/shared/types/types";

const ContactInformationForms = () => {
  return (
    <section className={styles.forms}>
      <h3 className={styles.sectionTitle}>Contact Information</h3>

      <div className={styles.infoForm}>
        {inputsArray.map((item: IForms) => {
          return item.type === "selector" ? (
            <SelectFromForm key={item.name} item={item} />
          ) : item.type === "calendar" ? (
            <CalendarInput key={item.name} item={item} />
          ) : item.type === "input" ? (
            <SimpleInput key={item.name} item={item} />
          ) : null;
        })}
      </div>
    </section>
  );
};
export default ContactInformationForms;

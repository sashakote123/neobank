import styles from "./styles.module.css";

import inputsArray from "./data";

import { IForms } from "@/src/shared/types/types";
import UniInput from "@/src/entities/uniInput/UniInput";

const ContactInformationForms = () => {
  return (
    <section className={styles.forms}>
      <h3 className={styles.sectionTitle}>Contact Information</h3>

      <div className={styles.infoForm}>
        {inputsArray.map((item: IForms) => (
          <UniInput key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
};
export default ContactInformationForms;

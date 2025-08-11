import UniInput from '@/src/entities/uniInput/UniInput';
import { IForms } from '@/src/shared/types/types';

import inputsArray from './data';
import styles from './styles.module.css';

const ContactInformationForms = () => {
  return (
    <section data-testid="contactForms" className={styles.forms}>
      <h3 className={styles.sectionTitle}>Contact Information</h3>

      <div data-testid="infoForm" className={styles.infoForm}>
        {inputsArray.map((item: IForms) => (
          <UniInput key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
};
export default ContactInformationForms;

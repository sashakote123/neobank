import MainBtn from "@/src/shared/mainBtn/MainBtn";
import styles from "./styles.module.css";
import { IForms } from "./types";

const inputsArray: IForms[] = [
  { title: "Your last name", placeholder: "For Example Doe", required: true },
  { title: "Your first name", placeholder: "For Example Jhon", required: true },
  {
    title: "Your patronymic",
    placeholder: "For Example Victorovich",
    required: false,
  },
  { title: "Select term", placeholder: "6 month", required: true },
  { title: "Your email", placeholder: "test@gmail.com", required: true },
  {
    title: "Your date of birth",
    placeholder: "Select Date and Time",
    required: true,
  },
  { title: "Your passport series", placeholder: "0000", required: true },
  { title: "Your passport number", placeholder: "000000", required: true },
];

const ContactInformationForms = () => {
  return (
    <section className={styles.forms}>
      <h3 className={styles.sectionTitle}>Contact Information</h3>
      <form className={styles.infoForm} action="">
        {inputsArray.map((item: IForms) => {
          return (
            <div key={item.title} className={styles.input}>
              <div className={styles.title}>
                <div className={styles.titleText}>{item.title}</div>
                {item.required ? (
                  <div className={styles.required}>*</div>
                ) : null}
              </div>
              <input className={styles.area} placeholder={item.placeholder} />
            </div>
          );
        })}
      </form>
      <button className={styles.submitButton}>Continue</button>
    </section>
  );
};
export default ContactInformationForms;

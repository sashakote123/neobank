import styles from "./styles.module.css";
import { IFormFields, IForms } from "./types";

import { useState } from "react";

import inputsArray from "./data";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";

import SelectFromForm from "@/src/entities/selectFromForm/SelectFromForm";
import CalendarInput from "@/src/entities/calendarInput/CalendarInput";

import check from "./assets/check.svg";
import error from "./assets/error.svg";

const ContactInformationForms = () => {
  const [isShowCheck, setIsShowCheck] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormFields>();

  const onSubmit = (data: IFormFields) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<IFormFields> = (error) => {
    console.log(error);
  };

  return (
    <section className={styles.forms}>
      <h3 className={styles.sectionTitle}>Contact Information</h3>

      <form
        className={styles.infoForm}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {errors.lastName?.message}
        {inputsArray.map((item: IForms) => {
          return item.type === "selector" ? (
            <SelectFromForm key={item.name} item={item} />
          ) : item.type === "calendar" ? (
            <Controller
              key={item.name}
              name="birth"
              control={control}
              rules={{
                required: item.required
                  ? item.requiredAlert || "This field is required"
                  : false,
              }}
              render={({ field, fieldState }) => (
                <div>
                  <CalendarInput
                    item={item}
                    onChange={field.onChange}
                    value={field.value}
                  />
                  {fieldState.error && (
                    <div className={styles.errorAlert}>
                      {fieldState.error.message}
                    </div>
                  )}
                </div>
              )}
            />
          ) : (
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
                  <>
                    <img src={error} alt="error" className={styles.alert} />
                    {errors[item.name]?.type === "validate" ? (
                      <div className={styles.errorAlert}>{item.errorAlert}</div>
                    ) : (
                      <div className={styles.errorAlert}>
                        {item.requiredAlert}
                      </div>
                    )}
                  </>
                ) : (
                  isShowCheck && (
                    <img src={check} alt="check" className={styles.alert} />
                  )
                )}
              </div>
            </div>
          );
        })}

        <button
          onClick={() => setIsShowCheck(true)}
          className={styles.submitButton}
        >
          Continue
        </button>
      </form>
    </section>
  );
};
export default ContactInformationForms;

import { IForms } from "@/src/shared/types/types";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { formatDate } from "./functions";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import calendar from "./assets/Calendar_duotone.svg";
import { useFormContext } from "react-hook-form";

import check from "./assets/check.svg";
import error from "./assets/error.svg";
import { Value } from "react-calendar/dist/shared/types";

import { useIMask } from "react-imask";

interface CalendarInputProps {
  item: IForms;
}

const CalendarInput: React.FC<CalendarInputProps> = ({ item }) => {
  const [isShow, setIsShow] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const { ref, value } = useIMask<HTMLInputElement>(
    { mask: "00.00.0000" },
    {
      onAccept: (value) => {
        setValue(item.name, value);
        trigger(item.name);
      },
    }
  );

  const fieldValue = watch(item.name);
  const isValid = !errors[item.name] && fieldValue;

  const handleDateChange = (newValue: Value) => {
    setValue(item.name, formatDate(newValue));
    setIsShow(false);
    trigger(item.name);
  };

  useEffect(() => {
    setValue(item.name, value);
  }, [item.name, setValue, value]);

  const errorMessage = errors[item.name]?.message as string | undefined;

  return (
    <div className={styles.input}>
      <div className={styles.title}>
        <div className={styles.titleText}>{item.title}</div>
        {item.required && <div className={styles.required}>*</div>}
      </div>
      <div className={styles.inputArea}>
        <input
          data-testid="inputContainer"
          {...register(item.name)}
          ref={ref}
          className={`${styles.area} ${errors[item.name] && styles.error}`}
          placeholder={item.placeholder}
          value={watch(item.name) ? watch(item.name) : ""}
        />
        <button
          type="button"
          onClick={() => setIsShow((prev) => !prev)}
          className={styles.calendarBtn}
        >
          <img src={calendar} alt="calendar" />
        </button>
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

        {isShow && (
          <div data-testid="calendar">
            <Calendar className={styles.calendar} onChange={handleDateChange} />
          </div>
        )}
      </div>
    </div>
  );
};
export default CalendarInput;

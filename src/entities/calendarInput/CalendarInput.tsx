import { IForms } from "@/src/shared/types/types";
import styles from "./styles.module.css";
import { Value } from "react-calendar/dist/shared/types";
import { useState } from "react";
import { formatDate } from "./functions";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import calendar from "./assets/Calendar_duotone.svg";

interface CalendarInputProps {
  item: IForms;
  onChange: (value: Value) => void;
  value: string;
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  item,
  onChange,
  value,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleDateChange = (newValue: Value) => {
    onChange(newValue);

    if (newValue instanceof Date) {
      setInputValue(formatDate(newValue));
    } else if (Array.isArray(newValue) && newValue[0] instanceof Date) {
      setInputValue(formatDate(newValue[0]));
    } else {
      setInputValue("");
    }

    setIsShow(false);
  };

  return (
    <div className={styles.input}>
      <div className={styles.title}>
        <div className={styles.titleText}>{item.title}</div>
        {item.required && <div className={styles.required}>*</div>}
      </div>
      <div className={styles.inputArea}>
        <input
          className={styles.area}
          placeholder={item.placeholder}
          value={inputValue}
          readOnly
        />
        <button
          type="button"
          onClick={() => setIsShow((prev) => !prev)}
          className={styles.calendarBtn}
        >
          <img src={calendar} alt="calendar" />
        </button>

        {isShow && (
          <Calendar
            className={styles.calendar}
            onChange={handleDateChange}
            value={value}
          />
        )}
      </div>
    </div>
  );
};
export default CalendarInput;

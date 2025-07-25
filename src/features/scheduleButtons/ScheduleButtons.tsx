import { useState } from "react";
import styles from "./styles.module.css";
import DenyApplication from "@/src/entities/denyApplication/DenyApplication";
import { useParams } from "react-router";

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleButtons: React.FC<Props> = ({ setIsShowForm }) => {
  const { applicationId } = useParams();

  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  const [isChecked, setIsShecked] = useState<boolean>(false);

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShecked(e.target.checked);
  };

  const acceptDocument = () => {
    if (!isChecked) return;

    fetch(`http://localhost:8080/document/${applicationId}`, {
      method: "POST",
    }).then(() => setIsShowForm(true));
  };

  return (
    <>
      <div className={styles.buttons}>
        <button
          onClick={() => setIsShowAlert((prev) => !prev)}
          className={styles.denyBtn}
        >
          Deny
        </button>
        <div className={styles.rBtn}>
          <div className={styles.check}>
            <input
              checked={isChecked}
              onChange={handleChangeCheck}
              type="checkbox"
            />
            <div>I agree with the payment schedule</div>
          </div>
          <button
            className={styles.sendBtn}
            onClick={acceptDocument}
            style={{
              opacity: isChecked ? "1" : "0.5",
              cursor: isChecked ? "pointer" : "default",
            }}
          >
            Send
          </button>
        </div>
      </div>
      {isShowAlert ? <DenyApplication setIsShow={setIsShowAlert} /> : null}
    </>
  );
};
export default ScheduleButtons;

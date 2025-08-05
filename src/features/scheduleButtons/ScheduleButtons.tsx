import { useState } from "react";
import styles from "./styles.module.css";
import DenyApplication from "@/src/entities/denyApplication/DenyApplication";
import { useParams } from "react-router";
import { loanApi } from "@/src/shared/api/service";

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleButtons: React.FC<Props> = ({ setIsShowForm }) => {
  const { applicationId } = useParams();

  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  const [isChecked, setIsShecked] = useState<boolean>(false);

  const [applySchedule, { isLoading }] = loanApi.useApplyScheduleMutation();

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShecked(e.target.checked);
  };

  const acceptDocument = async () => {
    if (!isChecked) return;

    await applySchedule({ applicationId });
    setIsShowForm(true);
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
            {isLoading ? "Loading..." : "Send"}
          </button>
        </div>
      </div>
      {isShowAlert ? <DenyApplication setIsShow={setIsShowAlert} /> : null}
    </>
  );
};
export default ScheduleButtons;

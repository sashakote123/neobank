import { useParams } from "react-router";
import styles from "./styles.module.css";
import { useState } from "react";
import { signDocument } from "@/src/shared/api/instance";

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SigningButtons: React.FC<Props> = ({ setIsShowForm }) => {
  const { applicationId } = useParams();
  const [isChecked, setIsShecked] = useState<boolean>(false);

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShecked(e.target.checked);
  };

  const signDocumentHandler = () => {
    if (!isChecked) return;

    signDocument(applicationId).then(() => setIsShowForm(true));
  };

  return (
    <div className={styles.btnbox}>
      <div className={styles.checkbox}>
        <input
          checked={isChecked}
          onChange={handleChangeCheck}
          type="checkbox"
        />
        <div>I agree</div>
      </div>
      <button
        className={styles.btn}
        onClick={signDocumentHandler}
        style={{
          opacity: isChecked ? "1" : "0.5",
          cursor: isChecked ? "pointer" : "default",
        }}
      >
        Send
      </button>
    </div>
  );
};
export default SigningButtons;

import { useParams } from "react-router";
import styles from "./styles.module.css";
import { useState } from "react";

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SigningButtons: React.FC<Props> = ({ setIsShowForm }) => {
  const { applicationId } = useParams();
  const [isChecked, setIsShecked] = useState<boolean>(false);

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShecked(e.target.checked);
  };

  const signDocument = () => {
    if (!isChecked) return;

    fetch(`http://localhost:8080/document/${applicationId}/sign`, {
      method: "POST",
    }).then(() => setIsShowForm(true));
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
        onClick={signDocument}
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

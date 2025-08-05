import { useParams } from "react-router";
import styles from "./styles.module.css";
import { useState } from "react";
import { loanApi } from "@/src/shared/api/service";
import MainBtn from "@/src/shared/mainBtn/MainBtn";

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SigningButtons: React.FC<Props> = ({ setIsShowForm }) => {
  const { applicationId } = useParams();
  const [isChecked, setIsShecked] = useState<boolean>(false);

  const [signDocument, { isLoading }] = loanApi.useSignDocumentMutation();

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShecked(e.target.checked);
  };

  const signDocumentHandler = async () => {
    if (!isChecked) return;

    await signDocument({ applicationId });
    setIsShowForm(true);
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
      <MainBtn
        small
        title={isLoading ? "Loading..." : "Send"}
        onClick={signDocumentHandler}
        style={{
          opacity: isChecked ? "1" : "0.5",
          cursor: isChecked ? "pointer" : "default",
        }}
      />
    </div>
  );
};
export default SigningButtons;

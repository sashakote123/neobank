import ContinuationForms from "@/src/features/continuationForms/ContinuationForms";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import WaitForDecidion from "@/src/entities/waitForDecidion/WaitForDecidion";

const ContinuationOfApplication = () => {
  const [isShowForm, setIsShowForm] = useState<boolean>(false);

  const { applicationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/admin/application/${applicationId}`)
      .then((resp) => {
        if (!resp.ok) navigate("/*");
        return resp.json();
      })
      .then((json) =>
        json.status === "CC_APPROVED"
          ? setIsShowForm(true)
          : setIsShowForm(false)
      );
  }, [applicationId, navigate]);

  return (
    <section className={styles.container}>
      {isShowForm ? (
        <WaitForDecidion />
      ) : (
        <div className={styles.continuation}>
          <div className={styles.heading}>
            <h1 className={styles.title}>Continuation of the application</h1>
            <div className={styles.step}>Step 2 of 5</div>
          </div>
          <ContinuationForms setIsShowForm={setIsShowForm} />
        </div>
      )}
    </section>
  );
};
export default ContinuationOfApplication;

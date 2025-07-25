import ContinuationForms from "@/src/features/continuationForms/ContinuationForms";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import WaitForDecidion from "@/src/entities/waitForDecidion/WaitForDecidion";
import StepsHeader from "@/src/entities/stepsHeader/StepsHeader";

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
        <WaitForDecidion
          title="Wait for a decision on the application"
          subtitle="The answer will come to your mail within 10 minutes"
        />
      ) : (
        <div className={styles.continuation}>
          <StepsHeader title="Continuation of the application" step={2} />
          <ContinuationForms setIsShowForm={setIsShowForm} />
        </div>
      )}
    </section>
  );
};
export default ContinuationOfApplication;

import Table from "@/src/features/table/Table";
import styles from "./styles.module.css";
import ScheduleButtons from "@/src/features/scheduleButtons/ScheduleButtons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import WaitForDecidion from "@/src/entities/waitForDecidion/WaitForDecidion";
import StepsHeader from "@/src/entities/stepsHeader/StepsHeader";

const PaymentSchedule = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [tableArray, setTableArray] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/admin/application/${applicationId}`)
      .then((resp) => {
        if (!resp.ok) navigate("/*");
        return resp.json();
      })
      .then((json) => {
        if (json.credit) setTableArray(json.credit.paymentSchedule);
        else navigate("/*");

        json.status === "DOCUMENT_CREATED"
          ? setIsShowForm(true)
          : setIsShowForm(false);
      });
  }, [applicationId, navigate]);

  return (
    <section className={styles.container}>
      {isShowForm ? (
        <WaitForDecidion
          title="Documents are formed"
          subtitle="Documents for signing will be sent to your email"
        />
      ) : (
        <div className={styles.schedule}>
          <StepsHeader title="Payment Schedule" step={3} />
          {tableArray.length ? <Table tableArray={tableArray} /> : <>loading</>}

          <ScheduleButtons setIsShowForm={setIsShowForm} />
        </div>
      )}
    </section>
  );
};
export default PaymentSchedule;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type step = "continuation" | "schedule" | "signing" | "enterCode";

const useRedirect = (step: step) => {
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
        if (step === "continuation") {
          json.status === "CC_APPROVED"
            ? setIsShowForm(true)
            : setIsShowForm(false);
          if (
            json.status === "DOCUMENT_CREATED" ||
            json.status === "CREDIT_ISSUED" ||
            json.sesCode
          )
            navigate("/*");
        } else if (step === "schedule") {
          if (json.credit) setTableArray(json.credit.paymentSchedule);
          json.status === "DOCUMENT_CREATED"
            ? setIsShowForm(true)
            : setIsShowForm(false);
          if (
            json.status === "APPROVED" ||
            json.status === "CREDIT_ISSUED" ||
            json.sesCode
          )
            navigate("/*");
        } else if (step === "signing") {
          json.sesCode ? setIsShowForm(true) : setIsShowForm(false);
          if (
            json.status === "APPROVED" ||
            json.status === "CC_APPROVED" ||
            json.status === "CREDIT_ISSUED"
          )
            navigate("/*");
        } else if (step === "enterCode") {
          json.status === "CREDIT_ISSUED"
            ? setIsShowForm(true)
            : setIsShowForm(false);
          if (json.status === "APPROVED" || json.status === "CC_APPROVED")
            navigate("/*");
        }
      });
  }, [applicationId, navigate, step]);

  return { isShowForm, setIsShowForm, tableArray };
};

export default useRedirect;

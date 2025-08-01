import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ITableRow } from "../types/types";

type step = "continuation" | "schedule" | "signing" | "enterCode";
enum status {
  CC_APPROVED = "CC_APPROVED",
  DOCUMENT_CREATED = "DOCUMENT_CREATED",
  CREDIT_ISSUED = "CREDIT_ISSUED",
  APPROVED = "APPROVED",
}

const useApplicationStep = (step: step) => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [tableArray, setTableArray] = useState<ITableRow[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/admin/application/${applicationId}`)
      .then((resp) => {
        if (!resp.ok) navigate("/*");
        return resp.json();
      })
      .then((json) => {
        switch (step) {
          case "continuation":
            json.status === status.CC_APPROVED
              ? setIsShowForm(true)
              : setIsShowForm(false);
            if (
              json.status === status.DOCUMENT_CREATED ||
              json.status === status.CREDIT_ISSUED ||
              json.sesCode
            )
              navigate("/*");
            break;
          case "schedule":
            if (json.credit) setTableArray(json.credit.paymentSchedule);
            json.status === status.DOCUMENT_CREATED
              ? setIsShowForm(true)
              : setIsShowForm(false);
            if (
              json.status === status.APPROVED ||
              json.status === status.CREDIT_ISSUED ||
              json.sesCode
            )
              navigate("/*");
            break;
          case "signing":
            json.sesCode ? setIsShowForm(true) : setIsShowForm(false);
            if (
              json.status === status.APPROVED ||
              json.status === status.CC_APPROVED ||
              json.status === status.CREDIT_ISSUED
            )
              navigate("/*");
            break;
          case "enterCode":
            json.status === status.CREDIT_ISSUED
              ? setIsShowForm(true)
              : setIsShowForm(false);
            if (
              json.status === status.APPROVED ||
              json.status === status.CC_APPROVED
            )
              navigate("/*");
            break;
        }
      });
  }, [applicationId, navigate, step]);

  return { isShowForm, setIsShowForm, tableArray };
};

export default useApplicationStep;

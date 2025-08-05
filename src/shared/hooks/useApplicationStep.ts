import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ITableRow } from "../types/types";
import { loanApi } from "../api/service";

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

  const { data, isLoading, isError } =
    loanApi.useFetchLoanStatusQuery(applicationId);
  useEffect(() => {
    if (isLoading) return;
    if (isError) {
      navigate("/*");
      return;
    }
    if (!data) return;

    switch (step) {
      case "continuation":
        data.status === status.CC_APPROVED
          ? setIsShowForm(true)
          : setIsShowForm(false);
        if (
          data.status === status.DOCUMENT_CREATED ||
          data.status === status.CREDIT_ISSUED ||
          data.sesCode
        )
          navigate("/*");
        break;
      case "schedule":
        if (data.credit) setTableArray(data.credit.paymentSchedule);
        data.status === status.DOCUMENT_CREATED
          ? setIsShowForm(true)
          : setIsShowForm(false);
        if (
          data.status === status.APPROVED ||
          data.status === status.CREDIT_ISSUED ||
          data.sesCode
        )
          navigate("/*");
        break;
      case "signing":
        data.sesCode ? setIsShowForm(true) : setIsShowForm(false);
        if (
          data.status === status.APPROVED ||
          data.status === status.CC_APPROVED ||
          data.status === status.CREDIT_ISSUED
        )
          navigate("/*");
        break;
      case "enterCode":
        data.status === status.CREDIT_ISSUED
          ? setIsShowForm(true)
          : setIsShowForm(false);
        if (
          data.status === status.APPROVED ||
          data.status === status.CC_APPROVED
        )
          navigate("/*");
        break;
    }
  }, [data, isError, isLoading, navigate, step]);

  return { isShowForm, setIsShowForm, tableArray, isLoading, isError };
};

export default useApplicationStep;

import { useNavigate, useParams } from 'react-router';

import { useEffect, useState } from 'react';

import { loanApi } from '../api/service';
import { ITableRow } from '../types/types';

type step = 'continuation' | 'schedule' | 'signing' | 'enterCode';
enum status {
  CC_APPROVED = 'CC_APPROVED',
  DOCUMENT_CREATED = 'DOCUMENT_CREATED',
  CREDIT_ISSUED = 'CREDIT_ISSUED',
  APPROVED = 'APPROVED',
}

const useApplicationStep = (step: step) => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [tableArray, setTableArray] = useState<ITableRow[]>([]);

  const { data, isLoading, isError } = loanApi.useFetchLoanStatusQuery(applicationId);
  useEffect(() => {
    if (isLoading) return;
    if (isError) {
      navigate('/*');
      return;
    }
    if (!data) return;

    switch (step) {
      case 'continuation':
        setIsShowForm(data.status === status.CC_APPROVED);
        if ([status.DOCUMENT_CREATED, status.CREDIT_ISSUED].includes(data.status) || data.sesCode) {
          navigate('/*');
        }
        break;
      case 'schedule':
        if (data.credit) setTableArray(data.credit.paymentSchedule);
        setIsShowForm(data.status === status.DOCUMENT_CREATED);
        if ([status.APPROVED, status.CREDIT_ISSUED].includes(data.status) || data.sesCode) {
          navigate('/*');
        }
        break;
      case 'signing':
        setIsShowForm(!!data.sesCode);
        if ([status.APPROVED, status.CC_APPROVED, status.CREDIT_ISSUED].includes(data.status)) {
          navigate('/*');
        }
        break;
      case 'enterCode':
        setIsShowForm(data.status === status.CREDIT_ISSUED);
        if ([status.APPROVED, status.CC_APPROVED].includes(data.status)) {
          navigate('/*');
        }
        break;
    }
  }, [data, isError, isLoading, navigate, step]);

  return { isShowForm, setIsShowForm, tableArray, isLoading, isError };
};

export default useApplicationStep;

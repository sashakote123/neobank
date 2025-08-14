import { useParams } from 'react-router';

import { useState } from 'react';

import DenyApplication from '@/src/entities/denyApplication/DenyApplication';
import { loanApi } from '@/src/shared/api/service';
import MainBtn from '@/src/shared/mainBtn/MainBtn';

import styles from './styles.module.css';

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleButtons: React.FC<Props> = ({ setIsShowForm }) => {
  const { applicationId } = useParams();

  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  const [isChecked, setIsShecked] = useState<boolean>(false);

  const [applySchedule, { isLoading }] = loanApi.useApplyScheduleMutation();

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShecked(e.target.checked);
  };

  const acceptDocument = async () => {
    if (!isChecked) return;
    await applySchedule({ applicationId });
    setIsShowForm(true);
  };
  return (
    <>
      <div data-testid="buttons" className={styles.buttons}>
        <MainBtn
          title="Deny"
          small
          onClick={() => setIsShowAlert((prev) => !prev)}
          style={{ background: 'rgba(217, 55, 55, 0.8)' }}
        />
        <div className={styles.rBtn}>
          <div className={styles.check}>
            <input
              data-testid="checkbox"
              checked={isChecked}
              onChange={handleChangeCheck}
              type="checkbox"
            />
            <div>I agree with the payment schedule</div>
          </div>
          <MainBtn
            title={isLoading ? 'Loading...' : 'Send'}
            small
            onClick={acceptDocument}
            style={{
              opacity: isChecked ? '1' : '0.5',
              cursor: isChecked ? 'pointer' : 'default',
            }}
          />
        </div>
      </div>
      {isShowAlert && <DenyApplication setIsShow={setIsShowAlert} />}
    </>
  );
};
export default ScheduleButtons;

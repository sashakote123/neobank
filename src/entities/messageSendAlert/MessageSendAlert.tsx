import { useDispatch } from 'react-redux';

import { updateArray, updateCurrentOffer } from '@/src/app/store/offersSlice';
import MainBtn from '@/src/shared/mainBtn/MainBtn';

import styles from './styles.module.css';

const MessageSendAlert = () => {
  const dispatch = useDispatch();

  const clearStorageHandler = () => {
    localStorage.removeItem('currentOffer');
    localStorage.removeItem('currentAppArray');
    dispatch(updateCurrentOffer(null));
    dispatch(updateArray(null));
  };

  return (
    <section data-testid="messageSendAlert" className={styles.container}>
      <div className={styles.section}>
        <h1 className={styles.title}>The preliminary decision has been sent to your email.</h1>
        <h2 className={styles.subtitle}>
          In the letter you can get acquainted with the preliminary decision on the credit card.
        </h2>
        <MainBtn small title="Fill new form" onClick={clearStorageHandler} />
      </div>
    </section>
  );
};
export default MessageSendAlert;

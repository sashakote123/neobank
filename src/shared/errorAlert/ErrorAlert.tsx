import styles from './styles.module.css';

interface Props {
  alertMessage: string;
  code?: number;
}

const ErrorAlert: React.FC<Props> = ({ alertMessage, code }) => {
  return <div className={styles.error}>{alertMessage}</div>;
};
export default ErrorAlert;

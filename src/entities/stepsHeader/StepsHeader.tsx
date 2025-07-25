import styles from "./styles.module.css";

interface Props {
  title: string;
  step: number;
}

const StepsHeader: React.FC<Props> = ({ title, step }) => {
  return (
    <div className={styles.heading}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.step}>Step {step} of 5</div>
    </div>
  );
};
export default StepsHeader;

import circle from './assets/circle.svg';
import loader from './assets/loader.svg';
import useCodeForm from './hooks/useCodeForm';
import styles from './styles.module.css';

interface Props {
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CodeForm: React.FC<Props> = ({ setIsShowForm }) => {
  const { values, inputRefs, isLoading, isError, handleInputChange, handleKeyDown } =
    useCodeForm(setIsShowForm);

  return (
    <form data-testid="codeForm" className={styles.formNumber}>
      {values.map((value, index) => (
        <div className={styles.inputArea} key={index}>
          <input
            data-testid="input"
            type="number"
            className={styles.inputNumber}
            value={value}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            inputMode="numeric"
          />
          {!value && <img className={styles.inputPlaceholder} src={circle} alt="circle" />}
        </div>
      ))}
      {isLoading && (
        <img data-testid="loading" className={styles.loader} src={loader} alt="loader" />
      )}
      {isError && (
        <div data-testid="error" className={styles.error}>
          Invalid confirmation code
        </div>
      )}
    </form>
  );
};

export default CodeForm;

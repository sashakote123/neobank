import CodeForm from "@/src/features/codeForm/CodeForm";
import styles from "./styles.module.css";
import WaitForDecidion from "@/src/entities/waitForDecidion/WaitForDecidion";
import useApplicationStep from "@/src/shared/hooks/useApplicationStep";

const EnterCode = () => {
  const { isShowForm, setIsShowForm, isLoading } =
    useApplicationStep("enterCode");

  return (
    <section data-testid="enterCode" className={styles.container}>
      {isLoading ? (
        <WaitForDecidion title="Loading..." subtitle="Please, wait" />
      ) : isShowForm ? (
        <WaitForDecidion
          title="Congratulations! You have completed your new credit card."
          subtitle="Your credit card will arrive soon. Thank you for choosing us!"
          btn
        />
      ) : (
        <>
          <h1 className={styles.title}>Please enter confirmation code</h1>
          <CodeForm setIsShowForm={setIsShowForm} />
        </>
      )}
    </section>
  );
};
export default EnterCode;

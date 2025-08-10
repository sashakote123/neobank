import StepsHeader from "@/src/entities/stepsHeader/StepsHeader";
import styles from "./styles.module.css";
import file from "./assets/file.svg";
import SigningButtons from "@/src/entities/signingButtons/SigningButtons";
import WaitForDecidion from "@/src/entities/waitForDecidion/WaitForDecidion";
import useApplicationStep from "@/src/shared/hooks/useApplicationStep";

const SigningOfDocuments = () => {
  const { isShowForm, setIsShowForm, isLoading } =
    useApplicationStep("signing");

  return (
    <section className={styles.container}>
      {isLoading ? (
        <WaitForDecidion title="Loading..." subtitle="Please, wait" />
      ) : isShowForm ? (
        <WaitForDecidion
          title="Documents have been successfully signed and sent for approval"
          subtitle="Within 10 minutes you will be sent a PIN code to your email for confirmation"
        />
      ) : (
        <>
          <StepsHeader title="Signing of documents" step={4} />
          <div className={styles.textInfo}>
            Information on interest rates under bank deposit agreements with
            individuals. Center for Corporate Information Disclosure.
            Information of a professional participant in the securities market.
            Information about persons under whose control or significant
            influence the Partner Banks are. By leaving an application, you
            agree to the processing of personal data, obtaining information,
            obtaining access to a credit history, using an analogue of a
            handwritten signature, an offer, a policy regarding the processing
            of personal data, a form of consent to the processing of personal
            data.
          </div>
          <div className={styles.file}>
            <img src={file} alt="file" />
            <a
              data-testid="fileRef"
              href="https://neostudy.neoflex.ru/pluginfile.php/155185/mod_assign/intro/credit-card-offer.pdf"
              className={styles.fileText}
            >
              Information on your card
            </a>
          </div>
          <SigningButtons setIsShowForm={setIsShowForm} />
        </>
      )}
    </section>
  );
};
export default SigningOfDocuments;

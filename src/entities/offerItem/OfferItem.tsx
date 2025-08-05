import styles from "./styles.module.css";
import gift from "./assets/gift.png";
import check from "./assets/check.svg";
import close from "./assets/close.svg";
import { IOfferItem } from "@/src/shared/types/types";
import { loanApi } from "@/src/shared/api/service";
import MainBtn from "@/src/shared/mainBtn/MainBtn";

interface Props {
  offer: IOfferItem;
  requestedAmount: number;
  totalAmount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
}

const OfferItem: React.FC<Props> = (props) => {
  const [chooseOffer, { isLoading }] = loanApi.useChooseOfferMutation();

  const handleClick = () => {
    chooseOffer(props.offer);
  };

  return (
    <li className={styles.item}>
      <img className={styles.image} src={gift} alt="gift" />

      <div className={styles.description}>
        <div className={styles.descriptionItem}>
          Requested amount: {props.requestedAmount}
        </div>
        <div className={styles.descriptionItem}>
          Total amount: {props.totalAmount}
        </div>
        <div className={styles.descriptionItem}>For {props.term} months</div>
        <div className={styles.descriptionItem}>Your rate: {props.rate}%</div>
        <div className={styles.descriptionItem}>
          Insurance included{" "}
          {props.isInsuranceEnabled ? (
            <img src={check} alt="check" />
          ) : (
            <img src={close} alt="close" />
          )}
        </div>
        <div className={styles.descriptionItem}>
          Salary client{" "}
          {props.isSalaryClient ? (
            <img src={check} alt="check" />
          ) : (
            <img src={close} alt="close" />
          )}
        </div>
      </div>
      <MainBtn
        onClick={handleClick}
        title={isLoading ? "Loading..." : "Select"}
      />
    </li>
  );
};
export default OfferItem;

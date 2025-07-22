import LoanBanner from "@/src/entities/loanBanner/LoanBanner";
import styles from "./styles.module.css";
import LoanNavigation from "@/src/features/loanNavigation/LoanNavigation";
import AboutCards from "@/src/widgets/aboutCards/AboutCards";
import RatesAndConditions from "@/src/widgets/ratesAndConditions/RatesAndConditions";
import CashbackCards from "@/src/widgets/cashbackCards/CashbackCards";
import Questions from "@/src/widgets/questions/Questions";
import GetCard from "@/src/entities/getCard/GetCard";
import CustomizeCard from "@/src/widgets/customizeCard/CustomizeCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/app/store/store";
import { IOfferItem } from "@/src/shared/types/types";
import Offers from "@/src/widgets/offers/Offers";
import MessageSendAlert from "@/src/entities/messageSendAlert/MessageSendAlert";

const pages = [
  <AboutCards />,
  <RatesAndConditions />,
  <CashbackCards />,
  <Questions />,
];

const LoanPage = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(0);

  const [showForm, setShowForm] = useState<boolean>(false);

  const currentOffer = useSelector<RootState>(
    (store) => store.offers.currentOffer
  );

  useEffect(() => {
    const savedValue = localStorage.getItem("messageSend");
    setShowForm(savedValue === "1"); // Используем строгое сравнение
  }, []);

  // useEffect(() => {
  //   if (!currentOffer) setShowForm(false);
  // }, [currentOffer]);

  const array: IOfferItem[] | null = useSelector<
    RootState,
    IOfferItem[] | null
  >((store) => store.offers.offersArray);
  console.log(showForm);
  return (
    <section className={styles.loanPage}>
      <LoanBanner />
      <LoanNavigation setPage={setCurrentPage} />
      {currentPage ? pages[currentPage] : pages[0]}
      <GetCard />

      {!showForm && !currentOffer ? (
        !array ? (
          <CustomizeCard />
        ) : (
          <Offers array={array} />
        )
      ) : (
        <MessageSendAlert />
      )}
    </section>
  );
};
export default LoanPage;

import LoanBanner from "@/src/entities/loanBanner/LoanBanner";
import styles from "./styles.module.css";
import LoanNavigation from "@/src/features/loanNavigation/LoanNavigation";
import AboutCards from "@/src/widgets/aboutCards/AboutCards";
import RatesAndConditions from "@/src/widgets/ratesAndConditions/RatesAndConditions";
import CashbackCards from "@/src/widgets/cashbackCards/CashbackCards";
import Questions from "@/src/widgets/questions/Questions";
import GetCard from "@/src/entities/getCard/GetCard";
import CustomizeCard from "@/src/widgets/customizeCard/CustomizeCard";
import { useState } from "react";

const pages = [
  <AboutCards />,
  <RatesAndConditions />,
  <CashbackCards />,
  <Questions />,
];

const LoanPage = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(0);

  return (
    <section className={styles.loanPage}>
      <LoanBanner />
      <LoanNavigation setPage={setCurrentPage} />
      {currentPage ? pages[currentPage] : pages[0]}
      <GetCard />
      <CustomizeCard />
    </section>
  );
};
export default LoanPage;

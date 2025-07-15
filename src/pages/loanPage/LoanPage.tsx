import LoanBanner from "@/src/entities/loanBanner/LoanBanner";
import styles from "./styles.module.css";
import LoanNavigation from "@/src/features/loanNavigation/LoanNavigation";
import { Route, Routes } from "react-router";
import AboutCards from "@/src/widgets/aboutCards/AboutCards";
import RatesAndConditions from "@/src/widgets/ratesAndConditions/RatesAndConditions";
import CashbackCards from "@/src/widgets/cashbackCards/CashbackCards";
import Questions from "@/src/widgets/questions/Questions";
import GetCard from "@/src/entities/getCard/GetCard";
import CustomizeCard from "@/src/widgets/customizeCard/CustomizeCard";

const LoanPage = () => {
  return (
    <section className={styles.loanPage}>
      <LoanBanner />
      <LoanNavigation />
      <Routes>
        <Route index element={<AboutCards />} />
        <Route index path="/about" element={<AboutCards />} />
        <Route path="/rates" element={<RatesAndConditions />} />
        <Route path="/cashback" element={<CashbackCards />} />
        <Route path="/faq" element={<Questions />} />
      </Routes>
      <GetCard />
      <CustomizeCard />
    </section>
  );
};
export default LoanPage;

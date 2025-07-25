import React from "react";
import "./nullstyle.css";
import Header from "../widgets/header/Header";
import { Route, Routes } from "react-router";
import MainPage from "../pages/mainPage/MainPage";
import Footer from "../widgets/footer/Footer";
import LoanPage from "../pages/loanPage/LoanPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ContinuationOfApplication from "../pages/continuationOfApplication/ContinuationOfApplication";
import Table from "../features/table/Table";
import PaymentSchedule from "../pages/paymentSchedule/PaymentSchedule";

function App() {
  return (
    <div className="App">
      <Header />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/card" element={<LoanPage />} />
          <Route
            path="/loan/:applicationId"
            element={<ContinuationOfApplication />}
          />
          <Route path="/product" element={<NotFoundPage />} />
          <Route path="/account" element={<NotFoundPage />} />
          <Route path="/resoures" element={<PaymentSchedule />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Provider>
      <Footer />
    </div>
  );
}

export default App;

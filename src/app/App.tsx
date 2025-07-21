import React from "react";
import "./nullstyle.css";
import Header from "../widgets/header/Header";
import { Route, Routes } from "react-router";
import MainPage from "../pages/mainPage/MainPage";
import Footer from "../widgets/footer/Footer";
import LoanPage from "../pages/loanPage/LoanPage";
import LoanRegister from "../pages/loanRegister/LoanRegister";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/card" element={<LoanPage />} />
        <Route path="/loan/:applicationId" element={<LoanRegister />} />
        <Route path="/product" element={<NotFoundPage />} />
        <Route path="/account" element={<NotFoundPage />} />
        <Route path="/resoures" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

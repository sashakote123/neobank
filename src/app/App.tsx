import React from "react";
import "./nullstyle.css";
import Header from "../widgets/header/Header";
import { Route, Routes } from "react-router";
import MainPage from "../pages/mainPage/MainPage";
import Footer from "../widgets/footer/Footer";
import LoanPage from "../pages/loanPage/LoanPage";
import LoanRegister from "../pages/loanRegister/LoanRegister";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/card" element={<LoanPage />} />
        <Route path="/loan/:id" element={<LoanRegister />} />
        <Route path="/product" element={<>Product</>} />
        <Route path="/account" element={<>Account</>} />
        <Route path="/resoures" element={<>Resoures</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

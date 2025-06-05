import React from 'react';
import './nullstyle.css'
import Header from './components/header/Header';
import { Route, Routes } from 'react-router';
import MainPage from './components/mainPage/MainPage';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/product' element={<>Product</>} />
        <Route path='/account' element={<>Account</>} />
        <Route path='/resoures' element={<>Resoures</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

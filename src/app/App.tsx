import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';

import ContinuationOfApplication from '../pages/continuationOfApplication/ContinuationOfApplication';
import EnterCode from '../pages/enterCode/EnterCode';
import LoanPage from '../pages/loanPage/LoanPage';
import MainPage from '../pages/mainPage/MainPage';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage';
import PaymentSchedule from '../pages/paymentSchedule/PaymentSchedule';
import SigningOfDocuments from '../pages/signingOfDocuments/SigningOfDocuments';
import Footer from '../widgets/footer/Footer';
import Header from '../widgets/header/Header';
import './nullstyle.css';
import { store } from './store/store';

function App() {
  return (
    <div className="App" data-testid="app">
      <Header />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/card" element={<LoanPage />} />
          <Route path="/loan/:applicationId" element={<ContinuationOfApplication />} />
          <Route path="/loan/:applicationId/document" element={<PaymentSchedule />} />
          <Route path="/loan/:applicationId/document/sign" element={<SigningOfDocuments />} />
          <Route path="/loan/:applicationId/code" element={<EnterCode />} />
          <Route path="/product" element={<NotFoundPage />} />
          <Route path="/account" element={<NotFoundPage />} />
          <Route path="/resoures" element={<EnterCode />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Provider>
      <Footer />
    </div>
  );
}

export default App;

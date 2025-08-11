import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';

import offersSlice from '@/src/app/store/offersSlice';
import { store } from '@/src/app/store/store';

import LoanPage from './LoanPage';

describe('LoanPage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderWithStore = () => {
    return render(
      <Provider store={store}>
        <LoanPage />
      </Provider>
    );
  };
  test('Компонент отрисован с корректными элементами', () => {
    renderWithStore();
    expect(screen.getByTestId('loanPage')).toBeInTheDocument();
    expect(screen.getByTestId('loanBanner')).toBeInTheDocument();
    expect(screen.getByTestId('loanNavigation')).toBeInTheDocument();
    expect(screen.getByTestId('getCard')).toBeInTheDocument();
  });

  test('Отображает CustomizeCard когда нет офферов', () => {
    const mockStore = {
      ...store,
      getState: () => ({
        offers: {
          offersArray: null,
          currentOffer: null,
        },
      }),
    };

    render(
      <Provider store={mockStore}>
        <LoanPage />
      </Provider>
    );

    expect(screen.getByTestId('customizeCard')).toBeInTheDocument();
    expect(screen.queryByTestId('offers')).not.toBeInTheDocument();
  });

  test('Отображает MessageSendAlert когда форма заполнена', async () => {
    const testStore = configureStore({
      reducer: {
        offers: offersSlice,
      },
      preloadedState: {
        offers: {
          offersArray: [],
          currentOffer: { id: 1, name: 'Current Offer' },
        },
      },
    });
    render(
      <Provider store={testStore}>
        <LoanPage />
      </Provider>
    );

    expect(screen.getByTestId('messageSendAlert')).toBeInTheDocument();
  });

  test('Устанавливает showForm из localStorage', () => {
    localStorage.setItem('messageSend', '1');

    render(
      <Provider store={store}>
        <LoanPage />
      </Provider>
    );

    expect(screen.getByTestId('messageSendAlert')).toBeInTheDocument();
  });
});

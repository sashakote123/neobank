import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';

import offersReducer from '@/src/app/store/offersSlice';

import MessageSendAlert from './MessageSendAlert';

describe('MessageSendAlert', () => {
  const mockStore = configureStore({
    reducer: {
      offers: offersReducer,
    },
  });

  test('Компонент отрисован с корректными элементами', () => {
    render(
      <Provider store={mockStore}>
        <MessageSendAlert />
      </Provider>
    );

    expect(screen.getByTestId('messageSendAlert')).toBeInTheDocument();
    expect(
      screen.getByText('The preliminary decision has been sent to your email.')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'In the letter you can get acquainted with the preliminary decision on the credit card.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Fill new form')).toBeInTheDocument();
  });
});

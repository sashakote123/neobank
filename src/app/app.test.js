import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router';

import { render, screen } from '@testing-library/react';

import App from './App';
import { store } from './store/store';

describe('App Routing', () => {
  const renderWithProvider = (path = []) => {
    return render(
      <BrowserRouter initialEntries={[...path]}>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
  };

  test('Отрисовывает главную страницу по умолчанию', () => {
    renderWithProvider();

    expect(screen.getByTestId('mainPage')).toBeInTheDocument();
  });

  test('Отрисовывает страницу кредита по пути /card', () => {
    render(
      <MemoryRouter initialEntries={['/card']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loanPage')).toBeInTheDocument();
  });

  test('Отрисовывает продолжение заявки по пути /loan/:applicationId', () => {
    render(
      <MemoryRouter initialEntries={['/loan/123']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('continuationPage')).toBeInTheDocument();
  });

  test('Отрисовывает график платежей по пути /loan/:applicationId/document', () => {
    render(
      <MemoryRouter initialEntries={['/loan/123/document']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('paymentSchedule')).toBeInTheDocument();
  });

  test('Отрисовывает подписание документов по пути /loan/:applicationId/document/sign', () => {
    render(
      <MemoryRouter initialEntries={['/loan/123/document/sign']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('signingDocuments')).toBeInTheDocument();
  });

  test('Отрисовывает страницу ввода кода по пути /loan/:applicationId/code', () => {
    render(
      <MemoryRouter initialEntries={['/loan/123/code']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('enterCode')).toBeInTheDocument();
  });

  test('Отрисовывает 404 страницу для неизвестных маршрутов', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('notFound')).toBeInTheDocument();
  });

  test('Всегда отрисовывает Header и Footer', () => {
    render(
      <MemoryRouter initialEntries={['/some-route']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});

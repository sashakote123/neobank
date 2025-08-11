import { BrowserRouter } from 'react-router';

import { fireEvent, render, screen } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Компонент отрисован с корректными элементами', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Credit card')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Resoures')).toBeInTheDocument();
    expect(screen.getByTestId('linkBtn')).toBeInTheDocument();
    expect(screen.getByAltText('burger')).toBeInTheDocument();
  });

  test('Отображает активный класс для текущего маршрута', () => {
    render(
      <BrowserRouter initialEntries={['/card']}>
        <Header />
      </BrowserRouter>
    );

    const creditCardLink = screen.getByText('Credit card');
    fireEvent.click(creditCardLink);
    expect(creditCardLink).toHaveClass('active-link');

    const productLink = screen.getByText('Product');
    expect(productLink).not.toHaveClass('active-link');
    fireEvent.click(productLink);
    expect(productLink).toHaveClass('active-link');
  });

  test('Открывает и закрывает боковое меню по клику на бургер', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('sideMenu')).not.toBeInTheDocument();

    const burgerButton = screen.getByTestId('burger');
    fireEvent.click(burgerButton);

    expect(screen.getByTestId('sideMenu')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('close'));

    expect(screen.queryByTestId('sideMenu')).not.toBeInTheDocument();
  });

  test('Бургер кнопка скрывается при открытом меню', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const burgerButton = screen.getByTestId('burger');
    fireEvent.click(burgerButton);

    expect(screen.queryByTestId('burger')).not.toBeInTheDocument();
  });

  test('Ссылки ведут на правильные маршруты', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const creditCardLink = screen.getByText('Credit card');
    expect(creditCardLink).toHaveAttribute('href', '/card');

    const productLink = screen.getByText('Product');
    expect(productLink).toHaveAttribute('href', '/product');

    const accountLink = screen.getByText('Account');
    expect(accountLink).toHaveAttribute('href', '/account');

    const resourcesLink = screen.getByText('Resoures');
    expect(resourcesLink).toHaveAttribute('href', '/resoures');
  });
});

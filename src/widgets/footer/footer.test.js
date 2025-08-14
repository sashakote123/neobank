import { BrowserRouter } from 'react-router';

import { render, screen } from '@testing-library/react';

import Footer from './Footer';

describe('Footer Component', () => {
  const renderWithProvider = () => {
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  };
  test('Рендерится с основными элементами', () => {
    renderWithProvider();

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('+7 (495) 984 25 13')).toBeInTheDocument();
    expect(screen.getByText('info@neoflex.ru')).toBeInTheDocument();
    expect(screen.getByText('About bank')).toBeInTheDocument();
    expect(screen.getByText('Compliance and business ethics')).toBeInTheDocument();
    expect(screen.getByText(/We use cookies/)).toBeInTheDocument();
  });

  test('Отображает все ссылки из массива linksArray', () => {
    renderWithProvider();

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(12);
  });

  test('Контактные данные имеют правильные атрибуты', () => {
    renderWithProvider();

    const phoneLink = screen.getByText('+7 (495) 984 25 13');
    expect(phoneLink).toHaveAttribute('href', 'tel:+74959842513');

    const emailLink = screen.getByText('info@neoflex.ru');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@neoflex.ru');
  });

  test('Ссылки в футере ведут на правильные адреса', () => {
    renderWithProvider();

    const aboutBankLink = screen.getByText('About bank');
    expect(aboutBankLink).toHaveAttribute('href', '!#');

    const complianceLink = screen.getByText('Compliance and business ethics');
    expect(complianceLink).toHaveAttribute('href', '!#');
  });

  test('Отображает уведомление о cookies', () => {
    renderWithProvider();

    const cookiesAlert = screen.getByText(/We use cookies/);
    expect(cookiesAlert).toBeInTheDocument();
    expect(cookiesAlert).toHaveClass('footer__alert');
  });
});

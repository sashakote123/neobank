import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Support from './Support';

describe('Map', () => {
  test('Компонент отрисован с корректными элементами', () => {
    render(<Support />);
    const title = screen.getByTestId('title');
    const subtitle = screen.getByTestId('subtitle');
    const subsubtitle = screen.getByTestId('subsubtitle');
    const form = screen.getByTestId('form');

    const button = screen.getByTestId('button');

    expect(title).toHaveTextContent('Support');
    expect(subtitle).toHaveTextContent('Subscribe Newsletter & get');
    expect(subsubtitle).toHaveTextContent('Bank News');
    expect(form).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('У картинок корректная ссылка и атрибуты', () => {
    render(<Support />);
    const inputimg = screen.getByTestId('inputimg');
    const sendBtnImage = screen.getByTestId('sendBtnImage');

    expect(inputimg).toHaveAttribute('src', 'inputImg.svg');
    expect(inputimg).toHaveAttribute('alt', 'inputImg');

    expect(sendBtnImage).toHaveAttribute('src', 'sendBtnImage.svg');
    expect(sendBtnImage).toHaveAttribute('alt', 'sendBtnImage');
  });

  test('Input корректный', () => {
    render(<Support />);
    const input = screen.getByTestId('input');

    expect(input).toContainHTML('');
    expect(input).toHaveAttribute('placeholder', 'Your email');
    expect(input).toHaveAttribute('type', 'mail');
  });

  test('Input показывает ошибку при пустом поле', async () => {
    render(<Support />);

    fireEvent.click(screen.getByTestId('button'));

    await waitFor(() => {
      expect(screen.getByTestId('requireError')).toHaveTextContent('Это поле обязательно');
    });
  });

  test('Input показывает ошибку при невалидном поле', async () => {
    render(<Support />);
    const input = screen.getByTestId('input');

    fireEvent.input(input, { target: { value: '12312123' } });
    fireEvent.click(screen.getByTestId('button'));

    await waitFor(() => {
      expect(screen.getByTestId('validateError')).toHaveTextContent(
        'Введите корректный адрес почты'
      );
    });
  });

  test('Показывается всплывающее окно при валидном вводе данных', async () => {
    render(<Support />);
    const input = screen.getByTestId('input');

    fireEvent.input(input, { target: { value: 'test@mail.com' } });
    fireEvent.click(screen.getByTestId('button'));

    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent('Вы подписались на рассылку!');
    });
  });
});

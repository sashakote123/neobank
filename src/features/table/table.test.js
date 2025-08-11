import { fireEvent, render, screen } from '@testing-library/react';

import Table from './Table';

jest.mock('./assets/triangle.svg', () => 'triangle.svg');

const mockData = [
  { number: 1, name: 'Sasha', date: '2023-01-01' },
  { number: 2, name: 'Masha', date: '2022-05-10' },
  { number: 3, name: 'Pasha', date: '2024-03-15' },
];

describe('Table component', () => {
  test('Отрисовывает таблицу с заголовками и строками', () => {
    render(<Table tableArray={mockData} />);

    expect(screen.getByRole('columnheader', { name: /number/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /date/i })).toBeInTheDocument();

    expect(screen.getByText('Sasha')).toBeInTheDocument();
    expect(screen.getByText('Masha')).toBeInTheDocument();
    expect(screen.getByText('Pasha')).toBeInTheDocument();
  });

  test('Заголовки форматируются корректно', () => {
    render(<Table tableArray={mockData} />);

    expect(screen.getByText('NUMBER')).toBeInTheDocument();
    expect(screen.getByText('NAME')).toBeInTheDocument();
    expect(screen.getByText('DATE')).toBeInTheDocument();
  });

  test('Сортировка по числовому столбцу (возрастание)', () => {
    render(<Table tableArray={mockData} />);

    fireEvent.click(screen.getByText('NUMBER'));

    const numbers = screen
      .getAllByTestId('item')
      .filter(
        (item) => item.textContent === '1' || item.textContent === '2' || item.textContent === '3'
      );

    expect(numbers[0]).toHaveTextContent('1');
    expect(numbers[1]).toHaveTextContent('2');
    expect(numbers[2]).toHaveTextContent('3');
  });

  test('Сортировка по числовому столбцу (убывание)', () => {
    render(<Table tableArray={mockData} />);

    fireEvent.click(screen.getByText('NUMBER'));
    fireEvent.click(screen.getByText('NUMBER'));

    const numbers = screen
      .getAllByTestId('item')
      .filter(
        (item) => item.textContent === '1' || item.textContent === '2' || item.textContent === '3'
      );

    expect(numbers[0]).toHaveTextContent('3');
    expect(numbers[1]).toHaveTextContent('2');
    expect(numbers[2]).toHaveTextContent('1');
  });

  test('Сортировка по дате (возрастание)', () => {
    render(<Table tableArray={mockData} />);

    fireEvent.click(screen.getByText('DATE'));

    const dates = screen
      .getAllByTestId('item')
      .filter(
        (item) =>
          item.textContent === '2023-01-01' ||
          item.textContent === '2022-05-10' ||
          item.textContent === '2024-03-15'
      );

    expect(dates[0]).toHaveTextContent('2022-05-10');
    expect(dates[1]).toHaveTextContent('2023-01-01');
    expect(dates[2]).toHaveTextContent('2024-03-15');
  });

  test('Сортировка по дате (убывание)', () => {
    render(<Table tableArray={mockData} />);

    fireEvent.click(screen.getByText('DATE'));
    fireEvent.click(screen.getByText('DATE'));

    const dates = screen
      .getAllByTestId('item')
      .filter(
        (item) =>
          item.textContent === '2023-01-01' ||
          item.textContent === '2022-05-10' ||
          item.textContent === '2024-03-15'
      );

    expect(dates[2]).toHaveTextContent('2022-05-10');
    expect(dates[1]).toHaveTextContent('2023-01-01');
    expect(dates[0]).toHaveTextContent('2024-03-15');
  });

  test('Иконка сортировки меняет стиль при активной сортировке', () => {
    render(<Table tableArray={mockData} />);

    const amountHeader = screen.getByText('NUMBER');
    fireEvent.click(amountHeader);

    const icon = screen.getAllByTestId('headerImg')[0];
    expect(icon).toHaveClass('active');
    expect(icon).toHaveClass('rotateDown');

    fireEvent.click(amountHeader);
    expect(icon).toHaveClass('rotateUp');
  });
});

import { render, screen } from '@testing-library/react';

import GetCard from './GetCard';

const stepsArray = [
  'Fill out an online application - you do not need to visit the bank',
  "Find out the bank's decision immediately after filling out the application",
  'The bank will deliver the card free of charge, wherever convenient, to your city',
];
describe('GetCard', () => {
  test('Компонент отрисован с корректными элементами', () => {
    render(<GetCard />);

    expect(screen.getByTestId('getCard')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toHaveTextContent('How to get a card');
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

  test('Отображаются все шаги из массива', () => {
    render(<GetCard />);

    const items = screen.getAllByTestId('listitem');
    expect(items).toHaveLength(stepsArray.length);

    stepsArray.forEach((step, index) => {
      expect(screen.getByText(step)).toBeInTheDocument();
      expect(screen.getByText(`${index + 1}`)).toBeInTheDocument();
    });
  });
});

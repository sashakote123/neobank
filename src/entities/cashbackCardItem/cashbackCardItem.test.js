import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CashbackCardItem from './CashbackCardItem';

describe('cashbackCardItem', () => {
  test('Item rendered', () => {
    render(<CashbackCardItem title="CardTitle" subtitle="CardSubTitle" />);
    const title = screen.getByTestId('header');
    const subtitle = screen.getByTestId('subtitle');

    expect(title).toHaveTextContent('CardTitle');
    expect(subtitle).toHaveTextContent('CardSubTitle');
  });

  test('Missing props', () => {
    render(<CashbackCardItem title={undefined} subtitle={undefined} />);
    const title = screen.getByTestId('header');
    const subtitle = screen.getByTestId('subtitle');

    expect(title).toBeEmptyDOMElement();
    expect(subtitle).toBeEmptyDOMElement();
  });
});

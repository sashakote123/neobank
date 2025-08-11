import { MemoryRouter } from 'react-router';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CardBanner from './CardBanner';

describe('CardBanner', () => {
  test('Item rendered', () => {
    render(
      <MemoryRouter>
        <CardBanner />
      </MemoryRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('header2')).toBeInTheDocument();
    expect(screen.getByTestId('header3')).toBeInTheDocument();
    expect(screen.getByTestId('link')).toBeInTheDocument();
  });

  test('Кнопка ссылки корректная', () => {
    render(
      <MemoryRouter>
        <CardBanner />
      </MemoryRouter>
    );

    const linkBtn = screen.getByRole('link', { name: /choose the card/i });
    expect(linkBtn).toHaveAttribute('href', '/card');
  });
});

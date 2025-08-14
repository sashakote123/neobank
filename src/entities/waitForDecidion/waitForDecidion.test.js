import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';

import { fireEvent, render, screen } from '@testing-library/react';

import { store } from '@/src/app/store/store';

import WaitForDecidion from './WaitForDecidion';

describe('WaitForDecidion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Компонент отрисован с корректными элементами', () => {
    const testTitle = 'Test Title';
    const testSubtitle = 'Test Subtitle';

    render(
      <Provider store={store}>
        <WaitForDecidion title={testTitle} subtitle={testSubtitle} />
      </Provider>
    );

    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(testSubtitle)).toBeInTheDocument();
    expect(screen.queryByTestId('linkBtn')).not.toBeInTheDocument();
  });

  test('Отрисовывает кнопку когда btn=true', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <WaitForDecidion title="Title" subtitle="Subtitle" btn />
        </Provider>
      </MemoryRouter>
    );

    const button = screen.getByTestId('linkBtn');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('View other offers of our bank');
  });

  test('Кнопка ссылает на главную страницу', () => {
    render(
      <MemoryRouter initialEntries={['/route']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<div data-testid="mainPage">Main Page</div>} />
            <Route path="*" element={<div>Other Page</div>} />
          </Routes>
          <WaitForDecidion title="Title" subtitle="Subtitle" btn />
        </Provider>
      </MemoryRouter>
    );

    const button = screen.getByTestId('linkBtn');
    fireEvent.click(button);

    expect(screen.getByTestId('mainPage')).toBeInTheDocument();
  });
});

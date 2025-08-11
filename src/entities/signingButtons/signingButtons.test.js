import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { fireEvent, render, screen } from '@testing-library/react';

import { store } from '@/src/app/store/store';
import { loanApi } from '@/src/shared/api/service';

import SigningButtons from './SigningButtons';

jest.mock('@/src/shared/api/service', () => {
  const originalModule = jest.requireActual('@/src/shared/api/service');
  return {
    ...originalModule,
    loanApi: {
      ...originalModule.loanApi,
      useSignDocumentMutation: jest.fn(),
    },
  };
});

describe('SigningButtons', () => {
  const mockSetIsShowForm = jest.fn();
  const mockSignDocument = jest.fn();

  beforeEach(() => {
    jest.mock('react-router', () => ({
      ...jest.requireActual('react-router'),
      useParams: () => ({ applicationId: '123' }),
    }));

    loanApi.useSignDocumentMutation.mockReturnValue([mockSignDocument, { isLoading: false }]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <SigningButtons setIsShowForm={mockSetIsShowForm} />
        </BrowserRouter>
      </Provider>
    );
  };

  test('Компонент отрисовывается с корректными элементами', () => {
    renderWithProvider();

    expect(screen.getByTestId('btnbox')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
    expect(screen.getByText('I agree')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  test('Чекбокс меняет состояние при клике', () => {
    renderWithProvider();

    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test('Кнопка Send неактивна при неотмеченном чекбоксе', () => {
    renderWithProvider();

    const sendButton = screen.getByText('Send');
    expect(sendButton).toHaveStyle('opacity: 0.5');
    expect(sendButton).toHaveStyle('cursor: default');
  });

  test('Кнопка Send активна при отмеченном чекбоксе', () => {
    renderWithProvider();

    fireEvent.click(screen.getByTestId('checkbox'));
    const sendButton = screen.getByText('Send');
    expect(sendButton).toHaveStyle('opacity: 1');
    expect(sendButton).toHaveStyle('cursor: pointer');
  });

  test('При загрузке отображается Loading...', () => {
    loanApi.useSignDocumentMutation.mockReturnValue([mockSignDocument, { isLoading: true }]);

    renderWithProvider();
    fireEvent.click(screen.getByTestId('checkbox'));

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

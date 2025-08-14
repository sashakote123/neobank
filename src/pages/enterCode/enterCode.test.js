import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { render, screen } from '@testing-library/react';

import { store } from '@/src/app/store/store';
import useApplicationStep from '@/src/shared/hooks/useApplicationStep';

import EnterCode from './EnterCode';

jest.mock('@/src/shared/hooks/useApplicationStep');

describe('EnterCode', () => {
  const mockUseApplicationStep = useApplicationStep;

  beforeEach(() => {
    mockUseApplicationStep.mockReturnValue({
      isShowForm: false,
      setIsShowForm: jest.fn(),
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <EnterCode />
        </BrowserRouter>
      </Provider>
    );
  };

  test('Компонент отрисовывается с корректными элементами', () => {
    renderWithProvider();

    expect(screen.getByText('Please enter confirmation code')).toBeInTheDocument();
    expect(screen.getByTestId('codeForm')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Congratulations!')).not.toBeInTheDocument();
  });

  test('Отображается состояние загрузки', () => {
    mockUseApplicationStep.mockReturnValue({
      isShowForm: false,
      setIsShowForm: jest.fn(),
      isLoading: true,
    });

    renderWithProvider();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Please, wait')).toBeInTheDocument();
    expect(screen.queryByTestId('codeForm')).not.toBeInTheDocument();
  });

  test('Отображается состояние после успешного ввода кода', () => {
    mockUseApplicationStep.mockReturnValue({
      isShowForm: true,
      setIsShowForm: jest.fn(),
      isLoading: false,
    });

    renderWithProvider();

    expect(
      screen.getByText('Congratulations! You have completed your new credit card.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Your credit card will arrive soon. Thank you for choosing us!')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('codeForm')).not.toBeInTheDocument();
  });
});

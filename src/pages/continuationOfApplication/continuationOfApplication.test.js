import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';

import { store } from '@/src/app/store/store';
import useApplicationStep from '@/src/shared/hooks/useApplicationStep';

import ContinuationOfApplication from './ContinuationOfApplication';

jest.mock('@/src/shared/hooks/useApplicationStep');

describe('ContinuationOfApplication', () => {
  const mockUseApplicationStep = useApplicationStep;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseApplicationStep.mockReturnValue({
      isShowForm: false,
      setIsShowForm: jest.fn(),
      isLoading: false,
    });
  });

  const renderWithStore = () => {
    return render(
      <Provider store={store}>
        <ContinuationOfApplication />
      </Provider>
    );
  };

  test('Компонент отрисован с корректными элементами', () => {
    renderWithStore();

    expect(screen.getByTestId('continuationPage')).toBeInTheDocument();
    expect(screen.getByText('Continuation of the application')).toBeInTheDocument();
    expect(screen.getByText('Step 2 of 5')).toBeInTheDocument();
  });

  test('Отображает состояние загрузки', () => {
    mockUseApplicationStep.mockReturnValue({
      isShowForm: false,
      setIsShowForm: jest.fn(),
      isLoading: true,
    });

    renderWithStore();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Please, wait')).toBeInTheDocument();
  });

  test('Отображает состояние после отправки формы', () => {
    mockUseApplicationStep.mockReturnValue({
      isShowForm: true,
      setIsShowForm: jest.fn(),
      isLoading: false,
    });

    renderWithStore();

    expect(screen.getByText('Wait for a decision on the application')).toBeInTheDocument();
    expect(
      screen.getByText('The answer will come to your mail within 10 minutes')
    ).toBeInTheDocument();
  });

  test('Отображает форму продолжения по умолчанию', () => {
    renderWithStore();

    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Wait for a decision')).not.toBeInTheDocument();
  });
});

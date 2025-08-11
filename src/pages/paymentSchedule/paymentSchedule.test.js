import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { render, screen } from '@testing-library/react';

import { store } from '@/src/app/store/store';
import useApplicationStep from '@/src/shared/hooks/useApplicationStep';

import PaymentSchedule from './PaymentSchedule';

jest.mock('@/src/shared/hooks/useApplicationStep');

describe('PaymentSchedule', () => {
  const mockUseApplicationStep = useApplicationStep;

  const mockTableData = [
    {
      number: 1,
      date: '2023-01-01',
      totalPayment: 1000,
      interestPayment: 100,
      debtPayment: 900,
    },
    {
      number: 2,
      date: '2023-02-01',
      totalPayment: 1000,
      interestPayment: 90,
      debtPayment: 910,
    },
  ];

  beforeEach(() => {
    mockUseApplicationStep.mockReturnValue({
      isShowForm: false,
      setIsShowForm: jest.fn(),
      tableArray: mockTableData,
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
          <PaymentSchedule />
        </BrowserRouter>
      </Provider>
    );
  };

  test('Компонент отрисовывается с корректными элементами в основном состоянии', () => {
    renderWithProvider();

    expect(screen.getByText('Payment Schedule')).toBeInTheDocument();
    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getByTestId('buttons')).toBeInTheDocument();
    expect(screen.queryByText('loading')).not.toBeInTheDocument();
  });

  test('Отображается состояние загрузки', () => {
    mockUseApplicationStep.mockReturnValue({
      isShowForm: false,
      setIsShowForm: jest.fn(),
      tableArray: [],
      isLoading: true,
    });

    renderWithProvider();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Please, wait')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-table')).not.toBeInTheDocument();
  });

  test('Отображается состояние после успешной отправки', () => {
    mockUseApplicationStep.mockReturnValue({
      isShowForm: true,
      setIsShowForm: jest.fn(),
      tableArray: [],
      isLoading: false,
    });

    renderWithProvider();

    expect(screen.getByText('Documents are formed')).toBeInTheDocument();
    expect(
      screen.getByText('Documents for signing will be sent to your email')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('mock-table')).not.toBeInTheDocument();
  });

  test('Отображается "loading" при пустом массиве данных', () => {
    mockUseApplicationStep.mockReturnValue({
      isShowForm: false,
      setIsShowForm: jest.fn(),
      tableArray: [],
      isLoading: false,
    });

    renderWithProvider();

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  test('Отображается правильный шаг в заголовке', () => {
    renderWithProvider();

    expect(screen.getByText('Step 3 of 5')).toBeInTheDocument();
  });
});

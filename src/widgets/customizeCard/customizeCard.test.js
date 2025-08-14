import { Provider } from 'react-redux';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { store } from '@/src/app/store/store';
import { loanApi } from '@/src/shared/api/service';

import CustomizeCard from './CustomizeCard';

jest.mock('@/src/shared/api/service', () => {
  const originalModule = jest.requireActual('@/src/shared/api/service');
  return {
    ...originalModule,
    loanApi: {
      ...originalModule.loanApi,
      useCreateLoanApplicationMutation: jest.fn(),
    },
  };
});

describe('CustomizeCard', () => {
  const renderWithStore = () => {
    return render(
      <Provider store={store}>
        <CustomizeCard />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    loanApi.useCreateLoanApplicationMutation.mockReturnValue([jest.fn(), { isLoading: false }]);
  });
  test('Компонент отрисован с корректными элементами', () => {
    renderWithStore();

    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByTestId('top')).toBeInTheDocument();
    expect(screen.getByTestId('contactForms')).toBeInTheDocument();
    expect(screen.getByTestId('stepsHeader')).toBeInTheDocument();
    expect(screen.getByTestId('selectAmount')).toBeInTheDocument();
    expect(screen.getByTestId('mainBtn')).toBeInTheDocument();
  });

  test("Кнопка 'Fill fields' заполняет форму корректными значениями", () => {
    renderWithStore();

    const fillButton = screen.getByTestId('fillBtn');
    fireEvent.click(fillButton);

    expect(screen.getByDisplayValue('Alex')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Kotikhin')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Andreevich')).toBeInTheDocument();
    expect(screen.getByDisplayValue('sapool@bk.ru')).toBeInTheDocument();
    expect(screen.getByDisplayValue('6 months')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123456')).toBeInTheDocument();
    expect(screen.getByDisplayValue('6666')).toBeInTheDocument();
    expect(screen.getByDisplayValue('27.07.2002')).toBeInTheDocument();
  });

  test("Кнопка 'Continue' отображает 'Loading...' во время загрузки", async () => {
    const mockMutate = jest.fn();
    loanApi.useCreateLoanApplicationMutation.mockReturnValue([mockMutate, { isLoading: true }]);
    renderWithStore();
    expect(screen.getByTestId('mainBtn')).toHaveTextContent('Loading...');
  });

  test('После заполнении формы данные трансформируются', async () => {
    const mockMutate = jest.fn();
    loanApi.useCreateLoanApplicationMutation.mockReturnValue([mockMutate, { isLoading: false }]);

    renderWithStore();

    fireEvent.click(screen.getByTestId('fillBtn'));
    fireEvent.click(screen.getByTestId('mainBtn'));

    await waitFor(() => {
      expect(mockMutate.mock.calls[0][0]).toMatchObject({
        email: 'sapool@bk.ru',
        amount: 200000,
        term: 6,
        lastName: 'Kotikhin',
        firstName: 'Alex',
        birthdate: '2002-07-27',
        middleName: 'Andreevich',
        passportSeries: '6666',
        passportNumber: '123456',
      });
    });
  });
});

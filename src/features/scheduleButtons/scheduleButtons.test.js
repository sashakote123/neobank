import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { fireEvent, render, screen } from '@testing-library/react';

import { store } from '@/src/app/store/store';
import { loanApi } from '@/src/shared/api/service';

import ScheduleButtons from './ScheduleButtons';

jest.mock('@/src/shared/api/service', () => {
  const originalModule = jest.requireActual('@/src/shared/api/service');
  return {
    ...originalModule,
    loanApi: {
      ...originalModule.loanApi,
      useApplyScheduleMutation: jest.fn(),
    },
  };
});

describe('ScheduleButtons Component', () => {
  const mockSetIsShowForm = jest.fn();
  const mockApplySchedule = jest.fn();

  beforeEach(() => {
    jest.mock('react-router', () => ({
      ...jest.requireActual('react-router'),
      useParams: () => ({ applicationId: '123' }),
    }));
    loanApi.useApplyScheduleMutation.mockReturnValue([mockApplySchedule, { isLoading: false }]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ScheduleButtons setIsShowForm={mockSetIsShowForm} />
        </BrowserRouter>
      </Provider>
    );
  };

  test('Компонент отрисовывается с корректными элементами', () => {
    renderWithProvider();

    expect(screen.getByTestId('buttons')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
    expect(screen.getByText('I agree with the payment schedule')).toBeInTheDocument();
  });

  test('Кнопка Deny открывает модальное окно', () => {
    renderWithProvider();

    fireEvent.click(screen.getByText('Deny'));
    expect(screen.getByTestId('denyModal')).toBeInTheDocument();
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
    loanApi.useApplyScheduleMutation.mockReturnValue([mockApplySchedule, { isLoading: true }]);

    renderWithProvider();
    fireEvent.click(screen.getByTestId('checkbox'));

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('Модальное окно закрывается при вызове setIsShow', () => {
    renderWithProvider();

    fireEvent.click(screen.getByText('Deny'));
    expect(screen.getByTestId('denyModal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByTestId('denyModal')).not.toBeInTheDocument();
  });
});

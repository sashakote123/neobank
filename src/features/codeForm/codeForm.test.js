import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { store } from '@/src/app/store/store';
import { loanApi } from '@/src/shared/api/service';

import CodeForm from './CodeForm';

jest.mock('@/src/shared/api/service', () => {
  const originalModule = jest.requireActual('@/src/shared/api/service');
  return {
    ...originalModule,
    loanApi: {
      ...originalModule.loanApi,
      useEnterCodeMutation: jest.fn(),
    },
  };
});

describe('CodeForm', () => {
  const mockSetIsShowForm = jest.fn();
  const mockEnterCode = jest.fn();
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.mock('react-router', () => ({
      ...jest.requireActual('react-router'),
      useParams: () => ({ applicationId: '123' }),
    }));

    loanApi.useEnterCodeMutation.mockReturnValue([
      mockEnterCode,
      { isError: false, isLoading: false, reset: mockReset },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <CodeForm setIsShowForm={mockSetIsShowForm} />
        </BrowserRouter>
      </Provider>
    );
  };

  test('Компонент отрисовывается с корректными элементами', () => {
    renderWithProvider();

    expect(screen.getByTestId('codeForm')).toBeInTheDocument();
    expect(screen.getAllByTestId('input')).toHaveLength(4);
    expect(screen.getAllByAltText('circle')).toHaveLength(4);
    expect(screen.queryByAltText('loader')).not.toBeInTheDocument();
    expect(screen.queryByText('Invalid confirmation code')).not.toBeInTheDocument();
  });

  test('Автоматическая отправка кода при заполнении всех полей', async () => {
    mockEnterCode.mockResolvedValue({});
    renderWithProvider();

    const inputs = screen.getAllByTestId('input');
    fireEvent.change(inputs[3], { target: { value: '4' } });
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });

    await waitFor(() => {
      expect(mockEnterCode).toHaveBeenCalledWith({
        data: ['1', '2', '3', '4'],
      });
    });
  });

  test('Отображается индикатор загрузки', () => {
    loanApi.useEnterCodeMutation.mockReturnValue([
      mockEnterCode,
      { isError: false, isLoading: true, reset: mockReset },
    ]);

    renderWithProvider();

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('Отображается ошибка при неверном коде', () => {
    loanApi.useEnterCodeMutation.mockReturnValue([
      mockEnterCode,
      { isError: true, isLoading: false, reset: mockReset },
    ]);

    renderWithProvider();

    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  test('Сброс ошибки при начале ввода', () => {
    loanApi.useEnterCodeMutation.mockReturnValue([
      mockEnterCode,
      { isError: true, isLoading: false, reset: mockReset },
    ]);

    renderWithProvider();

    const inputs = screen.getAllByTestId('input');

    fireEvent.keyDown(inputs[0], { key: '1' });
    expect(mockReset).toHaveBeenCalled();
  });

  test('Ввод кода перемещает фокус между инпутами', () => {
    renderWithProvider();
    const inputs = screen.getAllByTestId('input');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(inputs[0]).toHaveValue(1);
    expect(inputs[1]).toHaveFocus();

    fireEvent.change(inputs[1], { target: { value: '2' } });
    expect(inputs[1]).toHaveValue(2);
    expect(inputs[2]).toHaveFocus();
  });

  test('Backspace перемещает фокус назад при пустом инпуте', async () => {
    const user = userEvent.setup();
    render(<CodeForm setIsShowForm={mockSetIsShowForm} />);

    const inputs = screen.getAllByTestId('input');

    await user.type(inputs[0], '1');
    await user.type(inputs[1], '2');
    await user.type(inputs[2], '3');
    await user.type(inputs[3], '4');

    expect(inputs[0]).toHaveValue(1);
    expect(inputs[1]).toHaveValue(2);
    expect(inputs[2]).toHaveValue(3);
    expect(inputs[3]).toHaveValue(4);

    await user.click(inputs[2]);
    await user.clear(inputs[2]);
    expect(inputs[2]).toHaveValue(null);
    await user.keyboard('{Backspace}');
    expect(inputs[1]).toHaveFocus();

    await user.clear(inputs[1]);
    await user.keyboard('{Backspace}');
    expect(inputs[0]).toHaveFocus();
  });
});

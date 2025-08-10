import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CalendarInput from "./CalendarInput";
import { FormProvider, useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";

describe("CalendarInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockItem = {
    name: "birthDate",
    title: "Date of Birth",
    required: true,
    placeholder: "DD.MM.YYYY",
    errorAlert: "Invalid date",
    requiredAlert: "Date is required",
  };

  const Wrapper = ({ item = mockItem }) => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <CalendarInput item={item} />
      </FormProvider>
    );
  };

  const TestWrapper = () => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <CalendarInput item={mockItem} />
        <button
          onClick={() => {
            methods.setError(mockItem.name, {
              type: "manual",
              message: "Test error",
            });
          }}
        >
          Set Error
        </button>
        <button
          onClick={async () => {
            methods.setValue(mockItem.name, "01.01.2000");
            await methods.trigger(mockItem.name);
          }}
        >
          Set Valid Value
        </button>
      </FormProvider>
    );
  };

  test("Компонент отрисовывается с корректными элементами", () => {
    render(<Wrapper />);

    expect(screen.getByTestId("inputContainer")).toBeInTheDocument();
    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(mockItem.placeholder)
    ).toBeInTheDocument();
    expect(screen.getByAltText("calendar")).toBeInTheDocument();
  });

  test("Отображает звездочку для обязательных полей", () => {
    render(<Wrapper />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  test("Не отображает звездочку для необязательных полей", () => {
    const nonRequiredItem = { ...mockItem, required: false };
    render(<Wrapper item={nonRequiredItem} />);

    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  test("Отображает кастомное сообщение об ошибке", async () => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText("Set Error"));
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  test("Отображает иконку ошибки при невалидном значении", async () => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText("Set Error"));
    expect(screen.getByAltText("error")).toBeInTheDocument();
  });

  test("Отображает placeholder", () => {
    render(<Wrapper />);

    expect(
      screen.getByPlaceholderText(mockItem.placeholder)
    ).toBeInTheDocument();
  });

  test("Добавляет класс error при наличии ошибки", async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByText("Set Error"));
    const input = screen.getByPlaceholderText(mockItem.placeholder);
    expect(input).toHaveClass("error");
  });

  test("Отображает календарь при клике на кнопку", async () => {
    render(<Wrapper />);
    fireEvent.click(screen.getByAltText("calendar"));
    expect(screen.getByTestId("calendar")).toBeInTheDocument();
  });

  test("Устанавливает значение даты при выборе из календаря", async () => {
    render(<Wrapper />);
    fireEvent.click(screen.getByAltText("calendar"));
    const dayTile = screen.getByText("15");
    fireEvent.click(dayTile);

    await waitFor(() => {
      expect(screen.getByDisplayValue(/15\.\d{2}\.\d{4}/)).toBeInTheDocument();
    });
  });

  test("Отображает иконку успеха при валидном значении", async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByText("Set Valid Value"));
    await waitFor(() => {
      expect(screen.getByAltText("check")).toBeInTheDocument();
    });
  });

  test("Форматирует введенное значение в маску DD.MM.YYYY", async () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText(mockItem.placeholder);
    await userEvent.type(input, "01012000");
    expect(input).toHaveValue("01.01.2000");
  });
});

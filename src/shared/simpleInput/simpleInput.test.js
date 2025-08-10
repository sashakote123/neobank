import { fireEvent, render, screen } from "@testing-library/react";
import SimpleInput from "./SimpleInput";
import { FormProvider, useForm } from "react-hook-form";

describe("SimpleInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockItem = {
    name: "mail",
    title: "Your email",
    required: true,
    placeholder: "Enter email",
    errorAlert: "Invalid email",
    requiredAlert: "Email is required",
  };

  const Wrapper = ({ item = mockItem }) => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <SimpleInput item={item} />
      </FormProvider>
    );
  };

  const TestWrapper = () => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <SimpleInput item={mockItem} />
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
});

import { fireEvent, render, screen } from "@testing-library/react";
import SelectFromForm from "./SelectFromForm";
import { FormProvider, useForm } from "react-hook-form";

describe("SelectFromForm", () => {
  const mockItem = {
    name: "term",
    title: "Loan Term",
    required: true,
    selectorArray: [6, 12, 18, 24],
    errorAlert: "Please select a term",
    placeholder: "Placeholder",
  };

  const Wrapper = ({ item = mockItem }) => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <SelectFromForm item={item} />
      </FormProvider>
    );
  };

  const TestWrapper = ({ mockErrors = {} }) => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <SelectFromForm item={mockItem} />
        <button
          onClick={() => {
            methods.setError(mockItem.name, {
              type: "manual",
              message: mockErrors[mockItem.name]?.message || "Test error",
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

    expect(screen.getByTestId("select-container")).toBeInTheDocument();
    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getAllByTestId("option")).toHaveLength(
      mockItem.selectorArray.length
    );
  });

  test("Корректно отображаются все переданные опции", () => {
    render(<Wrapper />);

    const options = screen.getAllByRole("option");
    mockItem.selectorArray.forEach((option, index) => {
      expect(options[index]).toHaveValue(String(option));
      expect(options[index]).toHaveTextContent(
        typeof option === "number"
          ? `${option} month${option !== 1 ? "s" : ""}`
          : option
      );
    });
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

  test("Отображает правильное количество опций", () => {
    render(<TestWrapper />);

    const options = screen.getAllByTestId("option");
    expect(options).toHaveLength(mockItem.selectorArray.length);
  });

  test("Форматирует числовые опции с правильным множественным числом", () => {
    render(<TestWrapper />);

    const options = screen.getAllByTestId("option");
    expect(options[0]).toHaveTextContent("6 months");
    expect(options[1]).toHaveTextContent("12 months");
  });
});

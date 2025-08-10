import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import SelectAmount from "./SelectAmount";
import userEvent from "@testing-library/user-event";

describe("SelectAmount", () => {
  const Wrapper = ({ min = 100, max = 1000 }) => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <SelectAmount minAmount={min} maxAmount={max} />
      </FormProvider>
    );
  };

  test("Компонент корректно отображает начальное состояние", () => {
    render(<Wrapper min={100} max={1000} />);

    expect(screen.getByTestId("selectAmount")).toBeInTheDocument();
    expect(screen.getByText("Select amount")).toBeInTheDocument();
    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
  });

  test("Компонент изменяет значение через input", async () => {
    render(<Wrapper />);
    const input = screen.getByRole("spinbutton");

    await userEvent.clear(input);
    await userEvent.type(input, "500");

    expect(input).toHaveValue(500);
  });

  //   test('обновляет значение формы при изменении', async () => {
  //     const { getByRole } = render(<Wrapper />);
  //     const formMethods = useForm();
  //     const setValueMock = jest.fn();

  //     jest.spyOn(formMethods, 'setValue').mockImplementation(setValueMock);

  //     const input = getByRole('spinbutton');
  //     await userEvent.clear(input);
  //     await userEvent.type(input, '300');

  //     expect(setValueMock).toHaveBeenCalledWith('amount', 300);
  //   });
});

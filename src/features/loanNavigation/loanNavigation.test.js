import { fireEvent, render, screen } from "@testing-library/react";
import LoanNavigation from "./LoanNavigation";

describe("LoanBanner", () => {
  test("Корректно отображает все ссылки навигации", () => {
    const mockSetPage = jest.fn();
    render(<LoanNavigation setPage={mockSetPage} />);

    expect(screen.getByTestId("loanNavigation")).toBeInTheDocument();
    expect(screen.getAllByTestId("listitem")).toHaveLength(4);
  });

  test("Правильно устанавливает активный класс для первой ссылки по умолчанию", () => {
    const mockSetPage = jest.fn();
    render(<LoanNavigation setPage={mockSetPage} />);

    const firstItem = screen.getByText("About card");
    expect(firstItem).toHaveClass("linkActive");

    const otherItems = screen.getAllByRole("listitem").slice(1);
    otherItems.forEach((item) => {
      expect(item).not.toHaveClass("linkActive");
    });
  });

  test("Вызывает setPage и устанавливает активную ссылку при клике", () => {
    const mockSetPage = jest.fn();
    render(<LoanNavigation setPage={mockSetPage} />);

    const ratesItem = screen.getByText("Rates and conditions");
    fireEvent.click(ratesItem);

    expect(mockSetPage).toHaveBeenCalledWith(1);
    expect(ratesItem).toHaveClass("linkActive");
    expect(screen.getByText("About card")).not.toHaveClass("linkActive");
  });

  test("Корректно обрабатывает клики по разным ссылкам", () => {
    const mockSetPage = jest.fn();
    render(<LoanNavigation setPage={mockSetPage} />);

    fireEvent.click(screen.getByText("Rates and conditions"));
    expect(mockSetPage).toHaveBeenLastCalledWith(1);

    fireEvent.click(screen.getByText("FAQ"));
    expect(mockSetPage).toHaveBeenLastCalledWith(3);
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { NewsNavigation } from "./NewsNavigation";
import "@testing-library/jest-dom";

describe("NewsNavigation", () => {
  const mockOnNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Компонент отрисован с корректными элементами", () => {
    render(
      <NewsNavigation
        currentIndex={0}
        itemsCount={10}
        onNavigate={mockOnNavigate}
        itemWidth={400}
        visibleItems={3}
      />
    );

    expect(screen.getByTestId("prevBtn")).toBeInTheDocument();
    expect(screen.getByTestId("nextBtn")).toBeInTheDocument();
    expect(screen.getByTestId("navContainer")).toHaveClass("news-navigation");
  });

  test("Кнопки имеют правильные классы в зависимости от состояния", () => {
    render(
      <NewsNavigation
        currentIndex={0}
        itemsCount={10}
        onNavigate={mockOnNavigate}
        itemWidth={400}
        visibleItems={3}
      />
    );

    const prevButton = screen.getByTestId("prevBtn");
    const nextButton = screen.getByTestId("nextBtn");

    expect(prevButton).toHaveClass("navigation-button");
    expect(prevButton).not.toHaveClass("navigation-button--active");
    expect(prevButton).toBeDisabled();

    expect(nextButton).toHaveClass(
      "navigation-button",
      "navigation-button--active"
    );
    expect(nextButton).not.toBeDisabled();
  });

  test("Правильно определяет isAtStart и isAtEnd", () => {
    const { rerender } = render(
      <NewsNavigation
        currentIndex={0}
        itemsCount={5}
        onNavigate={mockOnNavigate}
        itemWidth={400}
        visibleItems={2}
      />
    );

    expect(screen.getByTestId("prevBtn")).toBeDisabled();

    rerender(
      <NewsNavigation
        currentIndex={-800}
        itemsCount={5}
        onNavigate={mockOnNavigate}
        itemWidth={400}
        visibleItems={2}
      />
    );
    expect(screen.getByTestId("prevBtn")).not.toBeDisabled();
    expect(screen.getByTestId("nextBtn")).not.toBeDisabled();

    rerender(
      <NewsNavigation
        currentIndex={-1200}
        itemsCount={5}
        onNavigate={mockOnNavigate}
        itemWidth={400}
        visibleItems={2}
      />
    );
    expect(screen.getByTestId("nextBtn")).toBeDisabled();
  });

  test("onNavigate с правильным направлением", () => {
    render(
      <NewsNavigation
        currentIndex={-400}
        itemsCount={5}
        onNavigate={mockOnNavigate}
        itemWidth={400}
        visibleItems={2}
      />
    );

    fireEvent.click(screen.getByTestId("prevBtn"));
    expect(mockOnNavigate).toHaveBeenCalledWith("prev");

    fireEvent.click(screen.getByTestId("nextBtn"));
    expect(mockOnNavigate).toHaveBeenCalledWith("next");
  });

  test("отображает правильные иконки для кнопок", () => {
    render(
      <NewsNavigation
        currentIndex={0}
        itemsCount={5}
        onNavigate={mockOnNavigate}
        itemWidth={400}
        visibleItems={2}
      />
    );

    const prevImg = screen.getByTestId("prevImg");
    const nextImg = screen.getByTestId("nextImg");

    expect(prevImg).toHaveAttribute("src", "left.svg");
    expect(nextImg).toHaveAttribute("src", "right-end.svg");
  });
});

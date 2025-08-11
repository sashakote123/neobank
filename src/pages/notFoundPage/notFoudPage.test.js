import { render, screen } from "@testing-library/react";
import NotFoundPage from "./NotFoundPage";
import { BrowserRouter } from "react-router";

describe("NotFoundPage Component", () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
  };
  test("Компонент отрисован с корректными элементами", () => {
    renderWithRouter();

    expect(screen.getByTestId("notFound")).toBeInTheDocument();
    expect(screen.getByText("Oops...")).toBeInTheDocument();
    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(
      screen.getByText(/This Page doesn`t exist or was removed/)
    ).toBeInTheDocument();
    expect(screen.getByText("Go back")).toBeInTheDocument();
    expect(screen.getByAltText("notFound")).toBeInTheDocument();
  });

  test('Кнопка "Go back" ведет на главную страницу', () => {
    renderWithRouter();

    const backLink = screen.getByText("Go back");
    expect(backLink).toHaveAttribute("href", "/");
  });

  test("Изображение отображается корректно", () => {
    renderWithRouter();

    const image = screen.getByAltText("notFound");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "notfound.png");
  });

  test("Применяет правильные CSS-классы", () => {
    renderWithRouter();

    expect(screen.getByTestId("notFound")).toHaveClass("container");
    expect(screen.getByText("Oops...")).toHaveClass("title");
    expect(screen.getByText("Page not found")).toHaveClass("subtitle");
    expect(screen.getByText(/We suggest you go back/)).toHaveClass("desc");
  });
});

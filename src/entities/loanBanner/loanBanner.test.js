import { render, screen, within } from "@testing-library/react";
import LoanBanner from "./LoanBanner";

describe("LoanBanner", () => {
  test("Компонент отрисован с корректными элементами", () => {
    render(<LoanBanner />);
    expect(screen.getByTestId("title")).toHaveTextContent(
      "Platinum digital credit card"
    );
    expect(screen.getByTestId("subtitle")).toHaveTextContent(
      "Our best credit card. Suitable for everyday spending and shopping. Cash withdrawals and transfers without commission and interest."
    );
    expect(screen.getByTestId("mainBtn")).toHaveTextContent("Apply for a card");

    const list = screen.getByTestId("list");
    const items = within(list).getAllByRole("listitem");
    expect(items.length).toBeLessThanOrEqual(3);
  });

  test("Корректно отображается изображение", () => {
    render(<LoanBanner />);

    const image = screen.getByRole("img", { name: "cardImage" });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "card.png");
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Map from "./Map";

describe("Map", () => {
  test("Компонент отрисован с корректными элементами", () => {
    render(<Map />);
    const title = screen.getByTestId("title");
    const subtitle = screen.getByTestId("subtitle");

    expect(title).toHaveTextContent(
      "You can use our services anywhere in the world"
    );
    expect(subtitle).toHaveTextContent(
      "Withdraw and transfer money online through our application"
    );
  });

  test("У картинок корректная ссылка и атрибуты", () => {
    render(<Map />);
    const map = screen.getByTestId("mapimage");

    expect(map).toHaveAttribute("src", "HugeGlobal.svg");
    expect(map).toHaveAttribute("alt", "map");
  });
});

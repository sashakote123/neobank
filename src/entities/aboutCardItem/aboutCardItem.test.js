import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutCardItem from "./AboutCardItem";

describe("AboutCardItem", () => {
  test("Компонент отрисован с корректными элементами", () => {
    render(
      <AboutCardItem image="/" title="CardTitle" subtitle="CardSubTitle" />
    );
    const title = screen.getByTestId("header");
    const subtitle = screen.getByTestId("subtitle");

    expect(title).toHaveTextContent("CardTitle");
    expect(subtitle).toHaveTextContent("CardSubTitle");
  });

  test("Пропущенные пропсы", () => {
    render(<AboutCardItem image="/" title={undefined} subtitle={undefined} />);
    const title = screen.getByTestId("header");
    const subtitle = screen.getByTestId("subtitle");

    expect(title).toBeEmptyDOMElement();
    expect(subtitle).toBeEmptyDOMElement();
  });

  test("У картинок корректная ссылка и атрибуты", () => {
    render(
      <AboutCardItem image="/test.jpg" title="Title" subtitle="Subtitle" />
    );
    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("src", "/test.jpg");
    expect(image).toHaveAttribute("alt", "card item");
  });
});

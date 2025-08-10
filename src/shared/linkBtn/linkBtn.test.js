import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LinkBtn from "./LinkBtn";
import { MemoryRouter } from "react-router";

describe("LinkBtn", () => {
  test("Компонент отрисован с корректными элементами", () => {
    render(
      <MemoryRouter>
        <LinkBtn title="Link" link="/" />
      </MemoryRouter>
    );
    const link = screen.getByTestId("linkBtn");

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Link");
  });

  test("использует значение по умолчанию для link, если оно не передано", () => {
    render(
      <MemoryRouter>
        <LinkBtn title="Link" />
      </MemoryRouter>
    );

    expect(screen.getByTestId("linkBtn")).toHaveAttribute("href", "/");
  });

  test("вызывает переход по указанному пути при клике", () => {
    const { container, rerender } = render(
      <MemoryRouter initialEntries={["/"]}>
        <LinkBtn title="Clickable Link" link="/card" />
      </MemoryRouter>
    );

    const link = screen.getByTestId("linkBtn");

    fireEvent.click(link);

    expect(container.innerHTML).toContain("/card");

    rerender(
      <MemoryRouter initialEntries={["/"]}>
        <LinkBtn title="Clickable Link" link="/card" />
      </MemoryRouter>
    );

    const link2 = screen.getByTestId("linkBtn");
    fireEvent.click(link2);
    expect(container.innerHTML).toContain("/");
  });

  test("Компонент содержит необходимые стили", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LinkBtn title="Link" link="/" />
      </MemoryRouter>
    );
    const link = screen.getByTestId("linkBtn");

    expect(link).toHaveStyle("transition:", "all 0.4s ease");
    expect(link).toHaveStyle(
      "background:",
      "linear-gradient(80deg, #002190 0%, #002fca 50%, var(--primary-blue) 50%)"
    );
    expect(link).toHaveStyle("background-size:", "200% 100%");
    expect(link).toHaveStyle("background-position:", "right");

    await user.hover(link);
    expect(link).toHaveStyle("background-position:", "left");

    await user.unhover(link);
    expect(link).toHaveStyle("background-position:", "right");
  });
});

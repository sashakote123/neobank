import { getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Currency from "./Currency";
import { Provider } from "react-redux";
import { store } from "@/src/app/store/store";

describe("Currency", () => {
  test("Компонент отрисован с корректными элементами", () => {
    render(
      <Provider store={store}>
        <Currency />
      </Provider>
    );
    expect(screen.getByTestId("title")).toHaveTextContent(
      "Exchange rate in Internet bank"
    );
    expect(screen.getByTestId("subtitle")).toHaveTextContent("Currency");
    expect(screen.getByTestId("right")).toBeInTheDocument();
    // expect(screen.getByTestId("link")).toBeInTheDocument();
  });
});

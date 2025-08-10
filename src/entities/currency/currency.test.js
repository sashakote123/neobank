import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/src/app/store/store";
import Currency from "./Currency";

describe("LoanPage", () => {
  test("Компонент отрисован с корректными элементами", () => {
    render(
      <Provider store={store}>
        <Currency />
      </Provider>
    );
    const page = screen.getByTestId("title");
    expect(page).toBeInTheDocument();
  });
});

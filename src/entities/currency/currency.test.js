import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/src/app/store/store";
import Currency from "./Currency";
import { currencyApi } from "./api/service";

jest.mock("./api/service", () => ({
  ...jest.requireActual("./api/service"),
  currencyApi: {
    ...jest.requireActual("./api/service").currencyApi,
    useGetCurrencyQuery: jest.fn(),
  },
}));
describe("Currency", () => {
  const mockData = [
    { img: "usd-icon.svg", name: "USD", value: 75.5 },
    { img: "eur-icon.svg", name: "EUR", value: 85.25 },
  ];

  beforeEach(() => {
    currencyApi.useGetCurrencyQuery.mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: false,
    });
    jest.clearAllMocks();
  });

  const renderWithProvider = () => {
    return render(
      <Provider store={store}>
        <Currency />
      </Provider>
    );
  };

  test("Компонент отрисован с корректными элементами", () => {
    renderWithProvider();
    expect(screen.getByTestId("title")).toHaveTextContent(
      "Exchange rate in Internet bank"
    );
    expect(screen.getByTestId("subtitle")).toHaveTextContent("Currency");
    expect(screen.getByTestId("right")).toBeInTheDocument();
  });

  test("Отображает состояние загрузки", () => {
    currencyApi.useGetCurrencyQuery.mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: true,
    });

    renderWithProvider();

    expect(screen.queryByText("USD:")).not.toBeInTheDocument();
    expect(screen.queryByText("EUR:")).not.toBeInTheDocument();
  });

  test("Корректно отображает данные при успешном запросе", async () => {
    currencyApi.useGetCurrencyQuery.mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
    });

    renderWithProvider();

    expect(screen.getByText("USD:")).toBeInTheDocument();
    expect(screen.getByText("75.5")).toBeInTheDocument();
    expect(screen.getByText("EUR:")).toBeInTheDocument();
    expect(screen.getByText("85.25")).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(mockData.length + 1);
  });

  test("Отображает сообщение об ошибке при неудачном запросе", () => {
    currencyApi.useGetCurrencyQuery.mockReturnValue({
      data: undefined,
      isError: true,
      isLoading: false,
    });
    renderWithProvider();

    expect(
      screen.getByText("Failed to fetch actual currency")
    ).toBeInTheDocument();
    expect(screen.queryByText("USD:")).not.toBeInTheDocument();
  });

  test("Отображает информацию об обновлении", () => {
    renderWithProvider();

    expect(screen.getByText("Update every 15 minutes")).toBeInTheDocument();
  });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CodeForm from "./CodeForm";
import { loanApi } from "@/src/shared/api/service";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "@/src/app/store/store";

jest.mock("@/src/shared/api/service", () => {
  const originalModule = jest.requireActual("@/src/shared/api/service");
  return {
    ...originalModule,
    loanApi: {
      ...originalModule.loanApi,
      useSignDocumentMutation: jest.fn(),
    },
  };
});

describe("CodeForm", () => {
  const mockSetIsShowForm = jest.fn();
  const mockEnterCode = jest.fn();
  const mockReset = jest.fn();
  const mockApplicationId = "12345";

  beforeEach(() => {
    jest.mock("react-router", () => ({
      ...jest.requireActual("react-router"),
      useParams: () => ({ applicationId: "123" }),
    }));

    loanApi.useSignDocumentMutation.mockReturnValue([
      mockEnterCode,
      { isError: false, isLoading: false, reset: mockReset },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <CodeForm setIsShowForm={mockSetIsShowForm} />
        </BrowserRouter>
      </Provider>
    );
  };

  test("Компонент отрисовывается с корректными элементами", () => {
    renderWithProvider();

    expect(screen.getByTestId("codeForm")).toBeInTheDocument();
    expect(screen.getAllByTestId("input")).toHaveLength(4);
    expect(screen.getAllByAltText("circle")).toHaveLength(4);
    expect(screen.queryByAltText("loader")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Invalid confirmation code")
    ).not.toBeInTheDocument();
  });

  test("Автоматическая отправка кода при заполнении всех полей", async () => {
    mockEnterCode.mockResolvedValue({});
    renderWithProvider();

    const inputs = screen.getAllByTestId("input");

    fireEvent.change(inputs[0], { target: { value: "1" } });
    fireEvent.change(inputs[1], { target: { value: "2" } });
    fireEvent.change(inputs[2], { target: { value: "3" } });
    fireEvent.change(inputs[3], { target: { value: "4" } });

    await waitFor(() => {
      expect(mockEnterCode).toHaveBeenCalledWith({
        data: ["1", "2", "3", "4"],
        applicationId: mockApplicationId,
      });
    });

    await waitFor(() => {
      expect(mockSetIsShowForm).toHaveBeenCalledWith(true);
    });
  });
});

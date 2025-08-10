import { render, screen } from "@testing-library/react";

import ContinuationForms from "./ContinuationForms";
import { loanApi } from "@/src/shared/api/service";
import { Provider } from "react-redux";
import { store } from "@/src/app/store/store";
import { BrowserRouter } from "react-router";

jest.mock("@/src/shared/api/service", () => {
  const originalModule = jest.requireActual("@/src/shared/api/service");
  return {
    ...originalModule,
    loanApi: {
      ...originalModule.loanApi,
      useSendEmployerInfoMutation: jest.fn(),
    },
  };
});

jest.mock("./data", () => ({
  inputsArray: [
    { name: "firstName", title: "First Name", type: "input" },
    { name: "lastName", title: "Last Name", type: "input" },
  ],
  employerInputsArray: [
    { name: "employerName", title: "Employer Name", type: "input" },
    { name: "salary", title: "Salary", type: "input" },
  ],
}));

describe("ContinuationForms", () => {
  const mockSetIsShowForm = jest.fn();
  const mockSendEmployerInfo = jest.fn();

  beforeEach(() => {
    jest.mock("react-router", () => ({
      ...jest.requireActual("react-router"),
      useParams: () => ({ applicationId: "123" }),
    }));
    loanApi.useSendEmployerInfoMutation.mockReturnValue([
      mockSendEmployerInfo,
      { isLoading: false },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ContinuationForms setIsShowForm={mockSetIsShowForm} />
        </BrowserRouter>
      </Provider>
    );
  };

  test("Отрисовывается компонент с полями ввода", () => {
    renderWithProvider();
    expect(screen.getByTestId("form")).toBeInTheDocument();

    expect(screen.getByTestId("topInputs")).toBeInTheDocument();
    expect(screen.getByTestId("bottomInputs")).toBeInTheDocument();

    expect(screen.getByText("Employment")).toBeInTheDocument();
    expect(screen.getByTestId("mainBtn")).toHaveTextContent("Continue");
  });

  test("Кнопка 'Continue' отображает 'Loading...' во время загрузки", () => {
    const mockMutate = jest.fn();
    loanApi.useSendEmployerInfoMutation.mockReturnValue([
      mockMutate,
      { isLoading: true },
    ]);

    renderWithProvider();

    expect(screen.getByTestId("mainBtn")).toHaveTextContent("Loading...");
  });

  test("применяет правильные CSS классы", () => {
    renderWithProvider();

    expect(screen.getByTestId("form")).toHaveClass("form");
    expect(screen.getByText("Employment")).toHaveClass("title");
  });
});

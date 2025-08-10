import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContinuationForms from "./ContinuationForms";
import { loanApi } from "@/src/shared/api/service";
import { Provider } from "react-redux";
import { store } from "@/src/app/store/store";
import { useParams } from "react-router";

jest.mock("@/src/shared/api/service", () => ({
  loanApi: {
    useSendEmployerInfoMutation: jest.fn(),
  },
}));

// jest.mock('@/src/entities/uniInput/UniInput', () => {
//   return ({ item }) => (
//     <div data-testid={`uni-input-${item.name}`}>{item.title}</div>
//   );
// });

// const mockInputsArray = [
//   { name: "firstName", title: "First Name", type: "input" },
//   { name: "lastName", title: "Last Name", type: "input" },
// ];

// const mockEmployerInputsArray = [
//   { name: "employerName", title: "Employer Name", type: "input" },
//   { name: "salary", title: "Salary", type: "input" },
// ];

// jest.mock("./data", () => ({
//   inputsArray: mockInputsArray,
//   employerInputsArray: mockEmployerInputsArray,
// }));

describe("ContinuationForms", () => {
  const mockSetIsShowForm = jest.fn();
  const mockSendEmployerInfo = jest.fn();

  beforeEach(() => {
    useParams.mockReturnValue({ applicationId: "123" });
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
        <ContinuationForms setIsShowForm={mockSetIsShowForm} />
      </Provider>
    );
  };

  test("рендерит форму с полями ввода", () => {
    renderWithProvider();

    expect(screen.getByTestId("uni-input-firstName")).toBeInTheDocument();
    expect(screen.getByTestId("uni-input-lastName")).toBeInTheDocument();
    expect(screen.getByTestId("uni-input-employerName")).toBeInTheDocument();
    expect(screen.getByTestId("uni-input-salary")).toBeInTheDocument();
    expect(screen.getByText("Employment")).toBeInTheDocument();
    expect(screen.getByTestId("main-btn")).toHaveTextContent("Continue");
  });

  test("отображает индикатор загрузки при отправке формы", () => {
    loanApi.useSendEmployerInfoMutation.mockReturnValueOnce([
      mockSendEmployerInfo,
      { isLoading: true },
    ]);

    renderWithProvider();

    expect(screen.getByTestId("main-btn")).toHaveTextContent("Loading...");
  });

  test("отправляет форму с корректными данными", async () => {
    const user = userEvent.setup();
    mockSendEmployerInfo.mockResolvedValueOnce({});

    renderWithProvider();

    await user.click(screen.getByTestId("main-btn"));

    await waitFor(() => {
      expect(mockSendEmployerInfo).toHaveBeenCalled();
    });
  });

  test("использует applicationId из URL", () => {
    useParams.mockReturnValueOnce({ applicationId: "test-id" });

    render(
      <Provider store={store}>
        <ContinuationForms setIsShowForm={mockSetIsShowForm} />
      </Provider>
    );

    expect(useParams).toHaveBeenCalled();
  });

  test("применяет правильные CSS классы", () => {
    render(
      <Provider store={store}>
        <ContinuationForms setIsShowForm={mockSetIsShowForm} />
      </Provider>
    );

    expect(screen.getByRole("form")).toHaveClass("form");
    expect(screen.getByText("Employment")).toHaveClass("title");
  });
});

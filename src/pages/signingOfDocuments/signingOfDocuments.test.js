import { render, screen } from "@testing-library/react";
import SigningOfDocuments from "./SigningOfDocuments";
import useApplicationStep from "@/src/shared/hooks/useApplicationStep";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "@/src/app/store/store";

jest.mock("@/src/shared/hooks/useApplicationStep");

describe("SigningOfDocuments", () => {
  const mockUseApplicationStep = useApplicationStep;

  beforeEach(() => {
    mockUseApplicationStep.mockReturnValue({
      isShowForm: false,
      setIsShowForm: jest.fn(),
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <SigningOfDocuments />
        </BrowserRouter>
      </Provider>
    );
  };
  test("Компонент отрисовывается с корректными элементами", () => {
    renderWithProvider();

    expect(screen.getByText("Signing of documents")).toBeInTheDocument();

    expect(screen.getByText("Information on your card")).toBeInTheDocument();
    expect(screen.getByTestId("btnbox")).toBeInTheDocument();
  });

  test("Отображается состояние после успешной отправки", () => {
    mockUseApplicationStep.mockReturnValue({
      isShowForm: true,
      setIsShowForm: jest.fn(),
      isLoading: false,
    });

    renderWithProvider();

    expect(
      screen.getByText(
        "Documents have been successfully signed and sent for approval"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Within 10 minutes you will be sent a PIN code to your email for confirmation"
      )
    ).toBeInTheDocument();
  });

  test("Ссылка на файл имеет правильный href", () => {
    renderWithProvider();

    const link = screen.getByTestId("fileRef");
    expect(link).toHaveAttribute(
      "href",
      "https://neostudy.neoflex.ru/pluginfile.php/155185/mod_assign/intro/credit-card-offer.pdf"
    );
  });

  test("Отображается правильный шаг в заголовке", () => {
    renderWithProvider();

    expect(screen.getByText("Step 4 of 5")).toBeInTheDocument();
  });
});

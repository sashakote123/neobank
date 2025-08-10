import { render, screen } from "@testing-library/react";
import StepsHeader from "./StepsHeader";

describe("StepsHeader", () => {
  test("корректно отрисовывает заголовок и номер шага", () => {
    const testTitle = "Test Title";
    const testStep = 2;

    render(<StepsHeader title={testTitle} step={testStep} />);

    expect(screen.getByTestId("stepsHeader")).toBeInTheDocument();
    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(`Step ${testStep} of 5`)).toBeInTheDocument();
  });
});

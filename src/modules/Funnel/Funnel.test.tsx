import { fireEvent, render, screen } from "@testing-library/react";
import Funnel, { useFunnelContext } from "./Funnel";

describe("Funnel", () => {
  test("초기 step에 맞는 Step만 렌더링된다", () => {
    render(
      <Funnel initialStep={2}>
        <Funnel.Step index={1}>Step1</Funnel.Step>
        <Funnel.Step index={2}>Step2</Funnel.Step>
      </Funnel>,
    );
    expect(screen.queryByText("Step1")).toBeNull();
    expect(screen.getByText("Step2")).toBeInTheDocument();
  });

  test("goNextStep 함수를 호출하면 다음 step으로 이동한다", () => {
    const { getByRole } = render(
      <Funnel initialStep={1}>
        <Funnel.Step index={1}>
          <GoNextStepButton />
        </Funnel.Step>
        <Funnel.Step index={2}>Step2</Funnel.Step>
      </Funnel>,
    );

    fireEvent.click(getByRole("button", { name: "Go Next Step" }));
    expect(screen.getByText("Step2")).toBeInTheDocument();
  });

  test("goPrevStep 함수를 호출하면 이전 step으로 이동한다", () => {
    const { getByRole } = render(
      <Funnel initialStep={2}>
        <Funnel.Step index={1}>Step1</Funnel.Step>
        <Funnel.Step index={2}>
          <GoPrevStepButton />
        </Funnel.Step>
      </Funnel>,
    );

    fireEvent.click(getByRole("button", { name: "Go Prev Step" }));
    expect(screen.getByText("Step1")).toBeInTheDocument();
  });
});

function GoNextStepButton() {
  const { goNextStep } = useFunnelContext();
  return <button onClick={goNextStep}>Go Next Step</button>;
}

function GoPrevStepButton() {
  const { goPrevStep } = useFunnelContext();
  return <button onClick={goPrevStep}>Go Prev Step</button>;
}

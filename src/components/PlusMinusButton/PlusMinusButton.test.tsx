import { fireEvent, render } from "@testing-library/react";
import PlusMinusButton from "./PlusMinusButton";

describe("PlusMinusButton", () => {
  test("플러스 버튼 클릭 시 onPlus 콜백이 호출된다", () => {
    const onPlus = jest.fn();
    const { getByRole } = render(
      <PlusMinusButton onAddButtonClick={onPlus} onMinusButtonClick={() => {}} quantity={1} />,
    );
    fireEvent.click(getByRole("button", { name: "+" }));
    expect(onPlus).toHaveBeenCalled();
  });

  test("마이너스 버튼 클릭 시 onMinus 콜백이 호출된다", () => {
    const onMinus = jest.fn();
    const { getByRole } = render(
      <PlusMinusButton onAddButtonClick={() => {}} onMinusButtonClick={onMinus} quantity={1} />,
    );
    fireEvent.click(getByRole("button", { name: "-" }));
    expect(onMinus).toHaveBeenCalled();
  });
});

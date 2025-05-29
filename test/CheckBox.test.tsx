import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckBox from "../src/components/CheckBox/CheckBox";

function CheckBoxWrapper() {
  const [selected, setSelected] = useState(true);
  return (
    <CheckBox
      id="test-cb"
      label="테스트 체크박스"
      isSelected={selected}
      onClick={() => setSelected((s) => !s)}
    />
  );
}

describe("<CheckBox />", () => {
  it("페이지에 접속했을 때 체크박스가 활성화된다.", () => {
    render(<CheckBoxWrapper />);

    const img = screen.getByAltText("체크 박스") as HTMLImageElement;
    expect(img.src).toContain("/public/enabledCheck.svg");
  });

  it("버튼을 클릭하면 이미지가 활성에서 비활성으로 토글된다", () => {
    render(<CheckBoxWrapper />);

    const button = screen.getByRole("button");
    const img = screen.getByAltText("체크 박스") as HTMLImageElement;

    fireEvent.click(button);
    expect(img.src).toContain("/public/disabledCheck.svg");

    fireEvent.click(button);
    expect(img.src).toContain("/public/enabledCheck.svg");
  });
});

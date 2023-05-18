import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { OptionContent } from "../src/components/common/selector/optionContent";
import OptionGroup from "../src/components/common/selector/optionGroup";
import React from "react";

/**
 * @jest-environment jsdom
 */

describe("Selector Option의 Content 랜더링 테스트", () => {
  test("custom된 children요소가 없으면 기본 스타일의 Selector Option Content가 랜더링 된다", () => {
    render(<OptionContent />);
    const content = screen.getByTestId("content");

    expect(content).toBeInTheDocument();
  });

  test("custom된 children요소가 있으면 기본 스타일의 custom된 child가 랜더링 된다", () => {
    render(
      <OptionContent asChild>
        <div>content custom</div>
      </OptionContent>
    );
    const customContent = screen.getByTestId("custom-content");

    expect(customContent).toBeInTheDocument();
  });
});

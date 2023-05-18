import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OptionContent from "../src/components/common/selector/optionContent";
import OptionGroup from "../src/components/common/selector/optionGroup";
import OptionIcon from "../src/components/common/selector/optionIcon";

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

describe("Selector Option의 Group 랜더링 테스트", () => {
  test("custom된 children요소가 없으면 기본 스타일의 Selector Option Group 랜더링 된다", () => {
    render(<OptionGroup />);
    const content = screen.getByTestId("group");

    expect(content).toBeInTheDocument();
  });

  test("custom된 children요소가 있으면 기본 스타일의 custom된 child가 랜더링 된다", () => {
    render(
      <OptionGroup asChild>
        <div>content group</div>
      </OptionGroup>
    );
    const customContent = screen.getByTestId("custom-group");

    expect(customContent).toBeInTheDocument();
  });
});

describe("Selector Option의 Icon 랜더링 테스트", () => {
  test("custom된 children요소가 없으면 기본 스타일의 Selector Option CheckIcon 랜더링 된다", () => {
    const { getByAltText } = render(<OptionIcon />);
    const icon = getByAltText("icon");

    expect(icon).toHaveAttribute("src");
  });

  test("custom된 children요소가 있으면 custom된 child가 랜더링 된다", () => {
    const { getByAltText } = render(
      <OptionIcon asChild>
        <img src="test-file-stub" alt="custom-icon" />
      </OptionIcon>
    );
    const icon = getByAltText("custom-icon");

    expect(icon).toHaveAttribute("src");
  });
});

describe("Selector Option 랜더링 테스트", () => {
  test("custom된 children요소가 없으면 기본 스타일의 Selector Option이 랜더링 된다", () => {
    const { getByAltText } = render(<Option />);
    const content = screen.getByTestId("option");

    expect(content).toBeInTheDocument();
  });
});

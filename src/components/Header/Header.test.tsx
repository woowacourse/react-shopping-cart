import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("제목이 화면에 표시된다", () => {
    render(<Header title="장바구니" />);
    expect(screen.getByText("장바구니")).toBeInTheDocument();
  });

  it("제목 클릭 시 handleTitleClick이 호출된다", () => {
    const handleTitleClick = jest.fn();
    render(<Header title="장바구니" handleTitleClick={handleTitleClick} />);
    fireEvent.click(screen.getByText("장바구니"));
    expect(handleTitleClick).toHaveBeenCalled();
  });
});

import { render, screen } from "@testing-library/react";
import Card from "./Card";

test("Card 내부에 children이 잘 렌더링된다", () => {
  render(<Card>내용</Card>);
  expect(screen.getByText("내용")).toBeInTheDocument();
});

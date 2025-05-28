import { render } from "@testing-library/react";
import App from "../src/App";

describe("RTL Test", () => {
  it("should render", () => {
    render(<App />);
    // expect(screen.getByText("react-shopping-cart")).toBeInTheDocument();
  });
});

import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { ROUTE } from "../src/constants/systemConstants";

export function renderWithRouter(ui: ReactElement, route = "/") {
  const router = createMemoryRouter(
    [
      {
        path: ROUTE.CART,
        element: ui,
      },
    ],
    {
      initialEntries: [route],
    }
  );

  return render(<RouterProvider router={router} />);
}

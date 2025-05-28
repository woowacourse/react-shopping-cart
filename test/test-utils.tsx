import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";

export function renderWithRouter(ui: ReactElement, route = "/") {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: ui,
      },
    ],
    {
      initialEntries: [route],
    }
  );

  return render(<RouterProvider router={router} />);
}

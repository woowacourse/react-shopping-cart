import Main from "./pages/Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout";
import { PAGES } from "./constants";

const router = createBrowserRouter(
  [
    {
      path: PAGES.HOME,
      element: <Main />,
    },
    {
      path: PAGES.CART,
      element: <Layout>준비중인 페이지입니다.</Layout>,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export const App = () => {
  return <RouterProvider router={router} />;
};

import { PATH } from "./path";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "../App";
import NavBar from "../components/layout/NavBar";
import Confirm from "../pages/Confirm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<NavBar />}>
      <Route path={PATH.MAIN} element={<App />} />
      <Route path={PATH.CONFIRM} element={<Confirm />} />
    </Route>
  ),
  {
    basename: "/react-shopping-cart",
  }
);
export default function Router() {
  return <RouterProvider router={router} />;
}

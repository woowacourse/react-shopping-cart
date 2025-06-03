import { createHashRouter, RouterProvider } from "react-router";
import * as S from "./App.styles";
import { PATH } from "./constants";
import { MainPage } from "./pages";
import { ErrorProvider } from "./context";
import { ErrorPopup } from "./components";

const router = createHashRouter([
  {
    path: PATH.main,
    element: <MainPage />,
  },
]);

function App() {
  return (
    <S.AppWrapper>
      <ErrorProvider>
        <ErrorPopup />
        <RouterProvider router={router} />
      </ErrorProvider>
    </S.AppWrapper>
  );
}

export default App;

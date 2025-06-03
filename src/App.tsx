import { createHashRouter, RouterProvider } from "react-router";
import * as S from "./App.styles";
import { PATH } from "./constants";
import { MainPage } from "./pages";

const router = createHashRouter([
  {
    path: PATH.main,
    element: <MainPage />,
  },
]);

function App() {
  return (
    <S.AppWrapper>
      <RouterProvider router={router} />
    </S.AppWrapper>
  );
}

export default App;

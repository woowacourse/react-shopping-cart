import { RouterProvider } from "react-router-dom";
import { shoppingCartRoute } from "./route/shoppingCartRoute";
import { SelectedCartProvider } from "./domains/common/context/selectedCartProvider";
import { ErrorProvider } from "./context/errorProvider";

function App() {
  return (
    <ErrorProvider>
      <SelectedCartProvider>
        <RouterProvider router={shoppingCartRoute} />
      </SelectedCartProvider>
    </ErrorProvider>
  );
}

export default App;

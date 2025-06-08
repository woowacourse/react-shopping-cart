import "./App.css";
import { PAGE_URL } from "./constants/PageUrl";
import { steps } from "@/constants/steps";
import { Route, Routes } from "react-router";
import OrderComplete from "./page/OrderComplete/OrderComplete";
import OrderPage from "./page/OrderPage";
import { useFunnel } from "./hooks/Funnel/useFunnel";
import { CartProvider } from "./components/Cart/CartProvider";

function App() {
  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);

  const nextClickHandler = (nextStep: string) => {
    setStep(nextStep);
  };
  const prevClickHandler = (prevStep: string) => {
    setStep(prevStep);
  };
  const resetClickHandler = () => {
    setStep(steps[0]);
  };

  return (
    <Routes>
      <CartProvider>
        <Route
          path={PAGE_URL.HOME}
          element={
            <OrderPage
              nextClickHandler={nextClickHandler}
              prevClickHandler={prevClickHandler}
              Funnel={Funnel}
              Step={Step}
              currentStep={currentStep}
            />
          }
        />
        <Route
          path={PAGE_URL.ORDER_COMPLETE}
          element={<OrderComplete onReset={resetClickHandler} />}
        />
      </CartProvider>
    </Routes>
  );
}

export default App;

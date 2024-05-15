import { useRecoilValueLoadable } from "recoil";
import "./App.css";
import CartList from "./components/CartList";
import RecoilSuspense from "./components/common/RecoilSuspense";
import { cartListState } from "./recoil/selectors";

function App() {
  const cartList = useRecoilValueLoadable(cartListState);

  return (
    <>
      <RecoilSuspense loadable={cartList} fallback={<div>안쪽 로딩 중...</div>}>
        <CartList items={cartList.contents} />
        {/* <CheckoutSummary /> */}
      </RecoilSuspense>
    </>
  );
}

export default App;

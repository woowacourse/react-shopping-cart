import { Suspense } from "react";
import {
  CartDescription,
  CartItemList,
  Header,
  Footer,
  Layout,
  CartPrice,
} from "./components";

function App() {
  return (
    <div>
      <Header />
      <Layout>
        <Suspense fallback={<div>Loading</div>}>
          <CartDescription />
          <CartItemList />
          <CartPrice />
        </Suspense>
      </Layout>
      <Footer />
    </div>
  );
}

export default App;

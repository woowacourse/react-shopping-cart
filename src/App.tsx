// import "./App.css";
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
        <CartDescription count={2} />
        <CartItemList />
        <CartPrice />
      </Layout>
      <Footer />
    </div>
  );
}

export default App;

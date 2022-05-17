import Header from "./components/header/Header";
import ProductList from "./pages/home/components/product-list/ProductList";

import styles from "./app.module.scss";

function App() {
  return (
    <div>
      <Header className={styles.header} />
      <div className="wrapper">
        <ProductList />
      </div>
    </div>
  );
}

export default App;

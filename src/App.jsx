import Header from "@shared/header/Header";
import ProductList from "@home/components/product-list/ProductList";
import styles from "@/app.module";

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

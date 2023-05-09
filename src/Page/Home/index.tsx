import Header from '../../components/Header';
import ProductItemList from '../../components/ProductItemList';
import { products } from '../../data/mockData';
import styles from './index.module.css';

const Home = () => {
  return (
    <>
      <Header />
      <main className={styles['main-container']}>
        <ProductItemList products={products} />
      </main>
    </>
  );
};

export default Home;

import ProductItem from '../../components/ProductItem';
import { useEffect } from 'react';
import useProduct from '../../hooks/useProduct';
import useCart from '../../hooks/useCart';

function Home() {
  const { productList, loadProductList } = useProduct();
  const { loadCartList } = useCart();

  useEffect(() => {
    loadProductList();
    loadCartList();
  }, [loadProductList]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
      {productList.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Home;

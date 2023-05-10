import ProductItem from '../../components/ProductItem';
import { useEffect } from 'react';
import useProduct from '../../hooks/useProduct';

function Home() {
  const { productList, loadProductList } = useProduct();

  useEffect(() => {
    loadProductList();
  }, [loadProductList]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
      {productList.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imageUrl="http://placekitten.com/200/200"
          quantity={0}
        />
      ))}
    </div>
  );
}

export default Home;

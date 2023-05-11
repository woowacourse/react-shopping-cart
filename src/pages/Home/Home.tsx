import ProductItem from '../../components/ProductItem';
import { useEffect } from 'react';
import useProduct from '../../hooks/useProduct';
import useCart from '../../hooks/useCart';
import { Column, Row } from '../../style/style';

function Home() {
  const { productList, loadProductList } = useProduct();
  const { loadCartList } = useCart();

  useEffect(() => {
    loadProductList();
    loadCartList();
  }, [loadProductList, loadCartList]);

  return (
    <Row>
      {productList.map((product) => (
        <Column key={product.id}>
          <ProductItem product={product} />
        </Column>
      ))}
    </Row>
  );
}

export default Home;

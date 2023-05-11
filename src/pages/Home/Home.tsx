import ProductItem from '../../components/ProductItem';
import { useCallback, useEffect } from 'react';
import useProduct from '../../hooks/useProduct';
import useCart, { cartState } from '../../hooks/useCart';
import { Column, Row } from '../../style/style';
import { useSetRecoilState } from 'recoil';
import mockApi from '../../api/mockApi';

function Home() {
  const { productList, loadProductList } = useProduct();
  // const { loadCartList } = useCart();
  const setCartList = useSetRecoilState(cartState);

  const loadCartList = useCallback(async () => {
    console.log('loaded');
    const response = await mockApi('/cart-items');
    const cartList = response.data;
    setCartList(JSON.parse(cartList));
  }, [setCartList]);

  useEffect(() => {
    loadCartList();
  }, [loadCartList]);

  useEffect(() => {
    loadProductList();
  }, [loadProductList]);

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

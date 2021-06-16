import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { fetchProductItem } from '../redux/product';
import styled from 'styled-components';
import { COLOR } from '../constants/color';
import ProductImage, { PRODUCT_IMAGE_TYPE } from '../components/productImage/ProductImage';
import Button, { BUTTON_TYPE } from '../components/button/Button';
import { insertShoppingCartItem } from '../redux/shoppingCart';

const Container = styled.div`
  width: 640px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin: 0 auto;
  padding-top: 40px;
  margin-bottom: 34px;
`;

const TopContent = styled.div`
  margin: 0 auto;
`;

const Title = styled.div`
  margin-top: 21px;
  padding-bottom: 33px;
  font-weight: 700;
  font-size: 32px;
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 34px 20px 54px 20px;
  border-top: 4px solid ${COLOR.GRAY_400};
  font-size: 24px;
  line-height: 24px;
`;

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { product_id } = state;
  const product = useSelector((state) => state.product.productItem);

  const handleShoppingCart = () => {
    const shoppingCartItem = { ...product, isChecked: true, quantity: 1 };

    dispatch(insertShoppingCartItem(shoppingCartItem));
  };

  useEffect(() => {
    dispatch(fetchProductItem(product_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <TopContent>
        <ProductImage type={PRODUCT_IMAGE_TYPE.LARGE} src={product.image_url} alt={product.name} />
        <Title>{product.name}</Title>
      </TopContent>
      <Description>
        {!!Object.keys(product).length && <span>{product.price.toLocaleString('ko-KR')}원</span>}
      </Description>
      <Button onClick={handleShoppingCart} type={BUTTON_TYPE.LARGE}>
        장바구니
      </Button>
    </Container>
  );
};

export default ProductDetail;

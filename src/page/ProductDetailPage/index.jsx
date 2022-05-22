import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button, Image } from 'components';
import Line from 'components/Line';
import theme from 'components/theme';

import Styled from 'page/ProductDetailPage/index.style';

import store from 'store/store';
import { doPutProductToCart } from 'actions/actionCreator';
import autoComma from 'utils/autoComma';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { shoppingCart, products } = useSelector(state => state.reducer);
  const { image, name, price, isInCart } = products.find(product => product.id === Number(id));

  const putCart = () => {
    if (isInCart) {
      const { quantity } = shoppingCart.find(product => product.id === Number(id));

      store.dispatch(doPutProductToCart({ id: Number(id), quantity: quantity + 1 }));
    } else {
      store.dispatch(doPutProductToCart({ id: Number(id), quantity: 1 }));
    }
    navigate('/cart');
  };

  return (
    <Styled.ProductDetailPage>
      <Styled.ProductContainer>
        <Image src={image} alt={name} size="570px" />
        <Styled.ProductName>{name}</Styled.ProductName>
        <Line margin="33px 0" />
        <Styled.PriceContainer>
          <Styled.PriceTag>금액</Styled.PriceTag>
          <Styled.ProductPrice>{autoComma(price)}</Styled.ProductPrice>
        </Styled.PriceContainer>
        <Button
          bg={theme.colors.brown}
          width="638px"
          height="98px"
          style={{ fontWeight: 700, fontSize: '32px', lineHeight: '21px', marginTop: '57px' }}
          onClick={putCart}
        >
          장바구니
        </Button>
      </Styled.ProductContainer>
    </Styled.ProductDetailPage>
  );
};

export default ProductDetailPage;

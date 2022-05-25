import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Image } from 'components';

import store from 'store/store';
import { doPutProductToCart } from 'actions/actionCreator';
import autoComma from 'utils/autoComma';
import { LINK } from 'constants';
import Styled from 'page/ProductDetailPage/index.style';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { shoppingCart, products } = useSelector(state => state.reducer);
  const { image, name, price } = products.find(product => product.id === Number(id));
  const isInCart = shoppingCart.some(product => product.id === Number(id));

  const putCart = () => {
    if (isInCart) {
      const { quantity } = shoppingCart.find(product => product.id === Number(id));

      store.dispatch(doPutProductToCart({ id: Number(id), quantity: quantity + 1 }));
    } else {
      store.dispatch(doPutProductToCart({ id: Number(id), quantity: 1 }));
    }

    navigate(LINK.TO_CART);
  };

  return (
    <Styled.Container>
      <Styled.ProductContainer>
        <Image src={image} alt={name} size="570px" />
        <Styled.ProductName>{name}</Styled.ProductName>
        <Styled.Division />
        <Styled.PriceContainer>
          <Styled.PriceTag>금액</Styled.PriceTag>
          <Styled.ProductPrice>{autoComma(price)}</Styled.ProductPrice>
        </Styled.PriceContainer>
        <Styled.PutCartButton onClick={putCart}>장바구니</Styled.PutCartButton>
      </Styled.ProductContainer>
    </Styled.Container>
  );
};

export default ProductDetailPage;

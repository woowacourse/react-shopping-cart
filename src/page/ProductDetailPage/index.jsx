import { useNavigate, useParams } from 'react-router-dom';

import { Image } from 'components';

import store from 'store/store';
import { doPutProductToCart } from 'actions/actionCreator';
import autoComma from 'utils/autoComma';
import { LINK } from 'constants';
import Styled from 'page/ProductDetailPage/index.style';
import useProduct from 'hooks/useProduct';
import useCart from 'hooks/useCart';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);
  const [{ image, name, price }] = useProduct(id);
  const [isInCart, product] = useCart(id);

  const putCart = () => {
    store.dispatch(doPutProductToCart({ id: id, quantity: isInCart ? product.quantity + 1 : 1 }));
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

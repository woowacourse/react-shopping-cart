import { VFC } from 'react';
import { useHistory } from 'react-router';
import useCart from '../../hooks/useCart';
import { Product } from '../../types';
import { KRCurrency } from '../../utils/format';
import {
  AddCartButton,
  PriceContainer,
  ProductImg,
  ProductName,
  StyledProductDetailSection,
} from './styles';

interface Props {
  product: Product;
}

const ProductDetailSection: VFC<Props> = ({ product }) => {
  const { image_url, name, price } = product;
  const { addItem } = useCart();
  const history = useHistory();

  const addItemToCart = () => {
    if (!window.confirm('상품을 장바구니에 추가하시겠습니까?')) return;

    addItem(product);
    history.push('/shoppingCart');
  };

  return (
    <StyledProductDetailSection>
      <ProductImg src={image_url} alt="제품이미지" />
      <ProductName>{name}</ProductName>
      <PriceContainer>
        <span>금액</span>
        <span>{KRCurrency(price)}</span>
      </PriceContainer>
      <AddCartButton type="button" onClick={addItemToCart}>
        장바구니
      </AddCartButton>
    </StyledProductDetailSection>
  );
};

export default ProductDetailSection;

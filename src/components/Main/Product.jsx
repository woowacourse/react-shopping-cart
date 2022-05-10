import styled from 'styled-components';
import ProductImage from './ProductImage';
import CartIcon from '../common/styles/CartIcon';
import { CART_ICON_SIZE } from '../../constants';

// props로 id를 받고, api call을 통해 상품 데이터를 가져올 예정
function Product() {
  return (
    <div>
      <ProductImage src="https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[72]_20210415140949967.jpg" />
      <Styled.ProductInfoContainer>
        <Styled.ProductInfoWrapper>
          <Styled.ProductName>PET보틀-정사각(420ml)</Styled.ProductName>
          <span className="product-info__price">43,000원</span>
        </Styled.ProductInfoWrapper>
        <CartIcon size={CART_ICON_SIZE.SMALL} color="black" />
      </Styled.ProductInfoContainer>
    </div>
  );
}

export default Product;

const Styled = {
  ProductInfoContainer: styled.div`
    display: flex;
    justify-content: space-between;
    width: 280px;
    padding: 5px;
  `,
  ProductInfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ProductName: styled.span`
    font-size: 12px;
  `,
};

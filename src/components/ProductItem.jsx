import styled, { css } from 'styled-components';
import Image from 'components/shared/image/Image';
import ShoppingCartIcon from 'components/shared/icon/ShoppingCartIcon';

const StyledProductItem = styled.div`
  width: 282px;
`;

const StyledProductContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 75px;
`;

const StyledProductText = styled.p`
  font-weight: 400;
  letter-spacing: 0.5px;
  color: #333333;

  ${props =>
    props.name &&
    css`
      font-size: 16px;
      line-height: 22px;
    `}

  ${props =>
    props.price &&
    css`
      font-size: 20px;
      line-height: 27px;
    `}
`;

const ProductItem = ({ src, name, price }) => {
  return (
    <StyledProductItem>
      <Image src={src} />
      <StyledProductContainer>
        <div>
          <StyledProductText name="true">{name}</StyledProductText>
          <StyledProductText price="true">{price}원</StyledProductText>
        </div>
        <div>
          <ShoppingCartIcon />
        </div>
      </StyledProductContainer>
    </StyledProductItem>
  );
};

export default ProductItem;

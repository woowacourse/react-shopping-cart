import styled from 'styled-components';
import Sample from '../../assets/img/sample.svg';
import { ReactComponent as ShoppingCart } from '../../assets/icon/shopping-cart.svg';

const ProductCard = () => {
  return (
    <Styled.Container>
      <Styled.Img src={Sample} />
      <Styled.ProductDetail>
        <Styled.ProductInfo>
          <Styled.ProductName>PET보틀-정사각(420ml)</Styled.ProductName>
          <Styled.ProductPrice>43,400 원</Styled.ProductPrice>
        </Styled.ProductInfo>
        <ShoppingCart />
      </Styled.ProductDetail>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.li`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 282px;
  `,

  Img: styled.img`
    width: 282px;
    height: 282px;
  `,

  ProductDetail: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    padding-left: 16px;
  `,

  ProductName: styled.span`
    font-weight: 400;
    font-size: 16px;

    letter-spacing: 0.5px;
  `,

  ProductPrice: styled.span`
    font-weight: 400;
    font-size: 20px;

    letter-spacing: 0.5px;
  `,
};
export default ProductCard;

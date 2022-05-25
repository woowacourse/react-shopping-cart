import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addCartProductThunk } from 'store/thunk/productThunk';
import Button from 'component/common/Button';

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { products, selectedProductId } = useSelector(store => store);
  const targetProduct = products.find(product => product.id === selectedProductId);

  const handleCartClick = () => {
    dispatch(addCartProductThunk(targetProduct));
  };

  return (
    <Styled.Content>
      <Styled.Image src={targetProduct.image} />
      <Styled.Name>{targetProduct.name}</Styled.Name>
      <Styled.PriceBox>
        <span style={{ fontSize: '24px' }}>금액</span>
        <Styled.Price>{targetProduct.price.toLocaleString('ko-KR')} 원</Styled.Price>
      </Styled.PriceBox>
      <Button onClick={handleCartClick}>
        <Styled.CartParagraph>장바구니</Styled.CartParagraph>
      </Button>
    </Styled.Content>
  );
}

const Styled = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px;
  `,

  Image: styled.img`
    width: 570px;
    height: 570px;
    object-fit: cover;
  `,

  Name: styled.span`
    margin-top: 21px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 36px;
    letter-spacing: 0.5px;
  `,

  PriceBox: styled.div`
    width: 638px;
    margin-top: 33px;
    padding: 34px 0 57px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: max(306px);
    border-top: 4px solid #aaaaaa;
  `,

  Price: styled.span`
    font-weight: 400;
    font-size: 32px;
    line-height: 27px;
    letter-spacing: 0.5px;
  `,

  CartParagraph: styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 638px;
    height: 98px;
    background-color: #73675c;
    font-weight: 700;
    font-size: 32px;
    line-height: 21px;
    color: white;
  `,
};

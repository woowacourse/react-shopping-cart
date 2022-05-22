import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'component/common/Button';
import { addCartProductThunk } from 'store/thunk/productThunk';

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { products, selectedProductId } = useSelector(store => store);
  const targetProduct = products.find(product => product.id === selectedProductId);

  const handleCartClick = () => {
    dispatch(addCartProductThunk(targetProduct));
  };

  return (
    <Content>
      <Image src={targetProduct.image} />
      <Name>{targetProduct.name}</Name>
      <PriceBox>
        <span style={{ fontSize: '24px' }}>금액</span>
        <Price>{targetProduct.price.toLocaleString('ko-KR')} 원</Price>
      </PriceBox>
      <Button onClick={handleCartClick}>
        <CartParagraph>장바구니</CartParagraph>
      </Button>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
`;

const Image = styled.img`
  width: 570px;
  height: 570px;
  object-fit: cover;
`;

const Name = styled.span`
  margin-top: 21px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 36px;
  letter-spacing: 0.5px;
`;

const PriceBox = styled.div`
  width: 638px;
  margin-top: 33px;
  padding: 34px 0 57px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: max(306px);
  border-top: 4px solid #aaaaaa;
`;

const Price = styled.span`
  font-weight: 400;
  font-size: 32px;
  line-height: 27px;
  letter-spacing: 0.5px;
`;

const CartParagraph = styled.p`
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
`;

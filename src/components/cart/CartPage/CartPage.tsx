import { styled } from 'styled-components';
import CartListItem from '../CartListItem/CartListItem';
import Spacer from '../../common/Spacer/Spacer';
import CartTotal from '../CartTotal/CartTotal';

const defaultArgs = {
  id: '0',
  quantity: 1,
  product: {
    id: 1,
    name: '순살치킨 1KG',
    price: 9900,
    imageSrc:
      'https://cdn-mart.baemin.com/sellergoods/main/c6f2f083-a8b8-4799-834b-444b5eaeb532.png?h=400&w=400',
  },
};

const CartPage = () => {
  return (
    <Container>
      <TitleWrapper>
        <Title>장바구니</Title>
      </TitleWrapper>
      <Spacer height={34} />
      <Inner>
        <CartList>
          <ListTitle>든든배송 상품 (3개)</ListTitle>
          <CartListItem {...defaultArgs} />
          <CartListItem {...defaultArgs} />
          <CartListItem {...defaultArgs} />
        </CartList>
        <TotalWrapper>
          <CartTotal />
        </TotalWrapper>
      </Inner>
    </Container>
  );
};

const Container = styled.div``;

const TitleWrapper = styled.div`
  height: 67px;
  border-bottom: 4px solid #333;
`;

const Title = styled.h2`
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: #333;
`;

const CartList = styled.ul`
  width: 735px;

  & > li {
    border-bottom: 1.5px solid #ccc;
  }

  & > li:last-child {
    border: none;
  }
`;

const ListTitle = styled.div`
  height: 56px;
  border-bottom: 4px solid #aaaaaa;
  font-family: 'Noto Sans KR';
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: #333;
`;

const Inner = styled.div`
  display: flex;
  column-gap: 104px;
`;

const TotalWrapper = styled.div`
  padding-top: 50px;
`;

export default CartPage;

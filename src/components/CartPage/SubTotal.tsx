import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { cartState } from '../../atoms/cartState';
import { cartSelects } from '../../atoms/cartSelects';

export default function SubTotal() {
  const cart = useRecoilValue(cartState({ action: 'GET' }));
  const cartSelectsSet = useRecoilValue(cartSelects);
  const cartItemsPrice = [...cartSelectsSet].reduce((acc, cartSelectId) => {
    const cartItem = cart.find((item) => item.id === cartSelectId);
    // TODO: 방어코드 없음
    const price = cartItem.quantity * cartItem.product.price;
    return acc + price;
  }, 0);

  const deliveryFee = cartItemsPrice > 30000 || cartItemsPrice === 0 ? 0 : 3000;

  return (
    <SubTotalContainer>
      <Title>결제예상금액</Title>
      <Paragraph>
        <Text>총 상품가격</Text>
        <Text>{cartItemsPrice.toLocaleString()}원</Text>
      </Paragraph>
      <Paragraph>
        <Text>총 배송비</Text>
        <Text>{deliveryFee.toLocaleString()}원</Text>
      </Paragraph>
      <Paragraph>
        <Text>총 주문금액</Text>
        <Text>{(cartItemsPrice + deliveryFee).toLocaleString()}원</Text>
      </Paragraph>
      <CheckoutButton>주문하기</CheckoutButton>
    </SubTotalContainer>
  );
}

const SubTotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  width: 35%;
  align-items: center;
`;

const Title = styled.h3`
  width: 100%;
  text-align: center;
  ${({ theme }) => theme.fonts.cartHeading};
  padding: 1rem 2rem;
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray100};
`;

const Text = styled.span`
  ${({ theme }) => theme.fonts.subtotalContent};
`;

const Paragraph = styled.p`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 1.3rem 0;
`;

const CheckoutButton = styled.button`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  width: 80%;
  padding: 2rem 0;
  margin: 4rem 0;
  ${({ theme }) => theme.fonts.cartHeading};
  cursor: pointer;
`;

import styled from 'styled-components';

function UserSummaryShoppingBasket({ username, quantity }: { username?: string; quantity: number }) {
  return (
    <Container>
      <Username>{username && `${username}의 `}장바구니</Username>
      <Quantity>{quantity > 99 ? '99' : quantity}</Quantity>
      {quantity > 99 && <PlusIcon aria-label="99개 이상입니다.">+</PlusIcon>}
    </Container>
  );
}

export default UserSummaryShoppingBasket;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.div`
  margin-right: 5px;
  color: #ffffff;
`;

const Quantity = styled.div`
  background-color: #06c09e;
  color: #ffffff;
  font-weight: 700;
  width: 24px;
  height: 24px;
  padding-left: 1px;
  padding-top: 1px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const PlusIcon = styled.span`
  position: relative;
  bottom: 9px;
  right: 1px;
  color: #ffffff;
  font-weight: 700;
`;

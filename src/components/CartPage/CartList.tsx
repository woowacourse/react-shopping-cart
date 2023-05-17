import styled from 'styled-components';
import CartListItem from './CartListItem';
import SelectCartItem from './SelectCartItem';

export default function CartList() {
  const mock = {
    id: 1,
    name: '[F/W] 가죽 자켓',
    price: 110000,
    imageUrl:
      'https://image.msscdn.net/images/goods_img/20200901/1576682/1576682_6_320.jpg',
  };
  return (
    <CartListContainer>
      <CartListHeader>든든 배송 상품 (n개)</CartListHeader>
      <CartListItem {...mock} />
      <SelectCartItem />
    </CartListContainer>
  );
}

const CartListContainer = styled.div`
  width: 55%;
`;

const CartListHeader = styled.h3`
  ${({ theme }) => theme.fonts.cartHeading};
  border-bottom: 4px solid ${({ theme }) => theme.colors.gray200};
`;

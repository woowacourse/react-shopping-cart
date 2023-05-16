import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { cartListAtom, cartSelector } from '../../store/cart';
import CartItem from '../CartItem/CartItem';
import CheckBox from '../common/CheckBox/CheckBox';

const CartItemList = () => {
  const cartList = useRecoilValue(cartListAtom);
  const { cartsQuantity } = useRecoilValue(cartSelector);

  return (
    <Wrapper>
      <SubTitle>든든 배송 상품 ({cartsQuantity}개)</SubTitle>
      <Ul>
        {cartList.map((id) => (
          <CartItem id={id} />
        ))}

        <CheckBoxWrapper>
          <CheckBox />
          <span>전체선택 (2/{cartsQuantity})</span>
          <DeleteSelectedItemsButton>선택삭제</DeleteSelectedItemsButton>
        </CheckBoxWrapper>
      </Ul>
    </Wrapper>
  );
};

export default CartItemList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 720px;

  margin-top: 16px;
`;

const SubTitle = styled.div`
  width: 90%;
  height: 40px;

  border-bottom: 4px solid #aaaaaa;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  padding: 8px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 8px;

  width: 100%;
`;

const DeleteSelectedItemsButton = styled.button`
  border: 1px solid #bbbbbb;

  padding: 8px 12px;

  cursor: pointer;
`;

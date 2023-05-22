import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import mockServerClient from '../api';
import useCheck from '../hooks/useCheck';
import cartState from '../recoil/atoms/cartState';
import checkedCartState from '../recoil/atoms/checkedCartState';
import cartCountState from '../recoil/selectors/cartCountState';
import CartItem from './CartItem';
import CheckBox from './CheckBox';

const StyledCartList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 740px;
  max-width: 740px;
  /* background-color: #c06c84; */
`;

const CartListHeader = styled.div`
  position: sticky;
  top: 0px;
  display: flex;
  justify-content: space-between;
  height: 49px;
  margin-top: 34px;
  width: 100%;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  background-color: #f6f6f6;
  border-bottom: 3px solid #333333;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  gap: 10px;
`;

const SelectButtonContainer = styled.div`
  padding: 6px 12px;
  border: 2px solid #e1dfdf;
`;

const SelectButton = styled.button`
  width: 100%;
`;

const CartItemList = () => {
  const cartItems = useRecoilValue(cartState);
  const setCart = useSetRecoilState(cartState);

  const cartCount = useRecoilValue(cartCountState);
  const [checkedCart, setCheckedCart] = useRecoilState(checkedCartState);

  const { setAll } = useCheck();

  const handleOnClick = () => {
    checkedCart.forEach(async (cartId) => {
      const { productId } = cartItems.find((cartItem) => cartItem.id === cartId)!;
      try {
        await mockServerClient.delete(`/cart-items`, productId);
      } catch (e) {
        window.alert('삭제에 실패했습니다.');
        console.log(e);
      }
      setCheckedCart((prev) => prev.filter((id) => id !== cartId));
      setCart((prev) => prev.filter((cartItem) => cartItem.id !== cartId));
    });
  };

  return (
    <StyledCartList>
      <CartListHeader>
        <span>든든 상품 ({cartCount}개)</span>
        <StyledDiv>
          <CheckBox kind="ALL" setAll={setAll} />
          <span>
            {' '}
            전체선택 ({checkedCart.length}/{cartCount}){' '}
          </span>
          <SelectButtonContainer>
            <SelectButton onClick={handleOnClick}>선택삭제</SelectButton>
          </SelectButtonContainer>
        </StyledDiv>
      </CartListHeader>
      {cartItems.map((cartItem) => {
        return <CartItem key={cartItem.id} productId={cartItem.productId} />;
      })}
    </StyledCartList>
  );
};

export default CartItemList;

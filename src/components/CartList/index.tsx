import { useRecoilState, useRecoilValue } from 'recoil';
import CartItem from '../CartItem';
import { cartSelectedState, cartState, cartStatus, totalAmountState } from '../../atoms/cart';
import styled from 'styled-components';

const CartList: React.FC = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [checkList, setCheckList] = useRecoilState(cartSelectedState);

  const { selectedAmount, allSelected } = useRecoilValue(cartStatus);
  const { totalItems } = useRecoilValue(totalAmountState);

  const onSelectedCartDelete = () => {
    const selected = cart.filter(({ isSelected }) => isSelected).map(({ id }) => id);

    fetch('api/cart-items', {
      method: 'DELETE',
      body: JSON.stringify(selected),
    })
      .then((res) => {
        if (!res.ok) throw new Error('장바구니를 삭제하지 못하였습니다.');

        setCart((prev) => prev.filter(({ isSelected }) => !isSelected));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <StyledWrapper>
      {cart.map((cartItem, i) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          checked={checkList[i]}
          onChange={({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
            const newCheckList = checkList.toSpliced(i, 1, checked);
            setCheckList(newCheckList);
          }}
        />
      ))}
      <StyledAllCheckBox>
        <StyledCheckBox
          type="checkbox"
          checked={allSelected}
          onChange={() => setCheckList(checkList.map(() => !allSelected))}
        />
        <StyledSelectedAmount>
          {selectedAmount < totalItems ? '전체선택' : '전체해제'} ({selectedAmount}/{totalItems})
        </StyledSelectedAmount>
        <StyledSelectedDeleteButton onClick={onSelectedCartDelete}>선택삭제</StyledSelectedDeleteButton>
      </StyledAllCheckBox>
    </StyledWrapper>
  );
};

export default CartList;

const StyledWrapper = styled.div``;

const StyledAllCheckBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckBox = styled.input`
  width: 28px;
  height: 28px;

  accent-color: #333333;
  cursor: pointer;
`;

const StyledSelectedAmount = styled.div`
  margin-left: 10px;
`;

const StyledSelectedDeleteButton = styled.button`
  margin-left: 20px;
  width: 100px;
  height: 35px;

  border: 1px solid #bbbbbb;
`;

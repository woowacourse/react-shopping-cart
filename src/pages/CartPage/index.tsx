import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { checkBoxAtom } from '@recoil/atoms/checkBoxAtom';
import { checkBoxTotalIdtAtom } from '@recoil/atoms/checkBoxTotalIdtAtom';
import CartExpectedPrice from '@components/CartExpectedPrice';
import CartList from '@components/CartList';
import CartTitle from '@components/CartTitle';
import Button from '@components/common/Button';
import CheckBox from '@components/common/CheckBox';
import useAtomLocalStorage from '@hooks/useAtomLocalStorage';
import { CartInformation } from '@type/types';
import { CART_LIST_LOCAL_KEY } from '@constants/common';

const CartPage = () => {
  const [cart, setCart] = useAtomLocalStorage<CartInformation[]>(
    cartAtom,
    CART_LIST_LOCAL_KEY
  );

  const [checkBox, setCheckBox] = useAtomLocalStorage<number[]>(
    checkBoxAtom,
    'checkBox'
  );

  const [checkBoxTotalId, setCheckBoxTotalId] = useAtomLocalStorage<number[]>(
    checkBoxTotalIdtAtom,
    'checkBoxTotalId'
  );

  const [check, setCheck] = useState(false);

  const checkBoxTotalIdOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheck(true);
      setCheckBox(checkBoxTotalId);
      return;
    }
    setCheckBox([]);
    setCheck(false);
  };

  const removeCartOnClick = () => {
    const removedCart = cart.filter(
      (product) =>
        !checkBox.includes(product.id) && checkBoxTotalId.includes(product.id)
    );
    setCart(removedCart);
    const removedCheckBox = checkBoxTotalId.filter(
      (id) => !checkBox.includes(id)
    );
    setCheckBox(removedCheckBox)
    setCheckBoxTotalId(removedCheckBox);
  };

  useEffect(() => {
    if (checkBox.length === checkBoxTotalId.length) {
      setCheck(true);
      return;
    }
    setCheck(false);
  }, [checkBox, checkBoxTotalId]);
  return (
    <CartPageWrapper>
      <CartTitle />
      <CartCountTextWrapper>든든배송 상품({cart.length})</CartCountTextWrapper>
      <CartInformationWrapper>
        <CartList />
        <CartExpectedPrice />
      </CartInformationWrapper>
      <CartPageBottom>
        <CheckBox onChange={checkBoxTotalIdOnChange} check={check} />
        <CartSelectorText>
          전체선택({checkBox.length}/{checkBoxTotalId.length})
        </CartSelectorText>
        <Button
          text="선택삭제"
          onClick={removeCartOnClick}
          width="100px"
          height="35px"
          fontSize="16px"
          background="white"
          color="#333333"
        />
      </CartPageBottom>
    </CartPageWrapper>
  );
};

const CartPageWrapper = styled.div`
  width: 100%;
  padding: 0 15%;

  margin-bottom: 140px;
`;

const CartCountTextWrapper = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  /* or 165% */

  letter-spacing: 0.5px;
  display: block;

  margin: 34px 0 16px;

  color: #333333;
`;

const CartInformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CartPageBottom = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
`;
const CartSelectorText = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* or 125% */

  letter-spacing: 0.5px;

  margin: 0 13px;

  color: #333333;
`;

export default CartPage;

import { CartItem } from '../components/CartItem';
import { useRecoilState } from 'recoil';
import { cartState } from '../atoms/CartState';
import {
  Typography as ContainerTitle,
  Typography as CheckAllText,
} from '../ui/Typography';
import { Button as DeleteSelectionButton } from '../ui/Button';
import * as Styled from './styles/CartItemContainer.styles';
import { useState } from 'react';

export const CartItemContainer = () => {
  const [checkAllCheckboxText, setCheckAllCheckboxText] = useState('전체선택');
  const [isChecked, setIsChecked] = useState(false);
  const [cartLists, setCartLists] = useRecoilState(cartState);

  const changeAllCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckAllCheckboxText('선택해제');
      setIsChecked(true);

      setCartLists((prevStates) =>
        prevStates.map((cartItem) =>
          !cartItem.checked ? { ...cartItem, checked: true } : cartItem
        )
      );
    } else {
      setCheckAllCheckboxText('전체선택');
      setIsChecked(false);

      setCartLists((prevStates) =>
        prevStates.map((cartItem) =>
          cartItem.checked ? { ...cartItem, checked: false } : cartItem
        )
      );
    }
  };

  return (
    <Styled.Wrapper>
      <div>
        <ContainerTitle size="20px">{`든든배송 상품 ${cartLists.length}개`}</ContainerTitle>
        <div>
          <Styled.TotalCheckboxInputWrapper>
            <Styled.TotalCheckboxInput
              type="checkbox"
              checked={isChecked}
              onChange={changeAllCheckbox}
            />
            <CheckAllText size="16px">{checkAllCheckboxText}</CheckAllText>
          </Styled.TotalCheckboxInputWrapper>
          <DeleteSelectionButton width="100px" borderColor="#aaaaaa">
            선택삭제
          </DeleteSelectionButton>
        </div>
      </div>
      <Styled.CartContainerWrapper>
        {cartLists.map((product) => (
          <CartItem
            key={product.id}
            id={product.id}
            imageUrl={product.product.imageUrl}
            name={product.product.name}
            price={product.product.price}
            quantity={product.quantity}
          />
        ))}
      </Styled.CartContainerWrapper>
    </Styled.Wrapper>
  );
};

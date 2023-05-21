import { CartItem } from '../components/CartItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState } from '../atoms/CartListState';
import {
  Typography as ContainerTitle,
  Typography as CheckAllText,
} from '../ui/Typography';
import { Button as DeleteSelectionButton } from '../ui/Button';
import * as Styled from './styles/CartItemContainer.styles';
import { useEffect } from 'react';
import { checkboxesState } from '../atoms/CheckboxState';

export const CartItemContainer = () => {
  const cartLists = useRecoilValue(cartState);
  const [checkboxes, setCheckboxes] = useRecoilState(checkboxesState);

  const handleCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckboxes(
        cartLists.map((cartItem) => ({
          id: cartItem.id,
          price: cartItem.product.price,
          quantity: cartItem.quantity,
        }))
      );
    } else {
      setCheckboxes([]);
    }
  };

  useEffect(() => {
    setCheckboxes(
      cartLists.map((cartItem) => ({
        id: cartItem.id,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
      }))
    );
  }, []);

  return (
    <Styled.Wrapper>
      <div>
        <ContainerTitle size="20px">{`든든배송 상품 ${cartLists.length}개`}</ContainerTitle>
        <div>
          <Styled.TotalCheckboxInputWrapper>
            <Styled.TotalCheckboxInput
              type="checkbox"
              checked={checkboxes.length === 0 ? false : true}
              onChange={handleCheckboxes}
            />
            <CheckAllText size="16px">
              {checkboxes.length === 0 ? '전체선택' : '선택해제'}
            </CheckAllText>
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

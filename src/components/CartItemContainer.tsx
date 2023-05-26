import { CartItem } from '../components/CartItem';
import { useRecoilState } from 'recoil';
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
  const [cartLists, setCartList] = useRecoilState(cartState);
  const [checkboxes, setCheckboxes] = useRecoilState(checkboxesState);

  const handleCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setCheckboxes(
          cartLists.map((cartItem) => ({
            id: cartItem.id,
            price: cartItem.product.price,
            quantity: cartItem.quantity,
          }))
        )
      : setCheckboxes([]);
  };

  const handleDeleteChecked = () => {
    const checkboxesIds = checkboxes.map((checkbox) => checkbox.id);

    checkboxesIds.forEach((id) => {
      const deleteCartProduct = async () => {
        const response = await fetch(`/cart-items/${id}`, {
          method: 'DELETE',
        });

        if (response.status >= 400) {
          throw new Error('장바구니에 없는 품목을 삭제할 수 없습니다.');
        }
      };

      deleteCartProduct();
    });

    setCartList((prevCartList) =>
      prevCartList.filter((cartItem) => !checkboxesIds.includes(cartItem.id))
    );
    setCheckboxes([]);
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

  if (cartLists.length === 0) {
    return (
      <Styled.EmptyWrapper>
        <ContainerTitle color="#333333">
          장바구니에 담긴 상품이 없어요.
        </ContainerTitle>
      </Styled.EmptyWrapper>
    );
  }

  return (
    <Styled.Wrapper>
      <div>
        <ContainerTitle size="20px">{`든든배송 상품 ${cartLists.length}개`}</ContainerTitle>
        <div>
          <Styled.TotalCheckboxInputWrapper>
            <Styled.TotalCheckboxInput
              width="20px"
              height="20px"
              type="checkbox"
              checked={checkboxes.length === 0 ? false : true}
              onChange={handleCheckboxes}
            />
            <CheckAllText size="16px">
              {checkboxes.length === 0 ? '전체선택' : '선택해제'}
            </CheckAllText>
          </Styled.TotalCheckboxInputWrapper>
          <DeleteSelectionButton
            width="100px"
            borderColor="#aaaaaa"
            onClick={handleDeleteChecked}
          >
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

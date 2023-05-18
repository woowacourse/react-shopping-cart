import { CartItem } from '../components/CartItem';
import { useRecoilValue } from 'recoil';
import { cartState, cartStateLength } from '../atoms/CartState';
import {
  Typography as ContainerTitle,
  Typography as CheckAllText,
} from '../ui/Typography';
import { Button as DeleteSelectionButton } from '../ui/Button';
import * as Styled from './styles/CartItemContainer.styles';

export const CartItemContainer = () => {
  const cartLists = useRecoilValue(cartState);
  const cartListLength = useRecoilValue(cartStateLength);

  return (
    <Styled.Wrapper>
      <div>
        <ContainerTitle size="20px">{`든든배송 상품 ${cartListLength}개`}</ContainerTitle>
        <div>
          <Styled.TotalCheckboxInputWrapper>
            <Styled.TotalCheckboxInput type="checkbox" />
            <CheckAllText size="16px">전체선택</CheckAllText>
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

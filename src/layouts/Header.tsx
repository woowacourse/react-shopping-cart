import { Button as CartButton } from '../ui/Button';
import { Typography as AddToCartTitle } from '../ui/Typography';
import { Logo } from '../components/Logo';
import { TotalCartCount } from '../components/TotalCartCount';
import { cartState } from '../atoms/CartState';
import { useRecoilValue } from 'recoil';
import * as Styled from './styles/Header.styles';

export const Header = () => {
  const AddedCardState = useRecoilValue(cartState);

  return (
    <Styled.Wrapper>
      <Styled.HeaderWrapper>
        <Logo $color="#ffffff" />
        <CartButton
          onClick={() => {
            return;
          }}
        >
          <AddToCartTitle size="24px" color="#ffffff">
            장바구니
          </AddToCartTitle>
          <Styled.TotalCartCountWrapper>
            {AddedCardState.length !== 0 && (
              <TotalCartCount count={AddedCardState.length} />
            )}
          </Styled.TotalCartCountWrapper>
        </CartButton>
      </Styled.HeaderWrapper>
    </Styled.Wrapper>
  );
};

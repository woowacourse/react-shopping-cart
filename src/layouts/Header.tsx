import { Button as CartButton } from '../ui/Button';
import { Typography as AddToCartTitle } from '../ui/Typography';
import { Logo } from './Logo';
import { TotalCartCount } from '../components/TotalCartCount';
import { cartStateLength } from '../atoms/CartState';
import { useRecoilValue } from 'recoil';
import * as Styled from './styles/Header.styles';

export const Header = () => {
  const cardStateLength = useRecoilValue(cartStateLength);

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
            {cardStateLength !== 0 && (
              <TotalCartCount count={cardStateLength} />
            )}
          </Styled.TotalCartCountWrapper>
        </CartButton>
      </Styled.HeaderWrapper>
    </Styled.Wrapper>
  );
};

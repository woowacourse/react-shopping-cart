import { Typography as AddToCartTitle } from '../ui/Typography';
import { Logo } from './Logo';
import { TotalCartCount } from '../components/TotalCartCount';
import { cartStateLength } from '../atoms/CartState';
import { useRecoilValue } from 'recoil';
import * as Styled from './styles/Header.styles';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const cardStateLength = useRecoilValue(cartStateLength);
  const navigator = useNavigate();

  return (
    <Styled.Wrapper>
      <Styled.HeaderWrapper>
        <Logo $color="#ffffff" />
        <Styled.CartNavigator
          onClick={() => {
            navigator('/cart-list');
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
        </Styled.CartNavigator>
      </Styled.HeaderWrapper>
    </Styled.Wrapper>
  );
};

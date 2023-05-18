import { Link } from 'react-router-dom';
import { cartCountState } from '../atoms/CartState';
import { Button as CartButton } from './common/Button';
import { Text as AddToCartTitle } from './common/Text';
import { Logo } from './Logo';
import { TotalCartCount } from './TotalCartCount';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

export const Header = () => {
  const cartProductCount = useRecoilValue(cartCountState);

  return (
    <HeaderWrapper>
      <StyledHeader>
        <Link to="/">
          <Logo $color="var(--white-color)" />
        </Link>
        <Link to="/cart">
          <CartButton width="132px" height="28px">
            <AddToCartTitle size="24px" $color="var(--white-color)">
              장바구니
            </AddToCartTitle>
            <TotalCartCountWrapper>
              {cartProductCount !== 0 && (
                <TotalCartCount count={cartProductCount} />
              )}
            </TotalCartCountWrapper>
          </CartButton>
        </Link>
      </StyledHeader>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: var(--label-color);
`;

const StyledHeader = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalCartCountWrapper = styled.div`
  width: 32px;
  height: 26px;
`;

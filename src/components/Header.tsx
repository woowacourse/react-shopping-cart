import { cartState } from '../atoms/CartState';
import { Button as CartButton } from './common/Button';
import { Text as AddToCartTitle } from './common/Text';
import { Logo } from './Logo';
import { TotalCartCount } from './TotalCartCount';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

export const Header = () => {
  const cartProductList = useRecoilValue(cartState);

  return (
    <HeaderWrapper>
      <StyledHeader>
        <Logo $color="var(--white-color)" />
        <CartButton
          onClick={() => {
            return;
          }}
        >
          <AddToCartTitle size="24px" $color="var(--white-color)">
            장바구니
          </AddToCartTitle>
          <TotalCartCountWrapper>
            {cartProductList.length !== 0 && (
              <TotalCartCount count={cartProductList.length} />
            )}
          </TotalCartCountWrapper>
        </CartButton>
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

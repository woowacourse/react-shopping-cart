import { styled } from 'styled-components';
import { Logo } from './Logo';
import { TotalCartCount } from './TotalCartCount';
import { Button as CartButton } from './common/Button';
import { Text as AddToCartTitle } from './common/Text';

export const Header = () => {
  return (
    <HeaderWrapper>
      <StyledHeader>
        <Logo $color="#ffffff" />
        <CartButton
          onClick={() => {
            return;
          }}
        >
          <AddToCartTitle size={'24px'} $color={'#ffffff'}>
            장바구니
          </AddToCartTitle>
          <TotalCartCount count={3} />
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
  background-color: #333333;
`;

const StyledHeader = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

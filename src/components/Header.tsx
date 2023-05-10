import { styled } from 'styled-components';
import { Logo } from './Logo';
import { TotalCartCount } from './TotalCartCount';
import { Button as CartButton } from './common/Button';
import { Text as AddToCartTitle } from './common/Text';
import { useRecoilValue } from 'recoil';
import { addedCartState } from '../atoms/AddedCartState';

export const Header = () => {
  const AddedCardState = useRecoilValue(addedCartState);

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
          {AddedCardState.length !== 0 && (
            <TotalCartCount count={AddedCardState.length} />
          )}
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

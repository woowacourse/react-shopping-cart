import { Button as CartButton } from '../components/common/Button';
import { Typography as AddToCartTitle } from '../components/common/Typography';
import { Logo } from '../components/Logo';
import { TotalCartCount } from '../components/TotalCartCount';
import { addedCartState } from '../atoms/AddedCartState';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

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
          <AddToCartTitle size="24px" $color="#ffffff">
            장바구니
          </AddToCartTitle>
          <TotalCartCountWrapper>
            {AddedCardState.length !== 0 && (
              <TotalCartCount count={AddedCardState.length} />
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
  background-color: #333333;
`;

const StyledHeader = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalCartCountWrapper = styled.div`
  width: 32px;
  height: 32px;
`;

import styled from 'styled-components';
import CroppedImage from 'components/common/CroppedImage';
import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';
import theme from 'styles/theme';
import { memo } from 'react';
import { flexCenter } from 'styles/mixin';

interface ItemContainerProps {
  id: number;
  thumbnailUrl: string;
  title: string;
  price: number;
  updateCartItemQuantity?: (id: number) => void;
}

const ItemContainer = ({
  id,
  thumbnailUrl,
  title,
  price,
  updateCartItemQuantity,
}: ItemContainerProps) => {
  return (
    <StyledRoot>
      <CroppedImage src={thumbnailUrl} width='270px' height='270px' alt='상품' />
      <StyledBottom>
        <StyledDescription>
          <StyledTitle>{title}</StyledTitle>
          <StyledPrice>{price}</StyledPrice>
        </StyledDescription>
        <StyledCartIcon
          width='31px'
          fill={theme.colors.font}
          onClick={() => updateCartItemQuantity?.(id)}
        />
      </StyledBottom>
    </StyledRoot>
  );
};

export default memo(ItemContainer);

const StyledRoot = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 28.2rem;
  height: 35.8rem;
  gap: 1.8rem;
  transition: box-shadow 0.1s ease;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

const StyledBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
`;

const StyledDescription = styled.div``;

const StyledTitle = styled.p`
  font-size: 1.6rem;
`;

const StyledPrice = styled.p`
  font-size: 2rem;
`;

const StyledCartIcon = styled(CartIcon)`
  cursor: pointer;
`;

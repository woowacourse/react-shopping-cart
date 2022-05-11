import styled from 'styled-components';
import CroppedImage from 'components/common/CroppedImage';
import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';
import theme from 'styles/theme';
import { memo, useMemo } from 'react';

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
      <CroppedImage src={thumbnailUrl} width='282px' height='282px' alt='상품' />
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
  display: flex;
  flex-direction: column;
  width: 28.2rem;
  height: 35.8rem;
  gap: 18px;
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
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

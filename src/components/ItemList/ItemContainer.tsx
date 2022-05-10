import styled from 'styled-components';
import CroppedImage from 'components/common/CroppedImage';
import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';
import theme from 'styles/theme';

interface ItemContainerProps {
  thumbnailUrl: string;
  title: string;
  price: number;
}

const ItemContainer = ({ thumbnailUrl, title, price }: ItemContainerProps) => {
  return (
    <StyledRoot>
      <CroppedImage src={thumbnailUrl} width='282px' height='282px' alt='상품' />
      <StyledBottom>
        <StyledDescription>
          <StyledTitle>{title}</StyledTitle>
          <StyledPrice>{price}</StyledPrice>
        </StyledDescription>
        <CartIcon width='31px' fill={theme.colors.font} />
      </StyledBottom>
    </StyledRoot>
  );
};

export default ItemContainer;

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

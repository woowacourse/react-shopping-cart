import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';
import CroppedImage from 'components/common/CroppedImage';
import { memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from 'Routers';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

interface ItemContainerProps {
  id: number;
  thumbnailUrl: string;
  title: string;
  price: number;
  updateCartItemQuantity?: (id: number) => void;
  openSnackbar: () => void;
}

const ItemContainer = ({
  id,
  thumbnailUrl,
  title,
  price,
  updateCartItemQuantity,
  openSnackbar,
}: ItemContainerProps) => {
  const handleClickItemContainer = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    if (e.target instanceof SVGElement) {
      e.preventDefault();
    }
  };

  const handleClickCartIcon = () => {
    updateCartItemQuantity?.(id);
    openSnackbar();
  };

  return (
    <Link to={PATH.getItemDetail(id)} onClick={handleClickItemContainer} replace>
      <StyledRoot>
        <CroppedImage src={thumbnailUrl} width='270px' height='270px' alt={title} />
        <StyledBottom>
          <StyledDescription>
            <StyledTitle>{title}</StyledTitle>
            <StyledPrice>{price.toLocaleString()}</StyledPrice>
          </StyledDescription>
          <StyledCartIcon width='31px' fill={theme.colors.font} onClick={handleClickCartIcon} />
        </StyledBottom>
      </StyledRoot>
    </Link>
  );
};

export default memo(ItemContainer);

const StyledRoot = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 28.2rem;
  height: 35.8rem;
  gap: 1.8rem;
  cursor: pointer;
  transition: box-shadow 0.1s ease;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    img {
      transform: scale(1.2);
    }
  }
  img {
    transition: transform 0.5s ease;
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

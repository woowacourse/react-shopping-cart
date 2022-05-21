import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';
import ProductThumbnail from 'components/@shared/ProductThumbnail/ProductThumbnail';

import ProductCardInfo from 'components/ProductCardInfo/ProductCardInfo';

//재사용X
function ProductCard(props) {
  const navigate = useNavigate();
  const { id, thumbnail, name } = props;

  return (
    <Styled.Root
      flexDirection="column"
      width="220px"
      height="300px"
      padding="20px 10px"
      onClick={() => navigate(`/detail/${id}`)}
    >
      <ProductThumbnail src={thumbnail} alt={name} type="card" />
      <ProductCardInfo {...props} />
    </Styled.Root>
  );
}

const scaleAnimation = keyframes`
  100%{
    transform: scale(1.04);
  }
`;

const Styled = {
  Root: styled(FlexWrapper)`
    box-shadow: 3px 3px 3px 3px ${({ theme }) => theme.colors.opacity_black_01};
    cursor: pointer;
    :hover {
      animation: ${scaleAnimation} 0.5s ease-out;
      animation-fill-mode: forwards;
    }
  `,
};

export default ProductCard;

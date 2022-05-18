import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import ProductThumbnail from 'components/@shared/ProductThumbnail/ProductThumbnail';

import ProductCardInfo from 'components/ProductCardInfo/ProductCardInfo';

import { ColumnFlexWrapper } from 'styles/Wrapper';

//재사용X
function ProductCard(props) {
  const { id, thumbnail } = props;
  const navigate = useNavigate();

  return (
    <Styled.Root onClick={() => navigate(`/detail/${id}`)}>
      <ProductThumbnail src={thumbnail} type="card" />
      <ProductCardInfo {...props} />
    </Styled.Root>
  );
}

const scaleAnimation = keyframes`
  0%{}

  100%{
    transform: scale(1.04);
  }
`;

const Styled = {
  Root: styled(ColumnFlexWrapper)`
    width: 220px;
    height: 300px;
    padding: 20px 10px;
    box-shadow: 3px 3px 3px 3px ${({ theme }) => theme.colors.opacity_black_01};
    cursor: pointer;
    :hover {
      animation: ${scaleAnimation} 0.5s ease-out;
      animation-fill-mode: forwards;
    }
  `,
};

export default ProductCard;

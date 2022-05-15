import styled, { keyframes } from 'styled-components';
import ProductThumbnail from 'component/@shared/ProductThumbnail/ProductThumbnail';
import ProductCardInfo from 'component/ProductCardInfo/ProductCardInfo';
import { ColumnFlexWrapper } from 'styles/Wrapper';
import { useNavigate } from 'react-router-dom';

const scaleAnimation = keyframes`
  0%{}

  100%{
    transform: scale(1.04);
  }
`;

const ProductCardBox = styled(ColumnFlexWrapper)`
  width: 220px;
  padding: 20px 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0.1, 0.1);
  cursor: pointer;
  :hover {
    animation: ${scaleAnimation} 0.5s ease-out;
    animation-fill-mode: forwards;
  }
`;

function ProductCard(props) {
  const { id, thumbnail } = props;
  const navigate = useNavigate();

  return (
    <ProductCardBox onClick={() => navigate(`/detail/${id}`)}>
      <ProductThumbnail src={thumbnail} type="card" />
      <ProductCardInfo {...props} />
    </ProductCardBox>
  );
}

export default ProductCard;

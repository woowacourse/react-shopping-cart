import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GiShoppingCart } from 'react-icons/gi';
import { StyledImageBox, StyledImg } from './common/Styled';
import { PATH, SIZE } from '../constant/index';
import { COLORS } from '../styles/theme';

function Product({ product }) {
  const { id, name, price, imageUrl } = product;

  const handleClickCart = () => {};
  return (
    <StyledItem>
      <Link to={`${PATH.DETAIL_LINK}${id}`}>
        <StyledImageBox width={SIZE.MIDDLE} height={SIZE.MIDDLE}>
          <StyledImg width={SIZE.MIDDLE} src={imageUrl} />
        </StyledImageBox>
      </Link>
      <StyledItemInfoBox>
        <Link to={`${PATH.DETAIL_LINK}${id}`}>
          <StyledItemInfo>
            <StyledItemName>{name}</StyledItemName>
            <StyledItemPrice>{Number(price).toLocaleString()} 원</StyledItemPrice>
          </StyledItemInfo>
        </Link>
        <StyledIconButton onClick={handleClickCart}>
          <GiShoppingCart size={25} />
        </StyledIconButton>
      </StyledItemInfoBox>
    </StyledItem>
  );
}

const StyledItem = styled.div`
  width: 250px;
  height: 330px;
  cursor: pointer;
`;

const StyledItemInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 8px 0px 8px;
`;

const StyledItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledItemName = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.5px;
`;
const StyledItemPrice = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 0.5px;
`;

const StyledIconButton = styled.button`
  border: none;
  background: none;
  &:hover {
    transform: scale(1.1);
    color: ${COLORS.PRIMARY};
  }
`;

export default Product;

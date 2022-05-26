import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GiShoppingCart } from 'react-icons/gi';
import { StyledImageBox, StyledImg } from './common/Styled';
import { ROUTES_PATH, SIZE } from '../constants/index';
import { COLORS } from '../styles/theme';

function Product({ productData, handleCartItem, isCart }) {
  const { id, name, price, imageUrl } = productData;

  const onClickCartIcon = () => {
    handleCartItem(id, isCart);
  };

  return (
    <StyledItem>
      <Link to={`${ROUTES_PATH.DETAIL_LINK}${id}`}>
        <StyledImageBox width={SIZE.MIDDLE} height={SIZE.MIDDLE}>
          <StyledImg width={SIZE.MIDDLE} src={imageUrl} alt={name} />
        </StyledImageBox>
      </Link>
      <StyledItemInfoBox>
        <Link to={`${ROUTES_PATH.DETAIL_LINK}${id}`}>
          <StyledItemInfo>
            <StyledItemName>{name}</StyledItemName>
            <StyledItemPrice>{Number(price).toLocaleString()} 원</StyledItemPrice>
          </StyledItemInfo>
        </Link>
        <GiShoppingCart
          className="cart"
          size={28}
          onClick={onClickCartIcon}
          color={isCart ? COLORS.PRIMARY : ''}
        />
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

  .cart {
    color: ${(props) => props.color};
  }
  .cart:hover {
    transform: scale(1.2);
    color: ${COLORS.PRIMARY};
  }
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

export default Product;

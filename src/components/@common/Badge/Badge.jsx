import { CART_PRODUCT } from 'constants';
import styled from 'styled-components';

const StyledBadge = styled.div`
  width: 25px;
  height: 25px;
  position: absolute;
  right: 0;
  bottom: 35px;
  border-radius: 50%;
  background: ${props => props.theme.colors.orange};
  box-shadow: 0px 1px 1px ${props => props.theme.colors.gray_800};
  color: ${props => props.theme.colors.white};
  font-size: 12px;
  line-height: 25px;
  text-align: center;
`;

function Badge({ children }) {
  return (
    <StyledBadge>
      {children <= CART_PRODUCT.MAX_QUANTITY ? children : `${CART_PRODUCT.MAX_QUANTITY}+`}
    </StyledBadge>
  );
}

export default Badge;

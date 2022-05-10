import styled from "styled-components";
import ProductName from "../@shared/ProductName/ProductName";
import ProductPrice from "../@shared/ProductPrice/ProductPrice";
import { ReactComponent as Cart } from "../../assets/cart.svg";

const StyledCart = styled(Cart)`
  width: 20px;
  height: 20px;
  & path {
    fill: black;
  }

  :hover {
    & path {
      fill: ${({ theme }) => theme.colors.cyon};
    }
  }
`;

const ProductCardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  :hover {
    text-decoration: underline;
  }
`;

const ProductCardInfoContainer = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  width: 188px;
`;

function ProductCardInfo({ name, price }) {
  return (
    <ProductCardInfoContainer>
      <ProductCardInfoBox>
        <ProductName type="card">{name}</ProductName>
        <ProductPrice type="card">{price}</ProductPrice>
      </ProductCardInfoBox>
      <StyledCart />
    </ProductCardInfoContainer>
  );
}

export default ProductCardInfo;

import * as Styled from "./styles";
import product from "../../assets/product.png";
import cart from "../../assets/cart.svg";

function Product() {
  return (
    <Styled.ProductWrapper>
      <div>
        <img src={product} alt="PET보틀-정사각(420ml)" />
      </div>
      <Styled.ProductInfoWrapper>
        <Styled.ProductInfo>
          <span>PET보틀-정사각(420ml)</span>
          <span>43,000원</span>
        </Styled.ProductInfo>
        <img src={cart} alt="장바구니" />
      </Styled.ProductInfoWrapper>
    </Styled.ProductWrapper>
  );
}

export default Product;

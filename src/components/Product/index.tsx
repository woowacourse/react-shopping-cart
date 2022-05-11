import { useNavigate } from "react-router-dom";
import * as Styled from "./styles";
import product from "../../assets/product.png";
import cart from "../../assets/cart.svg";

function Product() {
  const navigate = useNavigate();

  const id = 1;
  return (
    <Styled.ProductWrapper>
      <div
        onClick={() => {
          navigate(`/product/${id}`);
        }}
      >
        <img src={product} alt="PET보틀-정사각(420ml)" />
      </div>
      <Styled.ProductInfoWrapper>
        <Styled.ProductInfo
          onClick={() => {
            navigate(`/product/${id}`);
          }}
        >
          <span>PET보틀-정사각(420ml)</span>
          <span>43,000원</span>
        </Styled.ProductInfo>
        <img src={cart} alt="장바구니" />
      </Styled.ProductInfoWrapper>
    </Styled.ProductWrapper>
  );
}

export default Product;

import { useNavigate } from "react-router-dom";
import * as Styled from "./styles";
import product from "../../assets/product.png";
import cart from "../../assets/cart.svg";

export type ProductType = {
  name: string;
  price: number;
  img: string;
  id: number;
};
interface ProductProps {
  productInfo: ProductType;
}

function Product({ productInfo }: ProductProps) {
  const { name, price, img, id } = productInfo;
  const navigate = useNavigate();

  return (
    <Styled.ProductWrapper>
      <div
        onClick={() => {
          navigate(`/product/${id}`);
        }}
      >
        <img src={`${img}${id}`} alt="PET보틀-정사각(420ml)" />
      </div>
      <Styled.ProductInfoWrapper>
        <Styled.ProductInfo
          onClick={() => {
            navigate(`/product/${id}`);
          }}
        >
          <span>{name}</span>
          <span>{price}원</span>
        </Styled.ProductInfo>
        <img src={cart} alt="장바구니" />
      </Styled.ProductInfoWrapper>
    </Styled.ProductWrapper>
  );
}

export default Product;

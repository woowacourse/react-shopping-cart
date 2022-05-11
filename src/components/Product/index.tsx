import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Styled from "./styles";
import cart from "../../assets/cart.svg";
import { addItem, increment, selectCartList } from "../../redux/modules/cart";

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
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartList);

  return (
    <Styled.ProductWrapper>
      <div
        onClick={() => {
          navigate(`/product/${id}`);
        }}
      >
        <img src={`${img}${id}`} alt={name} />
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
        <img
          onClick={() => {
            if (cartItems.some((items) => items.id === id)) {
              alert("이미 장바구니에 존재하는 상품입니다.");
            } else {
              dispatch(addItem({ name, price, img, id, amount: 1 }));
              alert("장바구니에 추가되었습니다.");
            }
          }}
          src={cart}
          alt="장바구니"
        />
      </Styled.ProductInfoWrapper>
    </Styled.ProductWrapper>
  );
}

export default Product;

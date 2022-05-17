import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import * as Styled from "./styles";

import { useCartItemSelector } from "../../hooks/useCartSelector";

import { actionCreators as CartActions } from "../../redux/modules/cart";

type ProductDetailType = {
  name: string;
  img: string;
  price: number;
  id: number;
};

type LocationState = { productDetail: ProductDetailType };

function ProductDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    productDetail: { img, name, price, id },
  } = location.state as LocationState;
  const cartItem = useCartItemSelector(id);

  return (
    <Styled.Content>
      <Styled.ProductDetailWrapper>
        <Styled.ProductImage src={img} alt={name} />
        {cartItem && <Styled.ProductBadge>찜</Styled.ProductBadge>}
        <Styled.ProductName>{name}</Styled.ProductName>
        <hr />
        <Styled.ProductPriceWrapper>
          <span>금액</span>
          <span>{price.toLocaleString()}원</span>
        </Styled.ProductPriceWrapper>
        {cartItem ? (
          <Styled.CartButton
            color="#2ac1bc"
            onClick={() => {
              navigate("/cart");
            }}
          >
            상품 {cartItem.amount}개 바로구매
          </Styled.CartButton>
        ) : (
          <Styled.CartButton
            onClick={() => {
              dispatch(CartActions.addItem(id));
            }}
          >
            장바구니 담기
          </Styled.CartButton>
        )}
      </Styled.ProductDetailWrapper>
    </Styled.Content>
  );
}

export default ProductDetail;

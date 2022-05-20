import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import { useCartItemSelector } from "../../hooks/useCartSelector";

import { actionCreators as CartActions } from "../../redux/modules/cart";

import * as S from "./styles";

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

  const { productDetail } = location.state as LocationState;
  const { name, price, img, id } = productDetail;
  const cartItem = useCartItemSelector(id);

  return (
    <S.Content>
      <S.ProductDetailWrapper>
        <S.ProductImage src={img} alt={name} />
        {cartItem && <S.ProductBadge>찜</S.ProductBadge>}
        <S.ProductName>{name}</S.ProductName>
        <hr />
        <S.ProductPriceWrapper>
          <span>금액</span>
          <span>{price.toLocaleString()}원</span>
        </S.ProductPriceWrapper>
        {cartItem ? (
          <S.CartButton onClick={() => navigate("/cart")} color="#2ac1bc">
            상품 {cartItem.amount}개 바로구매
          </S.CartButton>
        ) : (
          <S.CartButton onClick={() => dispatch(CartActions.addItem(productDetail))}>
            장바구니 담기
          </S.CartButton>
        )}
      </S.ProductDetailWrapper>
    </S.Content>
  );
}

export default ProductDetail;

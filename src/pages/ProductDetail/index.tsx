import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useCartItemSelector } from "hooks/useCartSelector";

import { actionCreators as cartActions } from "redux/modules/cart";

import * as S from "./styles";
import { useTargetProductSelector } from "hooks/useProductSelector";

function ProductDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const cartItem = useCartItemSelector(Number(id));
  const targetProduct = useTargetProductSelector(Number(id));

  if (!targetProduct) {
    return (
      <S.Content>
        <div>해당하는 상품이 없습니다.</div>
      </S.Content>
    );
  }

  return (
    <S.Content>
      <S.ProductDetailWrapper>
        <S.ProductImage src={targetProduct.img} alt={targetProduct.name} />
        {cartItem && <S.ProductBadge>찜</S.ProductBadge>}
        <S.ProductName>{targetProduct.name}</S.ProductName>
        <hr />
        <S.ProductPriceWrapper>
          <span>금액</span>
          <span>{targetProduct.price.toLocaleString()}원</span>
        </S.ProductPriceWrapper>
        {cartItem ? (
          <S.CartButton onClick={() => navigate("/cart")} color="#2ac1bc">
            상품 {cartItem.amount}개 바로구매
          </S.CartButton>
        ) : (
          <S.CartButton onClick={() => dispatch(cartActions.addItem(targetProduct))}>
            장바구니 담기
          </S.CartButton>
        )}
      </S.ProductDetailWrapper>
    </S.Content>
  );
}
export default ProductDetail;

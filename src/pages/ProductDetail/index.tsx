import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useCartItemListSelector, useCartItemSelector } from "hooks/useCartSelector";
import { useTargetProductSelector } from "hooks/useProductSelector";

import { actionCreators as cartActions } from "redux/modules/cart";
import { actionCreators as snackBarActions } from "redux/modules/snackBar";

import { CART_AMOUNT_MIN, CART_COUNTER_HIDE_TIME, MESSAGE } from "constants/constants";

import * as S from "./styles";

import deleteIcon from "assets/deleteIcon_white.png";

function ProductDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = Number(params.id);

  const [isShowCartCounter, setIsShowCartCounter] = useState(false);
  const cartItem = useCartItemSelector(id);
  const targetProduct = useTargetProductSelector(id);
  const timeout = useRef<NodeJS.Timeout>();

  const onClickDeleteItem = () => {
    if (confirm(MESSAGE.CONFIRM_DELETE)) {
      dispatch(cartActions.deleteItem(id));
      setIsShowCartCounter(false);
      dispatch(snackBarActions.show(MESSAGE.DELETE_CART_ITEM));
    }
  };

  const onClickDecreaseCounter = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    dispatch(cartActions.decrement(id));
  };

  const onClickIncreaseCounter = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    dispatch(cartActions.increment(id));
  };

  useEffect(() => {
    if (isShowCartCounter) {
      timeout.current = setTimeout(() => {
        setIsShowCartCounter(false);
      }, CART_COUNTER_HIDE_TIME);
    }
  }, [cartItem?.amount]);

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
        {cartItem && <S.ProductBadge onClick={() => setIsShowCartCounter(true)}>찜</S.ProductBadge>}
        {isShowCartCounter && (
          <S.CartCounter>
            {cartItem?.amount === CART_AMOUNT_MIN ? (
              <S.DeleteIcon onClick={onClickDeleteItem} src={deleteIcon} alt="장바구니에서 삭제" />
            ) : (
              <S.CartCounterButton onClick={onClickDecreaseCounter}>-</S.CartCounterButton>
            )}
            <span>{cartItem?.amount}</span>
            <S.CartCounterButton onClick={onClickIncreaseCounter}>+</S.CartCounterButton>
          </S.CartCounter>
        )}
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

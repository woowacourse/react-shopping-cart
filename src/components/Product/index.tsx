import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useCartItemSelector, useCartItemListSelector } from "hooks/useCartSelector";

import { actionCreators as cartActions } from "redux/modules/cart";
import { actionCreators as SnackBarActions } from "redux/modules/snackBar";

import * as S from "./styles";

import deleteIcon from "assets/deleteIcon_white.png";
import cart from "assets/cart.svg";

import { CART_AMOUNT_MIN, CART_COUNTER_HIDE_TIME, MESSAGE, ROUTE_URL } from "constants/constants";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, price, img, id } = productInfo;
  const [isShowCartCounter, setIsShowCartCounter] = useState(false);
  const cartItemList = useCartItemListSelector();
  const cartItem = useCartItemSelector(id);
  const timeout = useRef<NodeJS.Timeout>();

  const onClickCartImage = () => {
    setIsShowCartCounter((prev) => !prev);
    if (!cartItemList.some((cartItem) => cartItem.detail.id === id)) {
      dispatch(cartActions.addItem(productInfo));
      dispatch(SnackBarActions.show(MESSAGE.ADD_CART_ITEM));
    }
  };

  const onClickDeleteItem = () => {
    if (confirm(MESSAGE.CONFIRM_DELETE)) {
      dispatch(cartActions.deleteItem(id));
      setIsShowCartCounter(false);
      dispatch(SnackBarActions.show(MESSAGE.DELETE_CART_ITEM));
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

  const goToProductDetailPage = () =>
    navigate(ROUTE_URL.PRODUCT_DETAIL + `/${id}`, { state: { productDetail: productInfo } });

  useEffect(() => {
    if (isShowCartCounter) {
      timeout.current = setTimeout(() => {
        setIsShowCartCounter(false);
      }, CART_COUNTER_HIDE_TIME);
    }
  }, [isShowCartCounter, cartItem?.amount]);

  return (
    <S.ProductWrapper>
      <S.ProductImageWrapper>
        <S.ProductImage onClick={goToProductDetailPage} src={img} alt={name} />
      </S.ProductImageWrapper>
      <S.ProductInfoWrapper>
        <S.ProductInfo onClick={goToProductDetailPage}>
          <span>{name}</span>
          <span>{price.toLocaleString()}원</span>
        </S.ProductInfo>
        <S.CartImageWrapper>
          {cartItem?.amount && <S.CartImageBadge />}
          <S.CartImage onClick={onClickCartImage} src={cart} alt="장바구니에 담기" />
        </S.CartImageWrapper>
        <S.CartCounter isShowCartCounter={isShowCartCounter}>
          {cartItem?.amount === CART_AMOUNT_MIN ? (
            <S.DeleteIcon onClick={onClickDeleteItem} src={deleteIcon} alt="장바구니에서 삭제" />
          ) : (
            <S.CartCounterButton onClick={onClickDecreaseCounter}>-</S.CartCounterButton>
          )}
          <span>{cartItem?.amount ?? 0}</span>
          <S.CartCounterButton onClick={onClickIncreaseCounter}>+</S.CartCounterButton>
        </S.CartCounter>
      </S.ProductInfoWrapper>
    </S.ProductWrapper>
  );
}

export default Product;

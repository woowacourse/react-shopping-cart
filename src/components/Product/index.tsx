import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useCartItemSelector, useCartItemListSelector } from "../../hooks/useCartSelector";

import { actionCreators as CartActions } from "../../redux/modules/cart";
import { actionCreators as SnackBarActions } from "../../redux/modules/snackBar";

import * as S from "./styles";

import deleteIcon from "../../assets/deleteIcon_white.png";
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
      dispatch(CartActions.addItem(productInfo));
      dispatch(SnackBarActions.show("장바구니에 추가되었습니다. 😍"));
    }
  };

  const onClickDeleteItem = () => {
    if (confirm("상품을 장바구니에서 삭제하시겠습니까?")) {
      dispatch(CartActions.deleteItem(id));
      setIsShowCartCounter(false);
      dispatch(SnackBarActions.show("장바구니에서 삭제되었습니다. 🥲"));
    }
  };

  const onClickDecreaseCounter = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    dispatch(CartActions.decrement(id));
  };

  const onClickIncreaseCounter = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    dispatch(CartActions.increment(id));
  };

  useEffect(() => {
    if (isShowCartCounter) {
      timeout.current = setTimeout(() => {
        setIsShowCartCounter(false);
      }, 3000);
    }
  }, [isShowCartCounter, cartItem?.amount]);

  return (
    <S.ProductWrapper>
      <S.ProductImageWrapper>
        <S.ProductImage
          onClick={() => navigate(`/product/${id}`, { state: { productDetail: productInfo } })}
          src={img}
          alt={name}
        />
      </S.ProductImageWrapper>
      <S.ProductInfoWrapper>
        <S.ProductInfo
          onClick={() => navigate(`/product/${id}`, { state: { productDetail: productInfo } })}
        >
          <span>{name}</span>
          <span>{price.toLocaleString()}원</span>
        </S.ProductInfo>
        <S.CartImageWrapper>
          {cartItem?.amount && <S.CartImageBadge />}
          <S.CartImage onClick={onClickCartImage} src={cart} alt="장바구니에 담기" />
        </S.CartImageWrapper>
        <S.CartCounter isShowCartCounter={isShowCartCounter}>
          {cartItem?.amount === 1 ? (
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

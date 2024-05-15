import { CartItemResponse } from "../../types/ShoppingCart";
import styled from "styled-components";
import ItemCounter from "../ItemCounter/index";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { decreaseCartQuantity, increaseCartQuantity } from "../../recoil/selectors";
import { cartQuantityState } from "../../recoil/atoms";
import BasicButton from "../Button/BasicButton/index";
import CheckboxButton from "../Button/CheckboxButton/index";
import { addCartSelect } from "../../recoil/selectors";
import { removeCartSelect } from "../../recoil/selectors";
import { cartSelectedState } from "../../recoil/atoms";

const CartItem = ({ product }: Pick<CartItemResponse, "product">) => {
  const quantity = useRecoilValue(cartQuantityState(product.id));
  const increaseCount = useSetRecoilState(increaseCartQuantity);
  const decreaseCount = useSetRecoilState(decreaseCartQuantity);

  const cartLists = useRecoilValue(cartSelectedState);
  const addCart = useSetRecoilState(addCartSelect);
  const removeCart = useSetRecoilState(removeCartSelect);

  const isInCart = cartLists.includes(product.id) ? true : false;

  return (
    <CartItemContainer>
      <TopContainer>
        <CheckboxButton
          onClick={() => (isInCart ? removeCart(product.id) : addCart(product.id))}
          isChecked={isInCart}
        />
        <BasicButton label="삭제" onClick={() => alert("삭제하려다 실패")} />
      </TopContainer>
      <CartItemWrapper>
        <Thumbnail src={product.imageUrl} />
        <CartItemContents>
          <Name>{product.name}</Name>
          <Price>{product.price.toLocaleString()}원</Price>
          <ItemCounter
            value={quantity}
            handleIncrease={() => increaseCount(product.id)}
            handleDecrease={() => decreaseCount(product.id)}
          />
        </CartItemContents>
      </CartItemWrapper>
    </CartItemContainer>
  );
};

export default CartItem;

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: black;
  border-top: 1px solid #0000001a;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
`;

const Thumbnail = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;

const Name = styled.p`
  width: 100%;
  height: 15px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;

const Price = styled.p`
  width: 100%;
  height: 26px;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: left;
  margin-bottom: 19px;
`;

const CartItemWrapper = styled.div`
  display: flex;
`;

const CartItemContents = styled.div`
  margin: 9.5px 0 9.5px 24px;
`;

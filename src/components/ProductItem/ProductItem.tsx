import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  cartItemQuantityState,
  cartData,
  cartItemCheckState,
  cartQuantity,
} from '../../recoil/atoms';
import { patchCartItem, removeCartItem } from '../../api';

import CheckBox from '../CheckBox/CheckBox';
import { Button, CountButton } from '../Button';
import * as P from './ProductItem.style';

import useLocalStorageCheckedCart from '../../hooks/useLocalStorageCheckedCart';

export default function ProductItem({ cartItem }: { cartItem: Cart }) {
  useLocalStorageCheckedCart({ cartId: cartItem.id });

  const [quantity, setQuantity] = useRecoilState(cartItemQuantityState);
  const [totalProductCount, setTotalProductCount] =
    useRecoilState(cartQuantity);
  const [isCheck, setIsCheck] = useRecoilState(cartItemCheckState(cartItem.id));
  const setCart = useSetRecoilState(cartData);

  const handleIncrement = () => {
    const newQuantity = quantity[cartItem.id] + 1;
    patchCartItem(cartItem.id, newQuantity).then(() => {
      setQuantity((prev) => ({ ...prev, [cartItem.id]: newQuantity }));
      updateCart(newQuantity);
    });
  };

  const handleDecrement = () => {
    if (quantity[cartItem.id] === 1) return;

    const newQuantity = Math.max(quantity[cartItem.id] - 1, 1);
    patchCartItem(cartItem.id, newQuantity).then(() => {
      setQuantity((prev) => ({ ...prev, [cartItem.id]: newQuantity }));
      updateCart(newQuantity);
    });
  };

  const handleRemoveCartItem = () => {
    const newTotalProductCount = Math.max(
      totalProductCount - cartItem.quantity,
      0,
    );
    removeCartItem(cartItem.id).then(() => {
      setTotalProductCount(newTotalProductCount);
      setCart((prevCart) => prevCart.filter((item) => item.id !== cartItem.id));
    });
  };

  const handleCheckCartItem = () => {
    setIsCheck(!isCheck);
  };

  const updateCart = (newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cartItem.id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  return (
    <P.ProductItemStyle>
      <P.ProductItemTop>
        <CheckBox isCheck={isCheck} onClick={handleCheckCartItem} />
        <Button text="삭제" onClick={handleRemoveCartItem} />
      </P.ProductItemTop>
      <P.ProductItemBundle>
        <P.Img
          src={cartItem.product.imageUrl}
          alt={`${cartItem.product.name}의 상품 사진`}
          className="product-item_img"
        />
        <div className="product-item_content">
          <span className="product-item_content_name">
            {cartItem.product.name}
          </span>
          <span className="product-item_content_price">
            {cartItem.product.price.toLocaleString('ko-kr')}원
          </span>
          <div className="product-item_content_amount-bundle">
            <CountButton type="minus" onClick={handleDecrement} />
            <span className="product-item_content_amount">
              {quantity[cartItem.id]}
            </span>
            <CountButton type="plus" onClick={handleIncrement} />
          </div>
        </div>
      </P.ProductItemBundle>
    </P.ProductItemStyle>
  );
}

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
import {
  Img,
  ProductItemStyle,
  ProductItemTop,
  ProductItemBundle,
} from './ProductItem.style';

import useLocalStorageCheckedCart from '../../hooks/useLocalStorageCheckedCart';

export default function ProductItem({ cartItem }: { cartItem: Cart }) {
  useLocalStorageCheckedCart({ cartId: cartItem.id });

  const [quantity, setQuantity] = useRecoilState(
    cartItemQuantityState(cartItem.id),
  );
  const [totalProductCount, setTotalProductCount] =
    useRecoilState(cartQuantity);
  const [isCheck, setIsCheck] = useRecoilState(cartItemCheckState(cartItem.id));
  const setCart = useSetRecoilState(cartData);

  const handleIncrement = async () => {
    try {
      const newQuantity = quantity + 1;
      await patchCartItem(cartItem.id, newQuantity);
      setQuantity(newQuantity);
      updateCart(newQuantity);
    } catch (error) {
      console.error('Failed to increment cart item quantity:', error);
    }
  };

  const handleDecrement = async () => {
    try {
      const newQuantity = Math.max(quantity - 1, 1);
      await patchCartItem(cartItem.id, newQuantity);
      setQuantity(newQuantity);
      updateCart(newQuantity);
    } catch (error) {
      console.error('Failed to decrement cart item quantity:', error);
    }
  };

  const handleRemoveCartItem = async () => {
    try {
      const newTotalProductCount = Math.max(
        totalProductCount - cartItem.quantity,
        0,
      );
      await removeCartItem(cartItem.id);
      setTotalProductCount(newTotalProductCount);
      setCart((prevCart) => prevCart.filter((item) => item.id !== cartItem.id));
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  const handleCheckCartItem = () => {
    setIsCheck((prevIsCheck) => !prevIsCheck);
  };

  const updateCart = (newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cartItem.id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  return (
    <ProductItemStyle>
      <ProductItemTop>
        <CheckBox isCheck={isCheck} onClick={handleCheckCartItem} />
        <Button text="삭제" onClick={handleRemoveCartItem} />
      </ProductItemTop>
      <ProductItemBundle>
        <Img
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
            <span className="product-item_content_amount">{quantity}</span>
            <CountButton type="plus" onClick={handleIncrement} />
          </div>
        </div>
      </ProductItemBundle>
    </ProductItemStyle>
  );
}

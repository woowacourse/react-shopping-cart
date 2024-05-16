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

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    patchCartItem(cartItem.id, newQuantity).then(() => {
      setQuantity(newQuantity);
      updateCart(newQuantity);
    });
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(quantity - 1, 1);
    patchCartItem(cartItem.id, newQuantity).then(() => {
      setQuantity(newQuantity);
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

import { useState, ChangeEventHandler, useEffect } from 'react';
import { css, styled } from 'styled-components';
import QuantityInput from './QuantityInput';
import Icon from './common/Icon';
import { CART_PATH } from '../constants/svgPath';
import { INITIAL_QUANTITY, NONE_QUANTITY, NOT_NUMBER } from '../constants';
import { changeInvalidValueToBlank } from '../utils/changeInvalidValueToBlank';
import { atom, useRecoilValue, useRecoilState } from 'recoil';
import { Product, CartItem } from '../types';
import { productListState } from './ProductList';
import { useSetCart } from '../hooks/useSetCart';
import { setDataInLocalStorage } from '../utils/setDataInLocalStorage';

interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: JSON.parse(localStorage.getItem('cart') ?? '[]'),
});

const ProductItem = ({ id, imgUrl, name, price }: Props) => {
  const initialProductList = useRecoilValue<Product[]>(productListState);

  const [cart, setCart] = useRecoilState(cartState);
  const { addToCart, removeProductItemFromCart } = useSetCart(id);

  const [isSelected, setIsSelected] = useState(false);

  const [quantity, setQuantity] = useState(
    cart.find((item: CartItem) => item.id === id)
      ? cart.find((item: CartItem) => item.id === id)!.quantity
      : INITIAL_QUANTITY,
  );

  useEffect(() => {
    if (cart.filter((item: CartItem) => item.id === id).length) setIsSelected(true);
  }, [cart, id]);

  const handleCartClick = () => {
    setIsSelected(true);

    const selectedProduct = initialProductList.find((product) => product.id === id);
    setCart((prev: CartItem[]) => [
      ...prev,
      { id: selectedProduct!.id, quantity: quantity, product: selectedProduct! },
    ]);
    addToCart(quantity);
    setDataInLocalStorage<CartItem[]>('cart', cart);
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (Number(value) === NONE_QUANTITY) {
      setIsSelected(false);

      removeProductItemFromCart();

      const removeProductFromCart = (prev: CartItem[]) => {
        return prev.filter((item) => item.id !== id);
      };
      setCart((prev: CartItem[]) => removeProductFromCart(prev));

      return setQuantity(INITIAL_QUANTITY);
    }

    setQuantity(changeInvalidValueToBlank(value, NOT_NUMBER));
    addToCart(Number(value));

    setDataInLocalStorage<CartItem[]>('cart', cart);
  };

  return (
    <div>
      <S.Image src={imgUrl} />
      <S.InfoWrapper>
        <div>
          <S.Name>{name}</S.Name>
          <S.Price>
            {price.toLocaleString()}
            <span>원</span>
          </S.Price>
        </div>
        {isSelected ? (
          <QuantityInput value={quantity} onChange={handleNumberInputChange} />
        ) : (
          <Icon
            width="30"
            height="27"
            color="#AAA"
            path={CART_PATH}
            viewBox="0 0 51 44"
            svgStyle={svgStyle}
            onClick={handleCartClick}
          />
        )}
      </S.InfoWrapper>
    </div>
  );
};

const S = {
  Image: styled.img`
    width: 100%;
  `,

  InfoWrapper: styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 12px 6px 0;

    & > :last-child {
      right: 6px;
    }

    & > svg:last-child {
      cursor: pointer;
    }
  `,

  Name: styled.p`
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.5px;
    color: var(--text-color);
    opacity: 0.9;
  `,

  Price: styled.p`
    margin-top: 8px;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: var(--text-color);

    & span {
      font-size: 17px;
      vertical-align: top;
    }
  `,
};

const svgStyle = css`
  transform: scaleX(-1);
`;

export default ProductItem;

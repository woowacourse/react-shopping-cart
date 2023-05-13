import { useState, ChangeEventHandler, useEffect } from 'react';
import { css, styled } from 'styled-components';
import QuantityInput from './QuantityInput';
import { changeInvalidValueToBlank } from '../utils/changeInvalidValueToBlank';
import { atom, useRecoilValue, useRecoilState } from 'recoil';
import { Product, CartItem } from '../types';
import { productListState } from './ProductList';
import { useSetCart } from '../hooks/useSetCart';
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from '../utils/getAndSetDataInLocalStorage';
import { QUANTITY, NOT_NUMBER, KEY_CART } from '../constants';
import CartIcon from './icons/CartIcon';

interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export const cartState = atom({
  key: 'cartState',
  default: JSON.parse(getDataFromLocalStorage(KEY_CART) ?? '[]'),
});

const ProductItem = ({ id, imgUrl, name, price }: Props) => {
  const [cart, setCart] = useRecoilState(cartState);
  const { addToCart, removeProductItemFromCart } = useSetCart(id);
  const [isSelected, setIsSelected] = useState(false);
  const initialProductList = useRecoilValue<Product[]>(productListState);

  const [quantity, setQuantity] = useState(
    cart.filter((item: CartItem) => item.id === id).length
      ? cart.filter((item: CartItem) => item.id === id)[0].quantity
      : QUANTITY.INITIAL
  );

  useEffect(() => {
    if (cart.filter((product: CartItem) => product.id === id).length) setIsSelected(true);
  }, [cart, id]);

  const handleCartClick = () => {
    setIsSelected(true);

    const selectedProduct = initialProductList.filter((product) => product.id === id);
    setCart((prev: Product[]) => [...prev, ...selectedProduct]);
    addToCart(quantity);
    setDataInLocalStorage<CartItem[]>(KEY_CART, cart);
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (value === QUANTITY.NONE) {
      setIsSelected(false);

      removeProductItemFromCart();

      const removeProductFromCart = (prev: Product[]) => {
        return prev.filter((product) => product.id !== id);
      };
      setCart((prev: Product[]) => removeProductFromCart(prev));

      return setQuantity(QUANTITY.INITIAL);
    }

    setQuantity(changeInvalidValueToBlank(value, NOT_NUMBER));
    addToCart(value);
    setDataInLocalStorage<CartItem[]>(KEY_CART, cart);
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
          <CartIcon svgStyle={svgStyle} onClick={handleCartClick} />
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

    & > svg:last-child {
      cursor: pointer;
    }
  `,

  Name: styled.p`
    margin-right: 4px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.5px;
    color: var(--text-color);
    opacity: 0.9;

    @media (max-width: 1270px) {
      font-size: 15px;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
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

    @media (max-width: 1270px) {
      font-size: 16px;
      & span {
        font-size: 16px;
      }
    }

    @media (max-width: 768px) {
      font-size: 15px;
    }
  `,
};

const svgStyle = css`
  transform: scaleX(-1);
`;

export default ProductItem;

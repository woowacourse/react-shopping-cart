import { useState, ChangeEventHandler, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { css, styled } from 'styled-components';
import QuantityInput from './QuantityInput';
import { cartState } from '../recoil';
import CartIcon from './icons/CartIcon';
import { useSetCart } from '../hooks/useCart';
import { changeInvalidValueToBlank } from '../utils/changeInvalidValueToBlank';
import { CartItem } from '../types';
import { QUANTITY, NOT_NUMBER } from '../constants';

interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

const ProductItem = ({ id, imgUrl, name, price }: Props) => {
  const cart = useRecoilValue(cartState);
  const { addToCart, removeProductItemFromCart } = useSetCart(id);
  const [isSelected, setIsSelected] = useState(false);

  const [quantity, setQuantity] = useState(
    cart.filter((item: CartItem) => item.id === id).length
      ? cart.filter((item: CartItem) => item.id === id)[0].quantity
      : QUANTITY.INITIAL
  );

  useEffect(() => {
    if (cart.find((product: CartItem) => product.id === id)) setIsSelected(true);
  }, [cart, id]);

  const handleCartClick = () => {
    setIsSelected(true);

    addToCart(QUANTITY.INITIAL);
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (value === QUANTITY.NONE) {
      setIsSelected(false);

      removeProductItemFromCart();

      return setQuantity(QUANTITY.INITIAL);
    }

    setQuantity(changeInvalidValueToBlank(value, NOT_NUMBER));
    addToCart(value);
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

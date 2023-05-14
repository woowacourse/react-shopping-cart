import { useState, ChangeEventHandler } from 'react';
import { css, styled } from 'styled-components';
import QuantityInput from './QuantityInput';
import Icon from './common/Icon';
import { CART_PATH } from '../constants/svgPath';
import { INITIAL_QUANTITY, NONE_QUANTITY, NOT_NUMBER } from '../constants';
import { changeInvalidValueToBlank } from '../utils/changeInvalidValueToBlank';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { CartItem } from '../types';
import { setDataInLocalStorage } from '../utils/setDataInLocalStorage';
import { cartState } from '../store/CartState';
import {
  AddToCartSelectorParams,
  addToCartSelector,
  isSelectedProductSelector,
  productFindByIdSelector,
  removeProductItemFromCartSelector,
} from '../store/CartSelector';

interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

const ProductItem = ({ id, imgUrl, name, price }: Props) => {
  const cart = useRecoilValue(cartState);
  const addToCart = useRecoilCallback(({ set }) => ({ id, quantity }: AddToCartSelectorParams) => {
    set(addToCartSelector({ id, quantity }), []);
  });

  const removeProductItemFromCart = useRecoilCallback(({ set }) => (id: number) => {
    set(removeProductItemFromCartSelector(id), []);
  });

  const isSelected = useRecoilValue(isSelectedProductSelector(id));

  const productFindById = useRecoilValue(productFindByIdSelector(id));

  const [quantity, setQuantity] = useState(
    productFindById ? productFindById.quantity : INITIAL_QUANTITY,
  );

  const handleCartClick = () => {
    addToCart({ id: id, quantity: quantity });

    setDataInLocalStorage<CartItem[]>('cart', cart);
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (Number(value) === NONE_QUANTITY) {
      removeProductItemFromCart(id);

      return setQuantity(INITIAL_QUANTITY);
    }

    setQuantity(changeInvalidValueToBlank(value, NOT_NUMBER));

    addToCart({ id: id, quantity: quantity });

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

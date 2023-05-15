import { useState, ChangeEventHandler } from 'react';
import { styled } from 'styled-components';
import QuantityInput from './QuantityInput';
import { INITIAL_QUANTITY, NONE_QUANTITY, NOT_NUMBER } from '../constants';
import { changeInvalidValueToBlank } from '../utils/changeInvalidValueToBlank';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import {
  AddToCartSelectorParams,
  addToCartSelector,
  isSelectedProductSelector,
  productFindByIdSelector,
  removeProductItemFromCartSelector,
} from '../store/CartSelector';
import CartIconButton from './CartIconButton';

interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

const ProductItem = ({ id, imgUrl, name, price }: Props) => {
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
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (Number(value) === NONE_QUANTITY) {
      removeProductItemFromCart(id);
      return setQuantity(INITIAL_QUANTITY);
    }

    setQuantity(changeInvalidValueToBlank(value, NOT_NUMBER));
    addToCart({ id: id, quantity: quantity });
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
          <CartIconButton onClick={handleCartClick} />
        )}
      </S.InfoWrapper>
    </div>
  );
};

const S = {
  Image: styled.img`
    width: 100%;
    height: auto;
  `,

  InfoWrapper: styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 12px 6px 0;

    & > button:last-child {
      cursor: pointer;
    }
  `,

  Name: styled.p`
    display: -webkit-box;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.5px;
    margin-right: 4px;
    color: var(--text-color);
    opacity: 0.9;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
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

export default ProductItem;

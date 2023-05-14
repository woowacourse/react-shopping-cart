import { ChangeEventHandler } from 'react';
import { css, styled } from 'styled-components';
import QuantityInput from './QuantityInput';
import CartIcon from './icons/CartIcon';
import { useSetCart } from '../hooks/useCart';
import { useLoadCart } from '../hooks/useLoadCart';
import { NOT_NUMBER, QUANTITY, MAX_NUMBER_LENGTH } from '../constants';

interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

const ProductItem = ({ id, imgUrl, name, price }: Props) => {
  const { isSelected, setIsSelected, quantity, setQuantity } = useLoadCart(id);
  const { addToCart, removeItemFromCart } = useSetCart(id);

  const handleCartClick = () => {
    setIsSelected(true);
    addToCart(QUANTITY.INITIAL);
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (value === QUANTITY.NONE) {
      setIsSelected(false);
      removeItemFromCart();

      return setQuantity(QUANTITY.INITIAL);
    }

    const onlyTwoDigits = parseInt(value.replace(NOT_NUMBER, '').slice(0, MAX_NUMBER_LENGTH));
    setQuantity(onlyTwoDigits);
    addToCart(String(onlyTwoDigits));
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
          <CartIcon css={svgStyle} onClick={handleCartClick} />
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

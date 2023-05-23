import { css, styled } from 'styled-components';
import { QUANTITY } from '../../constants';
import { useSetCart } from '../../hooks/useCart';
import { useHandleQuantityInput } from '../../hooks/useHandleQuantityInput';
import { useLoadCart } from '../../hooks/useLoadCart';
import { Product } from '../../types';
import CartIcon from '../icons/CartIcon';
import Price from '../Price';
import QuantityInput from './QuantityInput';

const ProductItem = ({ id, imageUrl, name, price }: Product) => {
  const { isSelected, setIsSelected, quantity, setQuantity } = useLoadCart(id);
  const { addToCart, removeItemFromCart, updateCart } = useSetCart(id);

  const handleCartClick = () => {
    setIsSelected(true);
    addToCart(String(QUANTITY.INITIAL));
  };

  const handleNumberInputChange = useHandleQuantityInput({
    setIsSelected,
    removeItemFromCart,
    setQuantity,
    updateCart,
  });

  return (
    <div>
      <S.Image src={imageUrl} alt={name} />
      <S.InfoWrapper>
        <div>
          <S.Name htmlFor={name} title={name}>
            {name}
          </S.Name>
          <Price price={price} css={priceStyle} />
        </div>
        {isSelected ? (
          <QuantityInput id={name} value={quantity} onChange={handleNumberInputChange} />
        ) : (
          <S.Button type="button" onClick={handleCartClick}>
            <CartIcon css={svgStyle} />
          </S.Button>
        )}
      </S.InfoWrapper>
    </div>
  );
};

const S = {
  Image: styled.img`
    width: 100%;
  `,

  InfoWrapper: styled.fieldset`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 12px 6px 0;
  `,

  Button: styled.button`
    align-self: start;
    background: none;
    cursor: pointer;
  `,

  Name: styled.label`
    display: -webkit-box;
    margin-right: 4px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.5px;
    color: var(--text-color);
    opacity: 0.9;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;

    @media (max-width: 1270px) {
      font-size: 15px;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
  `,
};

const svgStyle = css`
  transform: scaleX(-1);
`;

const priceStyle = css`
  margin-top: 8px;
  font-weight: 500;
`;

export default ProductItem;

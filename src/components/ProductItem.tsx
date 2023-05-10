import { useState, ChangeEventHandler } from 'react';
import { css, styled } from 'styled-components';
import QuantityInput from './QuantityInput';
import Icon from './common/Icon';
import { CART_PATH } from '../constants/svgPath';
import { INITIAL_QUANTITY, NONE_QUANTITY } from '../constants';
import { changeInvalidValueToBlank } from '../utils/changeInvalidValueToBlank';
import { atom, useRecoilState } from 'recoil';
import { Product } from '../types';
import { productListState } from './ProductList';

interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export const cartState = atom({
  key: 'cartState',
  default: [] as Product[],
});

const ProductItem = ({ id, imgUrl, name, price }: Props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [value, setValue] = useState(INITIAL_QUANTITY);
  const [productList, setProductList] = useRecoilState<Product[]>(productListState);

  const [cart, setCart] = useRecoilState<Product[]>(cartState);

  const handleCartClick = () => {
    setIsSelected(true);

    const selectedProduct = productList.filter((product) => product.id === id);
    setCart((prev: Product[]) => [...prev, ...selectedProduct]);
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (value === NONE_QUANTITY) {
      setIsSelected(false);

      setCart((prev: Product[]) => prev.filter((product) => product.id !== id));

      return setValue(INITIAL_QUANTITY);
    }

    setValue(changeInvalidValueToBlank(value, /[^0-9]/g));
  };

  return (
    <S.ItemWrapper>
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
          <QuantityInput value={value} onChange={handleNumberInputChange} />
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
    </S.ItemWrapper>
  );
};

const S = {
  ItemWrapper: styled.div`
    width: 282px;
  `,

  Image: styled.img`
    width: 282px;
    height: 282px;
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
    letter-spacing: 0.5px;
    color: var(--text-color);
    opacity: 0.9;
  `,

  Price: styled.p`
    margin-top: 8px;
    font-size: 17px;
    font-weight: 400;
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

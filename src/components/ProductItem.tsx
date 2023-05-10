import { css, styled } from 'styled-components';
import { useState, ChangeEventHandler } from 'react';
import QuantityInput from './QuantityInput';
import Icon from './common/Icon';
import { CART_PATH } from '../constants/svgPath';

interface Props {
  imgUrl: string;
  name: string;
  price: number;
}

const ProductItem = ({ imgUrl, name, price }: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCartClick = () => {
    setIsSelected(true);
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (value === '0') setIsSelected(false);
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
          <QuantityInput onChange={handleNumberInputChange} />
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

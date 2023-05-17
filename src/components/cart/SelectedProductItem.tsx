import { ChangeEventHandler } from 'react';
import { css, styled } from 'styled-components';
import { MAX_NUMBER_LENGTH, NOT_NUMBER, QUANTITY } from '../../constants';
import { useSetCart } from '../../hooks/useCart';
import { useLoadCart } from '../../hooks/useLoadCart';
import { Product } from '../../types';
import Button from '../common/Button';
import { Checkbox } from '../common/CheckboxStyle';
import TrashCanIcon from '../icons/TrashCanIcon';
import QuantityInput from '../main/QuantityInput';
import Price from '../Price';

interface Props extends Product {
  quantity: number;
}

const SelectedProductItem = ({ id, imageUrl, name, price, quantity }: Props) => {
  const { setIsSelected, setQuantity } = useLoadCart(id);
  const { addToCart, removeItemFromCart } = useSetCart(id);

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
      <S.Fieldset>
        <Checkbox type="checkbox" id={`${id}-checkbox`} name={name} />
        <S.Image src={`${imageUrl}`} alt={name} />
        <label htmlFor={`${id}-checkbox`}>{name}</label>
        <S.Wrapper>
          <QuantityInput id={name} value={String(quantity)} onChange={handleNumberInputChange} />
          <Button css={trashCanButtonStyle} onClick={removeItemFromCart}>
            <TrashCanIcon patternId={id} imageSize={{ width: '40', height: '40' }} />
          </Button>
          <Price price={price * quantity} />
        </S.Wrapper>
      </S.Fieldset>
    </div>
  );
};

const S = {
  Fieldset: styled.fieldset`
    display: flex;
    margin-top: 28px;
    padding-bottom: 32px;
    border-bottom: 1.5px solid #ccc;
  `,

  Image: styled.img`
    width: 144px;
    margin-right: 20px;

    & + label {
      font-size: 16px;
    }
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-left: auto;

    & > div {
      margin-top: 54px;
    }

    & > button {
      margin-top: -54px;
    }

    & > p {
      margin-top: 101px;
    }
  `,
};

const trashCanButtonStyle = css`
  background: none;

  & + p {
    font-size: 15px;
  }
`;

export default SelectedProductItem;

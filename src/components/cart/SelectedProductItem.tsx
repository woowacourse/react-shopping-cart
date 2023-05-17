import { css, styled } from 'styled-components';
import { Product } from '../../types';
import Button from '../common/Button';
import { Checkbox } from '../common/CheckboxStyle';
import TrashCanIcon from '../icons/TrashCanIcon';
import QuantityInput from '../main/QuantityInput';

interface Props extends Product {
  quantity: number;
}

const SelectedProductItem = ({ id, imageUrl, name, price, quantity }: Props) => {
  return (
    <div>
      <S.Fieldset>
        <Checkbox type="checkbox" id={`${id}-checkbox`} name={name} />
        <S.Image src={`${imageUrl}`} alt={name} />
        <label htmlFor={`${id}-checkbox`}>{name}</label>
        <S.Wrapper>
          <QuantityInput id={name} value={String(quantity)} onChange={() => {}} />
          <Button css={trashCanButtonStyle}>
            <TrashCanIcon patternId={id} imageSize={{ width: '40', height: '40' }} />
          </Button>
          <p>{price.toLocaleString()}원</p>
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
      font-size: 18px;
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
    font-size: 16px;
  }
`;

export default SelectedProductItem;

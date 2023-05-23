import { useRecoilState } from 'recoil';
import { css, styled } from 'styled-components';
import { useSetCart } from '../../hooks/useCart';
import { checkedItemList } from '../../recoil';
import { Product } from '../../types';
import Button from '../common/Button';
import { Checkbox } from '../common/CheckboxStyle';
import TrashCanIcon from '../icons/TrashCanIcon';
import Price from '../Price';
import QuantityButton from './QuantityButton';

interface Props extends Product {
  quantity: number;
}

const SelectedProductItem = ({ id, imageUrl, name, price, quantity }: Props) => {
  const { removeItemFromCart } = useSetCart(id);
  const [checkedItems, setCheckedItems] = useRecoilState<number[]>(checkedItemList);

  const isChecked = checkedItems.includes(id);

  const handleCheckedItem = () => {
    isChecked
      ? setCheckedItems((prev) => prev.filter((itemId) => itemId !== id))
      : setCheckedItems((prev) => [...prev, id]);
  };

  const handleTrashCanClick = () => {
    setCheckedItems((prev) => prev.filter((itemId) => itemId !== id));
    removeItemFromCart();
  };

  return (
    <div>
      <S.Fieldset>
        <Checkbox
          type="checkbox"
          id={`${id}-checkbox`}
          name={name}
          checked={isChecked}
          onChange={handleCheckedItem}
        />
        <S.Image src={`${imageUrl}`} alt={name} />
        <S.Name htmlFor={`${id}-checkbox`} title={name}>
          {name}
        </S.Name>
        <S.Wrapper>
          <Button css={trashCanButtonStyle} onClick={handleTrashCanClick}>
            <TrashCanIcon patternId={id} imageSize={{ width: '40', height: '40' }} />
          </Button>
          <QuantityButton productId={id} quantity={quantity} />
          <Price price={price * quantity} />
        </S.Wrapper>
      </S.Fieldset>
    </div>
  );
};

const S = {
  Fieldset: styled.fieldset`
    display: flex;
    margin: 28px 10px 0 0;
    padding-bottom: 32px;
    border-bottom: 1.5px solid #ccc;

    @media (max-width: 420px) {
      flex-wrap: wrap;
      margin-right: 0;
    }
  `,

  Image: styled.img`
    width: 144px;
    margin-right: 20px;

    @media (max-width: 548px) {
      margin-right: 8px;
    }

    @media (max-width: 420px) {
      width: 100%;
      margin: 10px 0 0;
    }
  `,

  Name: styled.label`
    display: -webkit-box;
    height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 16px;

    @media (max-width: 548px) {
      height: 14px;
      font-size: 14px;
    }

    @media (max-width: 420px) {
      height: 16px;
      margin: 16px auto;
      font-size: 16px;
    }
  `,

  Wrapper: styled.div`
    display: flex;
    gap: 32px;
    flex-direction: column;
    align-items: end;
    margin-left: auto;

    @media (max-width: 420px) {
      width: 100%;
      flex-direction: column-reverse;
      align-items: center;
    }
  `,
};

const trashCanButtonStyle = css`
  background: none;
`;

export default SelectedProductItem;

import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { css, styled } from 'styled-components';
import { useRemoveCheckedItemsFromCart } from '../../hooks/useRemoveCheckedItemsFromCart';
import { cartState, checkedItemList } from '../../recoil';
import { CartItem } from '../../types';
import Button from '../common/Button';
import { Checkbox } from '../common/CheckboxStyle';
import SelectedProductItem from './SelectedProductItem';

const SelectedProductList = () => {
  const cart = useRecoilValue(cartState);
  const [checkedItems, setCheckedItems] = useRecoilState<number[]>(checkedItemList);
  const removeCheckedItemsFromCart = useRemoveCheckedItemsFromCart(checkedItems);

  const initialCheckedItems = cart.map((item: CartItem) => item.id);

  useEffect(() => {
    setCheckedItems(initialCheckedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productCountInCart = cart.length;
  const isAllChecked = checkedItems.length === productCountInCart;

  const handleAllItemsCheck = () => {
    isAllChecked ? setCheckedItems([]) : setCheckedItems(initialCheckedItems);
  };

  const handleCheckedItemRemove = () => {
    removeCheckedItemsFromCart();
    setCheckedItems([]);
  };

  return (
    <S.Wrapper>
      <S.Title>{`든든배송 상품 (${productCountInCart}개)`}</S.Title>
      {productCountInCart === 0 ? (
        <S.Nothing
          src={`${process.env.PUBLIC_URL}/assets/nothing.png`}
          alt="장바구니가 텅 비었어요"
        />
      ) : (
        <div>
          {cart.map((item: CartItem) => (
            <SelectedProductItem
              key={item.product.id}
              id={item.product.id}
              name={item.product.name}
              price={item.product.price}
              imageUrl={`${process.env.PUBLIC_URL}${item.product.imageUrl}`}
              quantity={item.quantity}
            />
          ))}
        </div>
      )}

      <S.Fieldset>
        <Checkbox
          type="checkbox"
          id="select-all"
          name="select-all"
          checked={isAllChecked}
          onChange={handleAllItemsCheck}
        />
        <label htmlFor="select-all">{`전체선택 (${checkedItems.length}/${productCountInCart})`}</label>
        <Button css={deleteButtonStyle} onClick={handleCheckedItemRemove}>
          선택삭제
        </Button>
      </S.Fieldset>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.section`
    width: 100%;
    max-width: 736px;
    font-size: 18px;
    color: var(--text-color);
  `,

  Title: styled.h3`
    padding-bottom: 24px;
    border-bottom: 2px solid var(--gray-color-300);

    & + div {
      height: 410px;
      max-height: 410px;
      overflow-y: auto;

      /* Scroll bar */
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background: var(--text-color);
      }
      &::-webkit-scrollbar-track {
        border-radius: 8px;
        background: var(--gray-color-100);
      }
      &::-webkit-scrollbar-button:start:decrement,
      &::-webkit-scrollbar-button:end:increment {
        display: block;
        height: 6px;
        background: #fff;
      }

      @media (max-width: 420px) {
        padding: 0 10px;
      }
    }
  `,

  Nothing: styled.img`
    display: block;
    width: 50%;
    margin: 0 auto;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,

  Fieldset: styled.fieldset`
    display: flex;
    align-items: center;
    padding: 36px 0 48px;
    font-size: 16px;

    @media (max-width: 548px) {
      font-size: 14px;
      padding: 20px 0 0;
    }
  `,
};

const deleteButtonStyle = css`
  margin-left: 20px;
  padding: 6px 12px 7px;
  background: none;
  border: 1px solid var(--gray-color-100);

  @media (max-width: 548px) {
    margin-left: 12px;
  }
`;

export default SelectedProductList;

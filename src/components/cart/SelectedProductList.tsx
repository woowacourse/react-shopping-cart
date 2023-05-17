import { useRecoilValue } from 'recoil';
import { css, styled } from 'styled-components';
import { cartState } from '../../recoil';
import { CartItem } from '../../types';
import Button from '../common/Button';
import { Checkbox } from '../common/CheckboxStyle';
import SelectedProductItem from './SelectedProductItem';

const SelectedProductList = () => {
  const cart = useRecoilValue(cartState);
  const productCountInCart = cart.length;

  return (
    <S.Wrapper>
      <S.Title>{`든든배송 상품 (${productCountInCart}개)`}</S.Title>
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

      <S.Fieldset>
        <Checkbox type="checkbox" id="select-all" name="select-all" />
        <label htmlFor="select-all">{`전체선택 (2/${productCountInCart})`}</label>
        <Button css={deleteButtonStyle}>선택삭제</Button>
      </S.Fieldset>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    width: 100%;
    max-width: 736px;
    max-height: 410px;
    font-size: 18px;
    color: var(--text-color);
  `,

  Title: styled.h3`
    padding-bottom: 24px;
    border-bottom: 2px solid var(--gray-color-300);
  `,

  Fieldset: styled.fieldset`
    display: flex;
    align-items: center;
    padding: 36px 0 100px;
    font-size: 16px;
  `,
};

const deleteButtonStyle = css`
  margin-left: 20px;
  padding: 6px 12px 7px;
  background: none;
  border: 1px solid var(--gray-color-100);
`;

export default SelectedProductList;

import styled from 'styled-components';
import { CartProductList } from './CartProductList';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  cartIdListState,
  cartProductDetailListState,
  selectedCartIdListState,
} from '../../../atoms/cartIdListAtom';
import { CheckBox } from '../../../layout/checkBox/CheckBox';
import { useCartProductList } from '../../../hooks/recoil/useCartProductList';

export const ProductSelectSection = () => {
  const [cartProductList, setCartProductList] = useRecoilState(
    cartProductDetailListState
  );

  const cartIdList = useRecoilValue(cartIdListState);
  const [selectedCartIdList, setSelectedCartIdList] = useRecoilState(
    selectedCartIdListState
  );

  const { removeProductFromCartProductList } = useCartProductList();

  const handleDeleteSelectedProduct = () => {
    selectedCartIdList.forEach((selectedCartId) => {
      removeProductFromCartProductList(selectedCartId);
    });
  };

  useEffect(() => {
    fetch('/cart-items')
      .then((res) => res.json())
      .then((data) => setCartProductList(data));
  }, [cartIdList]);

  return (
    <Style.Container>
      <Style.Header>
        <Style.HeaderTitle>배송상품 ({cartIdList.length}개)</Style.HeaderTitle>
      </Style.Header>
      <CartProductList cartProductList={cartProductList} />
      <Style.SelectOrDeleteContainer>
        <CheckBox
          isChecked={
            cartIdList.filter((cartId) => !selectedCartIdList.includes(cartId))
              .length === 0
          }
          id={Math.random()}
          handleClickCheckBox={(e) => {
            if (e.target.checked)
              return setSelectedCartIdList(() => cartIdList);
            setSelectedCartIdList(() => []);
          }}
        />
        <Style.SelectedProductCount>
          전체선택 ({selectedCartIdList.length}/{cartIdList.length})
        </Style.SelectedProductCount>
        <Style.DeleteSelectedProductButton
          onClick={handleDeleteSelectedProduct}
        >
          선택삭제
        </Style.DeleteSelectedProductButton>
      </Style.SelectOrDeleteContainer>
    </Style.Container>
  );
};

const Style = {
  Container: styled.section`
    width: 740px;
    min-height: 704px;

    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
    width: 100%;
    height: 56px;

    border-bottom: 4px solid #aaaaaa;
  `,
  HeaderTitle: styled.h2`
    font-size: 20px;
    color: #333333;
  `,
  SelectOrDeleteContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 13px;

    margin-top: 23px;
  `,
  CheckBox: styled.div`
    width: 28px;
    height: 28px;

    border: 1px solid #22a6a2;
  `,
  SelectedProductCount: styled.span`
    font-size: 16px;
  `,
  DeleteSelectedProductButton: styled.button`
    width: 98px;
    height: 35px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #bbbbbb;
    font-family: var(--baemin-font);
  `,
};

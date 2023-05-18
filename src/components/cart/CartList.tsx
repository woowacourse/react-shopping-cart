import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import Checkbox from '../common/Checkbox';
import Button from '../common/Button';

export default function CartList() {
  const { cartList, deleteFromCart } = useCart();
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [checkedItems, setCheckedItems] = useState<number[]>(
    cartList.map((cartItem) => cartItem.id)
  );

  const handleCheckedItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems((prev) => prev.filter((itemId) => itemId !== id));
      return;
    }
    setCheckedItems((prev) => [...prev, id]);
  };

  const handleAllChecked = () => {
    if (isAllChecked) {
      setCheckedItems([]);
      setIsAllChecked(false);
      return;
    }

    setCheckedItems(cartList.map((cartItem) => cartItem.id));
    setIsAllChecked(true);
  };

  const deleteCheckedItems = () => {
    checkedItems.forEach((itemId) => deleteFromCart(itemId));
    setCheckedItems([]);
  };

  useEffect(() => {
    if (cartList.length === checkedItems.length) {
      setIsAllChecked(true);
      return;
    }

    if (isAllChecked === true) setIsAllChecked(false);
  }, [cartList, checkedItems, isAllChecked]);

  return (
    <Style.CartListContainer>
      <h2>든든배송 상품({cartList.length}개)</h2>
      <ul>
        {cartList.map((cartItemInfo) => (
          <Style.ProductContainer>
            <Style.CheckBoxWrapper>
              <Checkbox
                id={`${cartItemInfo.product.name}-checkbox`}
                checked={checkedItems.includes(cartItemInfo.id)}
                itemId={cartItemInfo.id}
                handleCheckedItem={handleCheckedItem}
              />
            </Style.CheckBoxWrapper>
            <CartItem cartItemInfo={cartItemInfo} deleteCheckedItem={setCheckedItems} />
          </Style.ProductContainer>
        ))}
      </ul>
      <Style.TotalCheckboxAndDeleteButtonContainer>
        <Style.TotalCheckbox type="checkbox" checked={isAllChecked} onChange={handleAllChecked} />
        <Style.TotalSelectCaption>
          전체선택 ({`${checkedItems.length}/${cartList.length}`})
        </Style.TotalSelectCaption>
        <Button designType="text" fontSize={'12px'} color={'black'} onClick={deleteCheckedItems}>
          선택삭제
        </Button>
      </Style.TotalCheckboxAndDeleteButtonContainer>
    </Style.CartListContainer>
  );
}

const Style = {
  CartListContainer: styled.div`
    height: 700px;
  `,

  ProductContainer: styled.li`
    display: flex;

    width: 735px;
    height: 200px;

    padding: 20px;
    border-bottom: 1px ridge;
  `,

  CheckBoxWrapper: styled.div`
    margin-right: 20px;
    border-radius: 2px;
  `,

  TotalCheckboxAndDeleteButtonContainer: styled.div`
    display: flex;
    align-items: center;

    padding: 20px;
    margin-right: 20px;
  `,

  TotalCheckbox: styled.input`
    width: 20px;
    height: 20px;

    margin-right: 20px;

    cursor: pointer;
  `,

  TotalSelectCaption: styled.p`
    font-size: 12px;

    &::after {
      content: '|';
      margin-left: 5px;
      margin-right: 5px;
    }
  `,
};

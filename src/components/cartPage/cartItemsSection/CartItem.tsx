import styled from 'styled-components';

import { useState, useEffect } from 'react';

import { CheckBox } from '../../common/checkBox/CheckBox';
import { useCartRecoil } from '../../../hooks/recoil/useCartRecoil';
import { Counter } from '../../common/counter/Counter';
import { useCartFetch } from '../../../hooks/fetch/useCartFetch';
import { useSelectedCartRecoil } from '../../../hooks/recoil/useSelectedCartRecoil';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const CartItem = ({ id, name, price, imageUrl }: CartItemProps) => {
  const {
    deleteRecoilCartById,
    patchRecoilCartItemQuantity,
    getProductQuantityById,
    getIsCartIncludes,
  } = useCartRecoil();
  const {
    getIsSelectedCartIdListIncludes,
    addNewSelectedCartId,
    deleteSelectedCartId,
  } = useSelectedCartRecoil();

  const { deleteCartItemById, patchCartItemQuantity } = useCartFetch();

  const [quantity, setQuantity] = useState<number>(
    getProductQuantityById(id) ?? 1
  );

  const handleDeleteCartItem = () => {
    // eslint-disable-next-line no-restricted-globals
    const isUserWantToDeleteProduct = confirm(`${name}을 삭제하시겠습니까?`);

    if (!isUserWantToDeleteProduct) return setQuantity(1);

    deleteCartItemById(id);
    deleteRecoilCartById(id);
  };

  const handleClickCheckBox: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.checked) return addNewSelectedCartId(id);

    deleteSelectedCartId(id);
  };

  useEffect(() => {
    if (!getIsCartIncludes(id)) return;

    if (quantity <= 0) return handleDeleteCartItem();

    patchRecoilCartItemQuantity(id, quantity);
    patchCartItemQuantity(id, quantity);
  }, [quantity]);

  return (
    <Style.Container>
      <Style.Content>
        <CheckBox
          isChecked={getIsSelectedCartIdListIncludes(id)}
          handleClickCheckBox={handleClickCheckBox}
          id={id}
        />
        <Style.ProductImage src={imageUrl} alt={name} />
        <Style.ProductName>{name}</Style.ProductName>
        <Style.ProductSelectorContainer>
          <Style.DeleteIcon
            src={`${process.env.PUBLIC_URL}/trashCan.png`}
            onClick={handleDeleteCartItem}
          />
          <Counter quantity={quantity} handleQuantityChange={setQuantity} />
          <Style.ProductPrice>{price}원</Style.ProductPrice>
        </Style.ProductSelectorContainer>
      </Style.Content>
    </Style.Container>
  );
};

const Style = {
  Container: styled.li`
    width: 740px;
    height: 200px;

    display: flex;
    align-items: flex-end;

    &:not(:last-child) {
      border-bottom: 1.5px solid #aaaaaa;
    }
  `,
  Content: styled.div`
    width: 740px;
    height: 174px;

    display: flex;
    gap: 15px;
  `,
  CheckBox: styled.div`
    width: 28px;
    height: 28px;

    border: 1px solid #22a6a2;
  `,
  ProductImage: styled.img`
    width: 144px;
    height: 147px;
  `,
  ProductName: styled.div`
    width: 389px;

    font-size: 20px;
    color: #333333;
  `,
  ProductSelectorContainer: styled.div`
    min-width: 114px;
    height: 147px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    gap: 23px;
  `,
  DeleteIcon: styled.img`
    width: 24px;
    height: 24px;

    cursor: pointer;
  `,
  ProductPrice: styled.span`
    font-size: 16px;
  `,
};

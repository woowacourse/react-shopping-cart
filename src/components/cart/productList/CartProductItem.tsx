import styled from 'styled-components';

import { useState } from 'react';

import { Counter } from '../../main/productCard/Counter';
import { getCommaAddedNumber } from '../../../utils/number';
import { CheckBox } from '../../../layout/checkBox/CheckBox';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useCounterInput } from '../../../hooks/useCounterInput';
import { useCartIdList } from '../../../hooks/recoil/useCartIdList';

interface ProductSelectItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const ProductSelectItem = ({
  id,
  name,
  price,
  imageUrl,
}: ProductSelectItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { removeProductFromCartIdList } = useCartIdList();

  const { getProductQuantityById, patchProductQuantity } = useLocalStorage();
  const { inputRef, handleIncrease, handleDecrease } = useCounterInput({
    minLimit: 0,
    handleMinLimitExceeded: () => {
      removeProductFromCartIdList(id);
      console.log('삭제됨');
    },
    increaseCallback: () =>
      patchProductQuantity(id, Number(inputRef.current?.value)),
    decreaseCallback: () =>
      patchProductQuantity(id, Number(inputRef.current?.value)),
  });

  return (
    <Style.Container>
      <Style.Content>
        <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} id={id} />
        <Style.ProductImage src={imageUrl} alt={name} />
        <Style.ProductName>{name}</Style.ProductName>
        <Style.ProductSelectorContainer>
          <Style.DeleteIcon src={`${process.env.PUBLIC_URL}/trashCan.png`} />
          <Counter
            ref={inputRef}
            initialValue={getProductQuantityById(id)}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
          />
          <Style.ProductPrice>
            {getCommaAddedNumber(price)}원
          </Style.ProductPrice>
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

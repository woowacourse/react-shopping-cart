import { useState } from "react";

import * as S from "./Item.styles";

import Hr from "../../common/Hr/Hr";

import emptyIcon from "../../../assets/emptyIcon.png";
import CheckBox from "../../common/CheckBox/CheckBox";

interface ItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  isChecked: boolean;
  handleSelectedCartItem?: (id: number) => void;
  handleSelectedCartItemQuantityUpdate?: (id: number, quantity: number) => void;
  handleSelectedCartItemRemove?: (id: number) => void;
}

export default function Item({
  id,
  imageUrl,
  name,
  price,
  quantity,
  isChecked,
  handleSelectedCartItem,
  handleSelectedCartItemQuantityUpdate,
  handleSelectedCartItemRemove,
}: ItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const onIncrease = async () => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);
      const updatedQuantity = quantity + 1;
      handleSelectedCartItemQuantityUpdate?.(id, updatedQuantity);
    } catch (error) {
      console.log("수량 증가 실패:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onDecrease = async () => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);
      const updatedQuantity = quantity - 1;
      if (!updatedQuantity) {
        handleSelectedCartItemRemove?.(id);
        return;
      }
      handleSelectedCartItemQuantityUpdate?.(id, updatedQuantity);
    } catch (error) {
      console.log("수량 감소 실패:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onRemove = async () => {
    if (isRemoving) return;

    try {
      setIsRemoving(true);
      handleSelectedCartItemRemove?.(id);
    } catch (error) {
      console.error("삭제 실패:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div>
      <Hr />

      <S.Content>
        {handleSelectedCartItem && (
          <CheckBox
            type="checkbox"
            checked={isChecked}
            onChange={() => handleSelectedCartItem(id)}
          />
        )}
        {handleSelectedCartItemRemove && (
          <S.Button width="40" height="24" onClick={onRemove}>
            삭제
          </S.Button>
        )}
      </S.Content>

      <S.Content>
        <S.Image
          src={imageUrl}
          alt={name}
          onError={(e) => (e.currentTarget.src = emptyIcon)}
        />
        <S.ButtonContainer>
          <S.A>
            <S.Flex direction="column">
              <S.ItemName>{name}</S.ItemName>
              <S.ItemPrice>{price.toLocaleString()}원</S.ItemPrice>
            </S.Flex>
            <S.Flex direction="row">
              {handleSelectedCartItemQuantityUpdate ? (
                <>
                  <S.Button width="24" height="24" onClick={onDecrease}>
                    –
                  </S.Button>
                  <S.Quantity>{quantity}</S.Quantity>
                  <S.Button width="24" height="24" onClick={onIncrease}>
                    +
                  </S.Button>
                </>
              ) : (
                <S.Quantity>{quantity}개</S.Quantity>
              )}
            </S.Flex>
          </S.A>
        </S.ButtonContainer>
      </S.Content>
    </div>
  );
}

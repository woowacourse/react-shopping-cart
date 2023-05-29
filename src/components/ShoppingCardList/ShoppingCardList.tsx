import { memo, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { cartIdAtom } from "../../store/cartState";
import Styled from "./ShoppingCardListStyled";
import ShoppingCard from "../ShoppingCard/ShoppingCard";
import Checkbox from "../common/Checkbox/Checkbox";
import useCheckedItem from "../../hooks/useCheckedItem";
import Modal from "../common/Modal/Modal";

const ShoppingCardList = () => {
  const shoppingListId = useRecoilValue(cartIdAtom);
  const [deleteCart, setDeleteCart] = useState<boolean>(false);
  const [isOpen, SetIsOpen] = useState<boolean>(false);

  const onClose = () => {
    SetIsOpen(false);
  };

  useEffect(() => {
    if (deleteCart) {
      deleteCheckedAll();
      SetIsOpen(true);
    }
    setDeleteCart(false);
  }, [shoppingListId]); // eslint-disable-line

  const {
    checkedIdList,
    checkedAll,
    countIsChecked,
    changeIsChecked,
    changeIsCheckedAll,
    deleteChecked,
    deleteCheckedAll,
  } = useCheckedItem(shoppingListId.length);

  return (
    <Styled.Container>
      <Styled.Quantity>든든배송 상품 {shoppingListId.length}개</Styled.Quantity>
      <Styled.Border />
      <Styled.ListContainer>
        <Styled.List>
          {shoppingListId.map((id) => {
            return (
              <ShoppingCard
                key={id}
                cartId={id}
                isChecked={
                  checkedIdList.find((checkId) => checkId === id) ? true : false
                }
                isDelete={deleteCart}
                onDelete={() => {
                  deleteChecked(id);
                }}
                onChange={() => {
                  changeIsChecked(id);
                }}
              />
            );
          })}
        </Styled.List>
      </Styled.ListContainer>
      <Styled.AllCheckContainer>
        <Checkbox isChecked={checkedAll} onChange={changeIsCheckedAll} />
        <div>
          전체선택 ({countIsChecked}/{shoppingListId.length})
        </div>
        <Styled.Button
          onClick={() => {
            setDeleteCart(true);
          }}
        >
          선택삭제
        </Styled.Button>
      </Styled.AllCheckContainer>
      {isOpen && (
        <Modal onClose={onClose} text={"장바구니에서 삭제 되었습니다"} />
      )}
    </Styled.Container>
  );
};

export default memo(ShoppingCardList);

import * as S from './CartItemDelete.styles';

interface CartItemDeleteProps {
  removeItem: (variables: void) => void;
  handleModalClose: () => void;
}

const CartItemDelete = ({ removeItem, handleModalClose }: CartItemDeleteProps) => {
  return (
    <S.CartItemDeleteContainer>
      <S.CartItemDeleteMessage id="modal-description">
        해당 상품을 삭제하시겠습니까?
      </S.CartItemDeleteMessage>
      <S.CartItemDeleteButtonContainer>
        <S.CartItemDeleteCancelButton variant="textButton" onClick={handleModalClose}>
          취소
        </S.CartItemDeleteCancelButton>
        <S.CartItemDeleteButton variant="textButton" onClick={() => removeItem()}>
          삭제
        </S.CartItemDeleteButton>
      </S.CartItemDeleteButtonContainer>
    </S.CartItemDeleteContainer>
  );
};

export default CartItemDelete;

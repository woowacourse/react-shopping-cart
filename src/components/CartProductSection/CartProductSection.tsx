import CheckBox from 'components/@common/CheckBox/CheckBox';
import FlexBox from 'components/@common/FlexBox';
import useModal from 'components/@common/Modal/hooks/useModal';
import CartProductCardList from './CartProductCardList/CartProductCardList';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import useCartCheckBox from 'hooks/useCartCheckBox';
import useShoppingCart from 'hooks/useShoppingCart';
import styled from 'styled-components';

const CartProductSection = () => {
  const { checkedProducts, isChecked, isAllChecked, toggleCheck, toggleCheckAllBox } = useCartCheckBox();
  const { deleteCheckedCartProducts } = useShoppingCart();
  const { isModalOpen, openModal, closeModal } = useModal();

  const checkBoxLabel = isAllChecked ? '선택해제' : '전체선택';

  return (
    <ProductSection flexDirection="column" align="flex-start">
      <CheckBoxTab justify="space-between" align="flex-end">
        <CheckBox checked={isAllChecked} onChange={toggleCheckAllBox}>
          {checkBoxLabel}
        </CheckBox>
        <CheckedProductDeleteButton onClick={openModal}>선택 삭제</CheckedProductDeleteButton>
        <ConfirmModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          onClickConfirmButton={() => deleteCheckedCartProducts(checkedProducts)}
        >
          {`선택한 ${checkedProducts.size}개의 상품을 삭제하시겠습니까?`}
        </ConfirmModal>
      </CheckBoxTab>
      <CartProductCardList toggleCheck={toggleCheck} isChecked={isChecked} />
    </ProductSection>
  );
};

export default CartProductSection;

const ProductSection = styled(FlexBox)`
  position: relative;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CheckBoxTab = styled(FlexBox)`
  position: sticky;
  top: 80px;
  z-index: 10;
  width: 100%;
  height: 60px;
  padding-bottom: 10px;
  border-bottom: 3px solid #dddddd;
  background-color: #ffffff;
`;

const CheckedProductDeleteButton = styled.button`
  width: 100px;
  height: 30px;
  border: solid 1px #dddddd;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  background-color: #f2f2f2;
  cursor: pointer;
`;

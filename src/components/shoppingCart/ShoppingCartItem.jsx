import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import trashCan from '../../assets/trashCan.svg';
import useDialog from '../../hooks/useDialog';
import useShoppingCart from '../../hooks/useShoppingCart';
import useSnackbar from '../../hooks/useSnackbar';
import { MESSAGE } from '../../constants/message';
import { CountInput, Checkbox, Dialog, ProductImage, PRODUCT_IMAGE_TYPE, SNACKBAR_TYPE } from '..';

const Container = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 731px;
  height: 156px;
`;

const LeftContent = styled.li`
  display: flex;
  & > *:not(:first-child) {
    margin-left: 15px;
  }
`;

const RightContent = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 5px;
`;

const Name = styled.div`
  font-size: 20px;
`;

const TrashCanImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const MAX_COUNT = 99;
const MIN_COUNT = 1;

const ShoppingCartItem = ({ id, src, alt, name, price, isChecked, quantity }) => {
  const { isDialogOpen, setIsDialogOpen, onConfirm, onCancel } = useDialog();
  const { deleteShoppingCartItem, toggleShoppingCartItem, increaseQuantity, decreaseQuantity } = useShoppingCart();

  const { addSnackbar } = useSnackbar();

  const handleShoppingCartItemToggle = () => {
    toggleShoppingCartItem(id);
  };

  const handleShoppingCartItemDelete = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    onConfirm(() => deleteShoppingCartItem(id));
    addSnackbar({ message: MESSAGE.SUCCESS.REMOVE_SHOPPING_CART_ITEM, type: SNACKBAR_TYPE.SUCCESS });
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleIncrement = () => {
    if (quantity >= MAX_COUNT) {
      addSnackbar({ message: MESSAGE.FAILURE.FULL_SHOPPING_CART_ITEM, type: SNACKBAR_TYPE.FAILURE });

      return;
    }

    increaseQuantity(id);
  };

  const handleDecrement = () => {
    quantity > MIN_COUNT && decreaseQuantity(id);
  };

  return (
    <>
      <Container>
        <LeftContent>
          <Checkbox isChecked={isChecked} onChange={handleShoppingCartItemToggle} />
          <ProductImage type={PRODUCT_IMAGE_TYPE.SMALL} src={src} alt={alt} />
          <Name>{name}</Name>
        </LeftContent>
        <RightContent>
          <TrashCanImage onClick={handleShoppingCartItemDelete} src={trashCan} alt="쓰레기통" />
          <CountInput value={quantity} onIncrease={handleIncrement} onDecrease={handleDecrement} />
          <div>{(quantity * price).toLocaleString('ko-KR')} 원</div>
        </RightContent>
      </Container>

      {isDialogOpen && (
        <Dialog onConfirm={handleConfirm} onCancel={handleCancel}>
          <p>
            해당 상품을 <br /> 삭제하시겠습니까?
          </p>
        </Dialog>
      )}
    </>
  );
};

ShoppingCartItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default memo(ShoppingCartItem);

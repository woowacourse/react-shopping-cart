import { animated } from '@react-spring/web';
import React from 'react';
import Checkbox from '../checkbox/Checkbox';
import ProductImage, { PRODUCT_IMAGE_TYPE } from '../productImage/ProductImage';
import trashCan from '../../assets/trashCan.svg';
import styled from 'styled-components';
import CountInput from '../countInput/CountInput';
import { useDispatch } from 'react-redux';
import {
  decreaseQuantity,
  deleteShoppingCartItem,
  increaseQuantity,
  toggleShoppingCartItem,
} from '../../redux/shoppingCart';
import PropTypes from 'prop-types';
import DialogPortal from '../../DialogPortal';
import Dialog, { DIALOG_TYPE } from '../dialog/Dialog';
import useDialog from '../../hooks/useDialog';
import useNumberAnimation from '../../hooks/useNumberAnimation';
import { currencyUnit } from '../../utils/currencyUnit';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

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

const PriceWrapper = styled.div`
  display: flex;
  font-weight: 700;
`;

const Name = styled.div`
  font-size: 20px;
`;

const TrashCanImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ShoppingCartItem = ({ cart_id, image_url, alt, name, price, isChecked, quantity }) => {
  const { isDialogOpen, setIsDialogOpen, clickConfirm, clickCancel, type, setType } = useDialog();

  const dispatch = useDispatch();

  const handleShoppingCartItemToggle = () => {
    dispatch(toggleShoppingCartItem(cart_id));
  };

  const handleShoppingCartItemDelete = () => {
    setIsDialogOpen(true);
    setType(DIALOG_TYPE.CONFIRM);
  };

  const handleConfirm = () => {
    type === DIALOG_TYPE.CONFIRM ? clickConfirm(dispatch(deleteShoppingCartItem(cart_id))) : clickConfirm();
  };

  const handleIncrement = () => {
    if (quantity >= MAX_QUANTITY) {
      setType(DIALOG_TYPE.ALERT);
      setIsDialogOpen(true);

      return;
    }

    dispatch(increaseQuantity(cart_id));
  };

  const handleDecrement = () => {
    quantity > MIN_QUANTITY && dispatch(decreaseQuantity(cart_id));
  };

  return (
    <>
      <Container>
        <LeftContent>
          <Checkbox isChecked={isChecked} onChange={handleShoppingCartItemToggle} />
          <ProductImage type={PRODUCT_IMAGE_TYPE.SMALL} src={image_url} alt={alt} />
          <Name>{name}</Name>
        </LeftContent>
        <RightContent>
          <TrashCanImage onClick={handleShoppingCartItemDelete} src={trashCan} alt="쓰레기통" />
          <CountInput value={quantity} onIncrease={handleIncrement} onDecrease={handleDecrement} />
          <PriceWrapper>
            <animated.div>{useNumberAnimation(quantity * price).to((number) => currencyUnit(number))}</animated.div>
            <div>원</div>
          </PriceWrapper>
        </RightContent>
      </Container>

      {isDialogOpen && (
        <DialogPortal>
          {type === DIALOG_TYPE.CONFIRM && (
            <Dialog type={type} onConfirm={handleConfirm} onCancel={clickCancel}>
              <p>
                해당 상품을 <br /> 삭제하시겠습니까?
              </p>
            </Dialog>
          )}

          {type === DIALOG_TYPE.ALERT && (
            <Dialog type={type} onConfirm={handleConfirm}>
              <p>
                구매 수량 안내 <br /> 최대 99개까지 구매가 가능합니다.
              </p>
            </Dialog>
          )}
        </DialogPortal>
      )}
    </>
  );
};

ShoppingCartItem.propTypes = {
  cart_id: PropTypes.number,
  image_url: PropTypes.string,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default ShoppingCartItem;

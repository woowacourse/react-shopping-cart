import { animated } from '@react-spring/web';
import React from 'react';
import Checkbox from '../checkbox/Checkbox';
import ProductImage, { PRODUCT_IMAGE_TYPE } from '../productImage/ProductImage';
import trashCan from '../../assets/trashCan.svg';
import styled from 'styled-components';
import CountInput from '../countInput/CountInput';
import { useDispatch } from 'react-redux';
import {
  decreaseCount,
  deleteShoppingCartItem,
  increaseCount,
  toggleShoppingCartItem,
} from '../../modules/shoppingCart';
import PropTypes from 'prop-types';
import DialogPortal from '../../DialogPortal';
import Dialog, { DIALOG_TYPE } from '../dialog/Dialog';
import useDialog from '../../hooks/useDialog';
import useNumberAnimation from '../../hooks/useNumberAnimation';

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

const ShoppingCartItem = ({ id, src, alt, name, price, isChecked, count }) => {
  const { isDialogOpen, setIsDialogOpen, clickConfirm, clickCancel, type, setType } = useDialog();

  const dispatch = useDispatch();

  const handleShoppingCartItemToggle = () => {
    dispatch(toggleShoppingCartItem(id));
  };

  const handleShoppingCartItemDelete = () => {
    setIsDialogOpen(true);
    setType(DIALOG_TYPE.CONFIRM);
  };

  const handleConfirm = () => {
    type === DIALOG_TYPE.CONFIRM ? clickConfirm(dispatch.bind(null, deleteShoppingCartItem(id))) : clickConfirm();
  };

  const handleCancel = () => {
    clickCancel();
  };

  const handleIncrement = () => {
    if (count >= 99) {
      setIsDialogOpen(true);
      setType(DIALOG_TYPE.ALERT);

      return;
    }

    dispatch(increaseCount(id));
  };

  const handleDecrement = () => {
    count > 1 && dispatch(decreaseCount(id));
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
          <CountInput value={count} onIncrease={handleIncrement} onDecrease={handleDecrement} />
          <PriceWrapper>
            <animated.div>
              {useNumberAnimation(count * price).to((n) =>
                n.toLocaleString('ko-KR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
              )}
            </animated.div>
            <div>원</div>
          </PriceWrapper>
        </RightContent>
      </Container>

      {isDialogOpen && (
        <DialogPortal>
          {type === DIALOG_TYPE.CONFIRM && (
            <Dialog type={type} onConfirm={handleConfirm} onCancel={handleCancel}>
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
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isChecked: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
};

export default ShoppingCartItem;

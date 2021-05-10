import React from 'react';
import Checkbox from '../checkbox/Checkbox';
import ProductImage, { PRODUCT_IMAGE_TYPE } from '../productImage/ProductImage';
import trashCan from '../../assets/trashCan.svg';
import styled from 'styled-components';
import CountInput from '../countInput/CountInput';
import { decreaseCount, increaseCount, toggleShoppingCartItem } from '../../modules/shoppingCart';
import { useDispatch } from 'react-redux';

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

const ShoppingCartItem = ({ id, src, alt, name, price, isChecked, count }) => {
  const dispatch = useDispatch();

  const handleShoppingCartItemToggle = () => {
    dispatch(toggleShoppingCartItem(id));
  };

  // TODO: 개수 error 처리 모달
  const handleIncrement = () => {
    count < 100 && dispatch(increaseCount(id));
  };

  const handleDecrement = () => {
    count > 1 && dispatch(decreaseCount(id));
  };

  return (
    <Container>
      <LeftContent>
        <Checkbox isChecked={isChecked} onChange={handleShoppingCartItemToggle} />
        <ProductImage type={PRODUCT_IMAGE_TYPE.SMALL} src={src} alt={alt} />
        <Name>{name}</Name>
      </LeftContent>
      <RightContent>
        <TrashCanImage src={trashCan} alt="쓰레기통" />
        <CountInput value={count} onIncrease={handleIncrement} onDecrease={handleDecrement} />
        <div>{(count * price).toLocaleString('ko-KR')} 원</div>
      </RightContent>
    </Container>
  );
};

export default ShoppingCartItem;

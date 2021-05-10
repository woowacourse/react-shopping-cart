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

  // TODO: 커스텀 confirm 다이얼로그 만들기
  const handleShoppingCartItemDelete = () => {
    if (!window.confirm('해당 상품을 삭제하시겠습니까?')) return;

    fetch(`http://localhost:4000/shoppingCartList/${id}`, {
      method: 'DELETE',
    });

    dispatch(deleteShoppingCartItem(id));
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
        <TrashCanImage onClick={handleShoppingCartItemDelete} src={trashCan} alt="쓰레기통" />
        <CountInput value={count} onIncrease={handleIncrement} onDecrease={handleDecrement} />
        <div>{(count * price).toLocaleString('ko-KR')} 원</div>
      </RightContent>
    </Container>
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

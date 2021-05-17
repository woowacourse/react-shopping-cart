import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import shoppingCartImg from '../../assets/shoppingCart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { insertShoppingCartItem } from '../../redux/actions/shoppingCartActions';
import useDialog from '../../hooks/useDialog';
import { ProductImage, Dialog, PRODUCT_IMAGE_TYPE, DIALOG_TYPE } from '..';

const Content = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 4px 12px;
`;

const Name = styled.div`
  letter-spacing: 0.5px;
  line-height: 22px;
`;

const Price = styled.div`
  font-size: 20px;
  margin-top: 3px;
  letter-spacing: 0.5px;
  line-height: 27px;
`;

const Image = styled.img`
  cursor: pointer;
`;

const ADD_SUCCESS = 'ADD_SUCCESS';
const ADD_FAILURE = 'ADD_FAILURE';

const ProductListItem = ({ id, name, src, price }) => {
  const { isDialogOpen, setIsDialogOpen, clickConfirm, clickCancel, type, setType } = useDialog();
  const shoppingCartItemList = useSelector((state) => state.shoppingCart.shoppingCartItemList.data);
  const dispatch = useDispatch();

  const isExistedInShoppingCart = () =>
    shoppingCartItemList.some((shoppingCartItem) => shoppingCartItem.product_id === id);

  const handleShoppingCartImage = () => {
    if (isExistedInShoppingCart()) {
      setType(ADD_FAILURE);
      setIsDialogOpen(true);

      return;
    }

    setType(ADD_SUCCESS);
    setIsDialogOpen(true);
    dispatch(insertShoppingCartItem({ product_id: id }));
  };

  const handleConfirm = () => {
    clickConfirm();
  };

  return (
    <>
      <div>
        <ProductImage type={PRODUCT_IMAGE_TYPE.MEDIUM} src={src} alt={name} />
        <Content>
          <li>
            <Name>{name}</Name>
            <Price>{price.toLocaleString('ko-KR')} 원</Price>
          </li>
          <li>
            <Image onClick={handleShoppingCartImage} src={shoppingCartImg} alt="장바구니" />
          </li>
        </Content>
      </div>

      {isDialogOpen && (
        <Dialog type={DIALOG_TYPE.ALERT} onConfirm={handleConfirm} onClose={clickCancel}>
          {type === ADD_FAILURE ? '이미 장바구니에 추가되어 있습니다.' : '장바구니에 추가되었습니다.'}
        </Dialog>
      )}
    </>
  );
};

ProductListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductListItem;

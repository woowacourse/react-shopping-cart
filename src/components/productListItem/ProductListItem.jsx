import React from 'react';
import ProductImage, { PRODUCT_IMAGE_TYPE } from '../productImage/ProductImage';
import shoppingCartImg from '../../assets/shoppingCart.svg';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { insertShoppingCartItem } from '../../modules/shoppingCart';
import PropTypes from 'prop-types';
import useDialog from '../../hooks/useDialog';
import Dialog, { DIALOG_TYPE } from '../dialog/Dialog';

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

const ProductListItem = ({ product }) => {
  const { isDialogOpen, setIsDialogOpen, clickConfirm } = useDialog();
  const shoppingCartList = useSelector((state) => state.shoppingCart.shoppingCartList.data);
  const dispatch = useDispatch();

  const isExistedInShoppingCart = () => shoppingCartList.some((shoppingCartItem) => shoppingCartItem.id === product.id);

  const handleShoppingCartImage = () => {
    if (isExistedInShoppingCart()) {
      setIsDialogOpen(true);

      return;
    }

    dispatch(insertShoppingCartItem({ ...product, isChecked: true, count: 1 }));
  };

  const handleConfirm = () => {
    clickConfirm();
  };

  return (
    <>
      <div>
        <ProductImage type={PRODUCT_IMAGE_TYPE.MEDIUM} src={product.src} alt={product.alt} />
        <Content>
          <li>
            <Name>{product.name}</Name>
            <Price>{product.price.toLocaleString('ko-KR')} 원</Price>
          </li>
          <li>
            <Image onClick={handleShoppingCartImage} src={shoppingCartImg} alt="장바구니" />
          </li>
        </Content>
      </div>
      {isDialogOpen && (
        <Dialog type={DIALOG_TYPE.ALERT} onConfirm={handleConfirm}>
          이미 장바구니에 추가되어 있습니다.
        </Dialog>
      )}
    </>
  );
};

ProductListItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductListItem;
